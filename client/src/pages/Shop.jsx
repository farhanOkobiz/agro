/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Containar from "../components/containar/Containar";
import Product from "../components/home/Product";
import BradCumbs from "../components/shared/BradCumbs";
import HeroBanner from "../components/shop/HeroBanner";
import Skeleton from "react-loading-skeleton"; // Import skeleton loader
import "react-loading-skeleton/dist/skeleton.css";

import { FaBangladeshiTakaSign, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { FaChevronLeft, FaList } from "react-icons/fa";
import ProductGridShopPage from "../components/shop/ProductGridShopPage";
import api from "../components/axios/Axios";
import { Link, Outlet, useLocation } from "react-router-dom";
import PriceRange from "../components/shop/PriceRange";
import { FaFilter } from "react-icons/fa6";

const Shop = () => {
  const swiperRef = useRef(null);
  const [newRelease, setNewRelease] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const location = useLocation();

  const isCategoryPath = location.pathname.startsWith("/shop/category");

  const categoryName = isCategoryPath ? location.pathname.split("/").pop() : "";

  const getBanners = async () => {
    try {
      const response = await api.get(`/banners`);
      const groupedBanners = response?.data?.data?.doc.reduce((acc, banner) => {
        const { bannerType } = banner;
        if (!acc[bannerType]) {
          acc[bannerType] = [];
        }
        acc[bannerType].push(banner);
        return acc;
      }, {});
      setNewRelease(groupedBanners?.newRelease);
      setDeals(groupedBanners?.deals);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const getCategory = async () => {
    try {
      const response = await api.get(`/category`);
      setCategoryList(response.data.data.doc);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

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

  const lastSlug = location.pathname.split("/").pop();

  return (
    <>
      <div className="h-[68px] sm:h-[89.4px] bg-primary font-robo "></div>
      <Containar>
        <div className="flex gap-2 items-center py-10">
          <Link className="font-medium" to={"/"}>
            Home{" "}
          </Link>
          <FaChevronRight className="text-[12px]" />
          <Link className="font-medium" to={"/shop"}>
            Shop
          </Link>
          {isCategoryPath && (
            <>
              <FaChevronRight className="text-[12px]" />
              <h3 className="capitalize">{categoryName}</h3>
            </>
          )}
        </div>
      </Containar>

      <div className="py-5 md:py-8 lg:py-14 bg-[#f5f5f5]">
        <Containar>
          <div className="grid grid-cols-12 gap-5 lg:pb-3">
            <div className="hidden lg:block col-span-3">
              <div className="h-[480px]">
                {isLoading ? (
                  <Skeleton height={480} />
                ) : (
                  <HeroBanner newRelease={newRelease} />
                )}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="mb-5 lg:mb-10 relative">
                {isLoading ? (
                  <Skeleton height={480} />
                ) : (
                  <>
                    <Swiper
                      ref={swiperRef}
                      modules={[Autoplay, Pagination, Navigation]}
                      spaceBetween={30}
                      centeredSlides={true}
                      speed={1000}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={false}
                      className="mySwiper"
                    >
                      {deals?.map((deal) => (
                        <SwiperSlide key={deal._id}>
                          <Link to={deal?.link}>
                            <div className="relative h-60 md:h-[480px] bg-cover bg-center shadow-sm border">
                              <img
                                className="w-full h-full object-cover"
                                src={deal?.photo}
                              />
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button
                      onClick={handlePrev}
                      className="absolute top-1/2 left-0 transform z-30 -translate-y-1/2 bg-primary text-white w-10 h-10 hidden md:flex justify-center items-center"
                    >
                      <FaChevronLeft className="" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute top-1/2 right-0 transform z-30 -translate-y-1/2 w-10 h-10 bg-primary text-white hidden md:flex justify-center items-center"
                    >
                      <FaChevronLeft className="rotate-180" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-3 hidden md:block">
              <div className="sticky top-[88px]">
                <div>
                  <div className="shadow-md">
                    <div className="w-full bg-white border-l-2 border-t border-b border-r border-l-primary">
                      <div>
                        <h3 className="uppercase tracking-wide text-[18px] py-3.5 px-3 font-bold">
                          Product Category
                        </h3>
                      </div>
                    </div>

                    {isLoading ? (
                      <Skeleton count={6} height={50} />
                    ) : (
                      categoryList.map((item, index) => (
                        <Link
                          to={`/shop/category/${item?.slug}`}
                          className={`w-full ${
                            item?.slug == lastSlug
                              ? "bg-primary text-white"
                              : "bg-white"
                          }  border-l border-b border-r inline-block`}
                          key={index}
                        >
                          <div>
                            <h3 className="text-[16px] font-semibold uppercase py-3 px-3">
                              {item?.title}
                            </h3>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <PriceRange />
              </div>
            </div>

            <div className="col-span-12 md:col-span-9">
              <div className="bg-white">
                <Outlet />
              </div>
            </div>
          </div>
        </Containar>
      </div>
    </>
  );
};

export default Shop;
