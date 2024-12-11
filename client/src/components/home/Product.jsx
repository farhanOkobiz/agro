import product1 from "../../assets/product-1.png";
import leaves from "../../assets/home/leaves-1-2.png";
import leafIcon from "../../assets/home/leaf-icon3.png";
import Containar from "../containar/Containar";
import { IoCart } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import api from "../axios/Axios";
import { addToAgroCart } from "../../redux/slices/cart/agroCartSlice";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const swiperRef = useRef(null); // Reference for Swiper

  const handleAddtoCart = (product) => {
    dispatch(addToAgroCart({ ...product, quantity: 1 }));
  };

  const handleBuyNow = (product) => {
    dispatch(addToAgroCart({ ...product, quantity: 1 }));
    navigate("/checkout");
  };

  const getProducts = async () => {
    try {
      const response = await api.get(`/products?limit=6`);
      setProducts(response.data?.data); // Set the product data
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      setError(error.message); // Handle error
      setLoading(false); // Set loading to false if error occurs
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="bg-[#FBF7F0] py-12 sm:pt-[110px] sm:pb-[130px] font-robo relative group">
      <div className="absolute right-0 -top-24">
        <img className="w-[110px] sm:w-[210px]" src={leaves} alt="leaves background" />
      </div>
      <Containar>
        <div className="py-2 ">
          <div className="text-center">
            <div className="flex justify-center">
              <img src={leafIcon} className="w-[50px] sm:w-[70px]" alt="leaf-icon" />
            </div>
            <div className="text-center mt-[10px]">
              <h5 className="text-primary font-bold text-[16px] sm:text-xl mb-3 leading-8 sm:leading-[58px] uppercase tracking-widest">
                Our Latest Products
              </h5>
              <h2 className="text-[20px] sm:text-[36px] leading-[48px]] font-semibold">
                Explore Our Latest Products for Essential Solutions
                <br />
                for Smarter Farming.
              </h2>
            </div>

            <div className="relative ">
              <Swiper
                ref={swiperRef} // Assign the ref to Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                speed={1000}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000, // Autoplay delay
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                className="my-16 relative "
              >
                {products?.doc?.map((product) => (
                  <SwiperSlide key={product._id}>
                    <div className="rounded-lg overflow-hidden bg-white pb-4 group/edit">
                      <div className="relative">
                        <Link to={`/shop/${product?.slug}`}>
                          <img
                            src={product?.photos[0]} // Replace with the actual image source
                            alt="Soil Testing"
                            className="w-full h-[305px] rounded-none object-cover aspect-square"
                          />
                        </Link>

                        <div className="bg-primary group-hover/edit:bg-secondary transition-all ease-linear duration-150 text-white absolute right-4 -bottom-6 rounded-full border-[6px] border-white flex justify-center items-center w-16 h-16">
                          <p className="text-base font-semibold text-[14px]">
                            {product?.size}
                          </p>
                        </div>
                      </div>

                      {/* Icon and Content */}
                      <div className="text-left mt-7">
                        <div className="p-4">
                          <Link
                            to={`/shop/${product?.slug}`}
                            className="font-bold text-xl mb-2 capitalize"
                          >
                            {product?.title}
                          </Link>
                          <p className="text-gray-600 text-[16px] mt-5">
                            {product?.discountValue > 0 ? (
                              <>
                                <span className="line-through text-red-500 mr-2">
                                  <FaBangladeshiTakaSign className="inline" />{" "}
                                  {product?.price}
                                </span>
                                <span>
                                  <FaBangladeshiTakaSign className="inline" />{" "}
                                  {product?.salePrice}
                                </span>
                              </>
                            ) : (
                              <span>
                                <FaBangladeshiTakaSign className="inline" />{" "}
                                {product?.salePrice}
                              </span>
                            )}
                          </p>
                          <div className="flex justify-between items-center mt-5">
                            <button
                              onClick={() => handleBuyNow(product)}
                              className="rounded-full text-white bg-[#178843] hover:bg-secondary transition-all ease-linear duration-150 px-4 py-1 text-sm"
                            >
                              Buy Now
                            </button>
                            <button
                              onClick={() => handleAddtoCart(product)}
                              className="bg-[#178843] hover:bg-secondary transition-all ease-linear duration-150 text-white rounded-full px-1.5 py-1"
                            >
                              <IoCart className="inline w-5 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="z-10 rounded-full  p-2 absolute sm:group-hover:block hidden transition-all ease-linear duration-200 -translate-y-1/2 -left-10 top-1/2 bg-primary text-white"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="z-10 rounded-full p-2 absolute sm:group-hover:block hidden transition-all ease-linear duration-200 -translate-y-1/2 -right-10 top-1/2 bg-primary text-white"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Product;
