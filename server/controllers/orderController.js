const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const AppError = require("../utils/AppError");
const Email = require("../utils/Email");
const catchAsync = require("../utils/catchAsync");
const { deleteUploadedImages } = require("../middlewares/photoMiddleware");
const { getAll, getOne } = require("./handleFactory");

const extractPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts.pop(); // Get the file name with extension
  const folder = parts.slice(7).join("/"); // Extract folder path
  const publicId = `${folder}/${fileName.split(".")[0]}`; // Extract publicId without extension
  return publicId;
};

exports.createOrderController = catchAsync(async (req, res, next) => {
  console.log('req.body',req.body);
  const productAggregation = await Product.aggregate([
    {
      $match: {
        _id: {
          $in: req.body?.products?.map(
            (item) => new mongoose.Types.ObjectId(item.product)
          ),
        },
      },
    },
    {
      $project: {
        price: 1,
        salePrice: 1,
      },
    },
    {
      $addFields: {
        effectivePrice: "$salePrice",
      },
    },
  ]);

  const productTotal = req.body.products.reduce((total, item) => {
    const product = productAggregation.find((v) =>
      v._id.equals(new mongoose.Types.ObjectId(item.product))
    );

    if (product) {
      return total + product.effectivePrice * item.quantity;
    }

    return total;
  }, 0);

  // Create the order with the calculated total cost
  let order = await Order.create({
    ...req.body,
    user: req.user.id,
    totalCost: productTotal,
    paymentMethod: req.body.paymentMethod,
  });

  order = await Order.findById(order._id).populate({
    path: "products.product",
    select: "title sku size price salePrice discountType discountValue",
  });

  if (order.email) {
    const orderUrl = `${req.protocol}://localhost:5173/orders/${order._id}`;
    const email = new Email({ email: order.email, name: order.name }, orderUrl);
    await email.sendInvoice(order);
  }

  const responseMessage = order.email
    ? "Order request sent successfully, Check your email inbox"
    : "Order request sent successfully";

  res.status(201).json({
    status: "success",
    message: responseMessage,
    data: {
      order,
    },
  });
});

exports.getAllOrdersController = getAll(Order, {
  path: "products.product",
  select: "-__v -createdAt -updatedAt",
});

exports.updateOrderController = catchAsync(async (req, res, next) => {
  const { orderStatus } = req.body;

  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: "products.product",
      select: "title sku size price salePrice discountType discountValue stock",
    })
    .select("-__v");

  if (!order) return next(new AppError("No order found with that ID!", 404));

  const orderUrl = `${req.protocol}:${process.env.CLIENT_URL}/orders/${order._id}`;
  const email = new Email({ email: order.email, name: order.name }, orderUrl);
  const adminEmail = process.env.EMAIL_FROM || "admin@example.com";

  if (["approved", "delivered", "shipped", "canceled"].includes(orderStatus)) {
    await email.sendInvoice(order);
  }

  // If the order is delivered, update stock and saleNumber for the products
  if (orderStatus === "delivered") {
    await Promise.all(
      order.products.map(async (item) => {
        const updatedProduct = await Product.findByIdAndUpdate(
          item.product._id,
          {
            $inc: { saleNumber: item.quantity, stock: -item.quantity },
          },
          { new: true }
        );

        // If stock is lower than 5, send an email to the Admin
        if (updatedProduct.stock <= 5) {
          const stockAlertEmail = new Email({ email: adminEmail }, null);
          await stockAlertEmail.sendStockAlert(updatedProduct);
        }
      })
    );

    order.paymentStatus = "paid";
    await order.save();
  } else if (
    orderStatus === "approved" ||
    orderStatus === "shipped" ||
    orderStatus === "canceled"
  ) {
    order.paymentStatus = "pending";
    await order.save();
  }

  res.status(200).json({
    status: "success",
    message: "Order has been updated successfully",
    data: {
      order,
    },
  });
});

exports.getOrderController = getOne(Order, {
  path: "products.product",
  select: "-__v -createdAt -updatedAt",
});

exports.deleteOrderController = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("Order was not found!", 404));

  if (order.photo) {
    const publicId = extractPublicIdFromUrl(order.photo);
    const resourceType = order.mediaType || "image";
    await deleteUploadedImages([publicId], resourceType);
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    message: "Order has been deleted successfully",
    data: null,
  });
});
