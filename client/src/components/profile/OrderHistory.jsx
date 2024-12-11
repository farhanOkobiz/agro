import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import OrderModal from "./OrderModal";
import api from "../axios/Axios";
import logo from "../../assets/logo/logo.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/users/getMe", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(response.data.data.doc?._id);
      } catch (err) {
        setError("Failed to fetch user details.");
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        const response = await api.get(`/orders?user=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.data.doc);
      } catch (error) {
        setError("Failed to fetch order history.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId, token]);

  const handleOrderClick = (order) => {
    if (order.orderStatus === "delivered") {
      setSelectedOrder(order);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handlePrint = (order) => {
    const orderDate = new Date(order.createdAt);
    const options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = orderDate.toLocaleString("en-US", options);

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2, h3 { text-align: center; }
            .order { margin: 20px; }
            .product { display: flex; text-style:capitalize; align-items: center; justify-content: space-between; border-bottom: 1px solid #ccc; padding: 10px 0; }
            .product img { width: 50px; height: 50px; object-fit: cover; margin-right: 10px; }
            .total { font-size: 20px; font-weight: bold; text-align: right; }
            .price { margin-left: 10px; }
            .logo { text-align: center; margin-bottom: 20px; }
            .logo img { width: 90px; }
            .product11 { text-transform:capitalize; }
            .user-info { margin: 10px 0; }
            .user-info p { margin: 5px 0; }
            .order-header { display: flex; justify-content: space-between; align-items: center; }
          </style>
        </head>
        <body>
          <div class="logo">
            <img src="${logo}" alt="Company Logo" />
          </div>
          <div class="order-header">
            <h2>Order ID: ${order._id.slice(-6)}</h2>
            <p>${formattedDate}</p>
          </div>
          <h1>Order Invoice</h1>
          <div class="order">
            <p>Status: ${order.orderStatus}</p>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Address:</strong> ${order.streetAddress}, ${
      order.area
    }, ${order.upazilla}, ${order.district}, ${order.postCode}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
            <h3>Products:</h3>
            <div>
              ${order.products
                .map(
                  (product) => `
                <div class="product">
                  <img src="${product.product.photos[0]}" alt="${product.product.title}" />
                  <span class="product11">${product.product.title}</span>
                  <span>Qty: ${product.quantity}</span>
                  <span>Price: <span class="price">&#2547; ${product.product.salePrice}</span></span>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="total">
              Total Cost: <span class="price">&#2547; ${order.totalCost}</span>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="mt-5 bg-white p-5 overflow-x-scroll w-full">
      <div className="pt-10 pb-4 flex items-center border-b">
        <h4 className="text-[18px] font-semibold relative before:absolute before:content-[''] before:left-0 before:-bottom-[17px] before:w-[150%] before:h-[2px] before:bg-primary">
          Order History
        </h4>
      </div>

      <div className="pb-10 pt-2 w-full sm:px-0 px-3">
        {loading ? (
          <ul>
            {/* Render Skeletons instead of actual orders when loading */}
            {[...Array(5)].map((_, index) => (
              <li key={index} className="flex flex-col gap-4 py-4 border-b">
                <Skeleton height={20} className="w-[15%]" />
                <div className="w-[60%] flex flex-col gap-2">
                  <Skeleton height={15} count={3} />
                </div>
                <Skeleton height={20} className="w-[15%]" />
                <Skeleton height={20} className="w-[15%]" />
                <Skeleton height={20} className="w-[15%]" />
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {orders.map((order) => (
              <li
                key={order._id}
                className="flex flex-col gap-4 py-4 cursor-pointer border-b"
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-[15%] h-full flex justify-center items-center">
                    <span className="text-[12px] font-semibold uppercase">
                      Order #{order._id.slice(-6)}
                    </span>
                  </div>
                  <div className="w-[60%] flex flex-col gap-2">
                    {order.products.map((product) => (
                      <div
                        key={product.product._id}
                        className="flex items-center justify-between  py-2"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            className="w-16 h-16 object-cover rounded border border-gray-300"
                            src={product.product.photos[0]}
                            alt={product.product.title}
                          />
                          <span className="text-sm font-medium capitalize">
                            {product.product.title}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Qty: {product.quantity}
                        </div>
                        <div className="text-sm flex flex-col text-gray-500">
                          Price:{" "}
                          <div>
                            <FaBangladeshiTakaSign className="inline-block text-[14px] mb-0.5" />
                            {product?.product?.salePrice}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-[15%] text-center">
                    <p className="text-sm flex flex-col items-center">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          order.orderStatus === "Successful"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </p>
                  </div>
                  <div className="w-[15%] text-center">
                    <p className="text-sm ">
                      Total Cost:
                      <br />
                      <FaBangladeshiTakaSign className="inline-block text-[14px] mb-0.5" />
                      {order.totalCost}
                    </p>
                  </div>
                  {order.orderStatus === "delivered" && (
                    <div className="w-[15%] text-center">
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded"
                        onClick={() => handlePrint(order)}
                      >
                        Print
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* <OrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
      /> */}
    </div>
  );
};

export default OrderHistory;
