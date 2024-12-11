import { useState } from "react";
import Containar from "../components/containar/Containar";
import BradCumbs from "../components/shared/BradCumbs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaArrowLeftLong, FaMinus, FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  deleteFromAgroCart,
  resetAgroCart,
  updateQuantity,
} from "../redux/slices/cart/agroCartSlice";

const CartDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Access cart items from Redux store
  const cartItems = useSelector((state) => state.agroCart);
  const token = useSelector((state) => state.auth.token);
  const handleResetCart = () => {
    dispatch(resetAgroCart());
  };

  const handleQuantityChange = (id, newQuantity, isIncreasing) => {
    console.log("Handling Quantity Change:", id, newQuantity);

    let updatedQuantity = newQuantity;

    if (isIncreasing) {
      // For increasing quantity, use Math.ceil
      if (updatedQuantity > 249) {
        updatedQuantity = Math.ceil(updatedQuantity / 1000) * 1000;
        console.log("After Math.ceil for increase:", updatedQuantity);
      }
    } else {
      if (updatedQuantity >= 1000) {
        updatedQuantity = Math.floor(updatedQuantity / 1000) * 1000;
        console.log("After Math.floor for decrease:", updatedQuantity);
      } else if (updatedQuantity > 249 && updatedQuantity < 1000) {
        updatedQuantity = 249;
        console.log("Set updatedQuantity to 249:", updatedQuantity);
      }
    }

    // Ensure the updated quantity is greater than 0
    if (updatedQuantity > 0) {
      dispatch(updateQuantity({ _id: id, quantity: updatedQuantity }));
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteFromAgroCart(id));
  };

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleCouponApply = () => {
    // Implement coupon validation and discount calculation here
    if (couponCode === "YOUR_COUPON_CODE") {
      setCouponDiscount(10); // Apply a 10% discount
    } else {
      setCouponDiscount(0);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemQuantity =
        item.quantity > 249
          ? Math.ceil(item.quantity / 1000) * 1000
          : item.quantity;
      return total + item.price * itemQuantity;
    }, 0);
  };

  const calculateDeliveryCharges = () => {
    return 80; // Example: Fixed delivery charge of 80
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const total = subtotal - couponDiscount;
    return total;
  };

  const handleProceed = () => {
    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="font-robo pb-20">
      <div className="h-[64px] sm:h-[89.4px] bg-primary "></div>
      <BradCumbs title="Agro Infusion Ltd " brad="Cart"></BradCumbs>
      <Containar>
        <div className="mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold my-10">Cart Details</h1>

          {cartItems.length === 0 ? (
            <div className="flex justify-center">
              <div className="text-center  font-semibold my-20">
                <HiOutlineShoppingBag className="text-[220px] mx-auto" />
                <h3 className="text-[28px] mt-10"> Your cart is empty.</h3>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-between relative flex-wrap">
              <div className="w-full sm:w-[70%] mx-auto">
                <div className="border rounded-xl">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-4xl text-gray-500">
                      <thead className="min-w-full rounded-2xl">
                        <tr className="rounded-4xl">
                          <th className="px-4 py-3 text-left w-1/2 rounded-4xl">
                            Product
                          </th>
                          <th className="px-4 py-2 text-left w-1/12">Price</th>
                          <th className="px-4 py-2 text-left w-1/6">
                            Quantity
                          </th>
                          <th className="px-4 py-2 text-left w-1/6">Total</th>
                          <th className="px-4 py-2 text-left w-1/12"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr
                            key={item._id}
                            className="bg-white border border-gray-30 hover:bg-gray-100"
                          >
                            <td className="px-4 py-2 flex items-center">
                              <img
                                src={item.photos[0]}
                                className="w-20 h-20 border rounded-lg hidden sm:block"
                                alt={item.name}
                              />
                              <Link
                                to={`/shop/${item?.slug}`}
                                className="pl-3 text-[15px] capitalize font-semibold"
                              >
                                {item.title}
                              </Link>
                            </td>
                            <td className="px-4 py-2">{item.price}</td>
                            <td className="px-4 py-2">
                              <div className="flex justify-around items-center border w-auto p-2 rounded-md">
                                <span
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      item.quantity - 1,
                                      false
                                    )
                                  }
                                  className="font-bold cursor-pointer"
                                >
                                  <FaMinus />
                                </span>
                                <span className="w-16 h-6 text-center">
                                  {item.quantity > 249
                                    ? Math.ceil(item.quantity / 1000) * 1000
                                    : item.quantity}
                                </span>
                                <span
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      item.quantity + 1,
                                      true
                                    )
                                  }
                                  className="font-bold cursor-pointer"
                                >
                                  <FaPlus />
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              {item.price *
                                (item.quantity > 249
                                  ? Math.ceil(item.quantity / 1000) * 1000
                                  : item.quantity)}
                            </td>
                            <td className="px-4 py-2">
                              <RiDeleteBin6Line
                                onClick={() => handleDeleteItem(item._id)}
                                className="cursor-pointer"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-between mt-5">
                  <button
                    onClick={handleResetCart}
                    className="mt-4 px-4 sm:px-12 py-2 bg-gray-500 hover:bg-white text-white hover:text-gray-500 hover:border hover:border-gray-500 rounded-lg font-bold"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleProceed}
                    className="mt-4 px-4 sm:px-8 py-2 bg-primary hover:bg-white text-white border hover:text-primary hover:border hover:border-primary rounded-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
              <div className="w-full sm:w-[25%] mt-5 sm:mt-0 h-fit border-gray-300 sticky top-0">
                <div className="w-full text-gray-500 bg-gray-100 border rounded-xl py-6">
                  <div className="w-5/6 mx-auto">
                    <h1 className="text-xl font-semibold my-5">Summary</h1>
                    <div className="flex justify-between font-medium mb-5">
                      <p>Sub-Total</p>
                      <p className="font-semibold">
                        <TbCurrencyTaka className="inline font-bold text-lg" />
                        {calculateSubtotal()}
                      </p>
                    </div>

                    <div className="border-2 mb-5"></div>
                    <div className="flex justify-between mb-5 font-bold text-lg">
                      <p>Total</p>
                      <p className="font-semibold text-primary">
                        <TbCurrencyTaka className="inline font-bold text-lg" />
                        {calculateTotal()}
                      </p>
                    </div>
                  </div>
                </div>
                <Link to="/shop">
                  <button className="w-full text-primary font-bold flex justify-center items-center border mt-8 py-3 rounded-lg hover:text-white hover:bg-primary">
                    <FaArrowLeftLong className="inline me-3" /> Back To Shop
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Containar>
    </div>
  );
};

export default CartDetails;
