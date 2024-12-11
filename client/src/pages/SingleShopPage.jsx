import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch to dispatch actions
import SinglePageBradCumbs from "../components/shared/SinglePageBradCumbs";
import Containar from "../components/containar/Containar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../components/axios/Axios";
import BestSellProduct from "../components/shop/BestSellProduct";
import RelatedProductItem from "../components/shop/RelatedProductItem";
import { addToAgroCart } from "../redux/slices/cart/agroCartSlice";
import Skeleton from "react-loading-skeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleShopPage = () => {
  const swiperRef = useRef(null);
  const dispatch = useDispatch(); // Initialize dispatch hook
  const [quantity, setQuantity] = useState(""); // Default quantity to 1
  const [product, setProduct] = useState(null); // Ensure product is initially null
  const [unit, setUnit] = useState("Kg");
  const [tonChecker, setTonChecker] = useState(false);
  const location = useLocation();
  const lastSlug = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${lastSlug}`);
        setProduct(response.data.data.product);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchProduct();
  }, [lastSlug]);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity("");
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => (prev === "" ? 1 : prev + 1));
  };

  const handleDecrement = () => {
    if (unit === "Ton" && quantity === 1) {
      setQuantity(249);
      setUnit("Kg");
      setTonChecker(false);
    }

    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const adjustedQuantity = tonChecker ? quantity * 1000 : quantity;
      console.log("========", adjustedQuantity);
      if (adjustedQuantity > 0) {
        dispatch(addToAgroCart({ ...product, quantity: adjustedQuantity }));
        // navigate("/checkout");
        if (token) {
          navigate("/checkout");
        } else {
          navigate("/login");
        }
      } else {
        // toast.error("Amount cannot be empty", {
        //   position: "top-right",
        //   autoClose: 700,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    }
  };
  const handleAddToCart = () => {
    if (product) {
      const adjustedQuantity = tonChecker ? quantity * 1000 : quantity;
      console.log("========", adjustedQuantity);
      if (adjustedQuantity > 0) {
        dispatch(addToAgroCart({ ...product, quantity: adjustedQuantity }));
      } else {
        toast.error("Amount cannot be empty", {
          position: "top-right",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  useEffect(() => {
    if (quantity > 249 && unit === "Kg") {
      setQuantity(1);
      setUnit("Ton");
      setTonChecker(true);
    } else if (quantity < 1 && unit === "Ton") {
      setQuantity(249);
      setUnit("Kg");
      setTonChecker(false);
    }
  }, [quantity, unit]);

  console.log("This is for ton", tonChecker);

  return (
    <div className="font-robo">
      <div className="h-[68px] sm:h-[89.4px] bg-primary"></div>
      <SinglePageBradCumbs title={product?.title} />
      <Containar>
        <div className="pb-24">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
            <div className="col-span-12 lg:col-span-9">
              <div className=" grid grid-cols-12 md:gap-6 lg:gap-12">
                <div className="col-span-12 md:col-span-6">
                  <div className="relative group">
                    <Swiper
                      ref={swiperRef}
                      modules={[Navigation, Pagination]}
                      pagination={{ clickable: true }}
                      spaceBetween={30}
                      slidesPerView={1}
                      className="w-full"
                    >
                      {product?.photos?.length > 0 ? (
                        product.photos.map((item, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={item}
                              className="w-full object-contain"
                              alt="Product"
                            />
                          </SwiperSlide>
                        ))
                      ) : (
                        <SwiperSlide>
                          <Skeleton height={400} />
                        </SwiperSlide>
                      )}
                    </Swiper>
                    <button
                      className="group-hover:border absolute left-0 top-1/2 -translate-y-1/2 text-gray-60 z-20 px-2 py-2 rounded text-gray-400 hover:bg-primary group-hover:text-white group-hover:border-primary transition duration-300"
                      onClick={handlePrev}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="group-hover:border absolute right-0 top-1/2 -translate-y-1/2 text-gray-60 z-20 px-2 text-gray-400 py-2 rounded hover:bg-primary group-hover:text-white group-hover:border-primary transition duration-300"
                      onClick={handleNext}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div>
                    <h2 className="text-[32px] font-bold capitalize">
                      {product ? product.title : <Skeleton width={200} />}
                    </h2>
                    <h4 className="text-[14px] font-normal mt-5">
                      {product ? (
                        `by Agro Infusion Ltd`
                      ) : (
                        <Skeleton width={150} />
                      )}
                    </h4>
                    <h4 className="flex gap-1 text-[18px] font-medium items-center mt-12">
                      {product ? (
                        <>
                          <FaBangladeshiTakaSign className="text-primary text-[20px]" />
                          <span className="text-primary text-[24px]">
                            {product.salePrice}
                          </span>
                          {product.salePrice !== product.price && (
                            <span className="line-through ml-2">
                              {product.price}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <Skeleton circle height={20} width={20} />
                          <Skeleton height={24} width={80} />
                          <Skeleton
                            height={24}
                            width={80}
                            style={{ marginLeft: "0.5rem" }}
                          />
                        </>
                      )}
                    </h4>

                    <h4 className="mt-12">
                      {product ? (
                        <span className="text-[16px] border-[1px] border-primary uppercase font-semibold text-primary px-4 py-1">
                          {product.size}
                        </span>
                      ) : (
                        <Skeleton height={32} width={100} />
                      )}
                    </h4>

                    <div className="flex flex-start mt-10">
                      {product ? (
                        <>
                          <div className="flex items-center gap-2 border px-4">
                            <div
                              className="w-6 h-12 flex items-center justify-center text-[20px] cursor-pointer"
                              onClick={handleDecrement}
                            >
                              <FaMinus />
                            </div>
                            <input
                              className="w-36 h-12 text-center outline-none"
                              value={quantity}
                              onChange={handleQuantityChange}
                              type="text"
                              placeholder="Enter your amount"
                            />
                            <div
                              className="w-6 h-12 flex items-center justify-center text-[20px] cursor-pointer"
                              onClick={handleIncrement}
                            >
                              <FaPlus />
                            </div>
                          </div>
                          <div className="flex items-center border px-4 ml-5">
                            <div className="w-6 h-12 flex items-center justify-center text-[20px] cursor-pointer">
                              {unit}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 border">
                          <Skeleton height={48} width={48} />
                          <Skeleton height={48} width={64} />
                          <Skeleton height={48} width={48} />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-start items-center mt-16">
                      <div className="flex items-center gap-3">
                        {product ? (
                          <>
                            <button
                              className="font-medium px-8 py-2 rounded-md bg-primary text-white text-[16px]"
                              onClick={() => handleBuyNow()}
                            >
                              Buy Now
                            </button>
                            <button
                              className="font-medium px-6 bg-primary rounded-md text-white py-2 text-[16px] flex items-center gap-1"
                              onClick={handleAddToCart} // Add to Cart button with dispatch
                            >
                              <span>Add to Cart</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <Skeleton height={48} width={120} />
                            <Skeleton height={48} width={120} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-14">
                <div className="py-4 border-b">
                  <h3 className="relative inline-block text-[26px] font-semibold after:absolute after:left-0 after:-bottom-[18px] after:bg-primary after:w-full after:h-[2px]">
                    Description
                  </h3>
                </div>

                <div className="custom-html-content mt-7 leading-8 text-justify">
                  {product ? (
                    <p dangerouslySetInnerHTML={{ __html: product.details }} />
                  ) : (
                    <Skeleton count={5} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <BestSellProduct />
            </div>
          </div>
        </div>
      </Containar>
      <div>
        <Containar className={"border-t"}>
          <div className="py-20">
            <h3 className=" text-[30px] font-bold">Related Products</h3>
            <div>
              {/* ------------- */}
              <div>
                {product ? (
                  <RelatedProductItem
                    slug={product.category.slug}
                    prevProductId={product._id}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} height={300} />
                    ))}
                  </div>
                )}
              </div>

              {/* -------------- */}
            </div>
          </div>
        </Containar>
      </div>
    </div>
  );
};

export default SingleShopPage;
