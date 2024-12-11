import leaves from "../../assets/leaves-1-2 2.png";
import leafIcon from "../../assets/home/leaf-icon3.png";
import Containar from "../containar/Containar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios/Axios";
import { FaChevronLeft, FaChevronRight, FaUserEdit } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

const Articles = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBlogs = async () => {
    try {
      const response = await api.get(`/blogs?limit=6`);
      setBlogs(response.data?.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return { day, month };
  };

  return (
    <div className="bg-[#FBF7F0] font-robo">
      <div className="relative">
        <img
          src={leaves}
          className="absolute right-0 -top-12 sm:-top-20 w-[120px] sm:w-[210px]"
          alt="leaves"
        />
      </div>
      <Containar>
        <div className="py-12 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center">
              <img src={leafIcon} className="w-[70px]" alt="leaf-icon" />
            </div>
            <div className="text-center mt-4">
              <h5 className="text-primary font-bold text-[16px] sm:text-xl leading-6 sm:leading-[58px] mb-3 uppercase tracking-wider">
                Recent Articles
              </h5>
              <h2 className="text-[22px] sm:text-[36px] leading-7 sm:leading-[48px] font-bold">
                Our Latest Blog & News
              </h2>
            </div>

            {/* Swiper Section */}
            <div className="relative pt-10 sm:pt-20 pb-5 sm:pb-10">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                speed={1000}
                loop={true}
                autoplay={{
                  delay: 2000, // Delay between slides
                  disableOnInteraction: false, // Keep autoplay even when interacting
                  pauseOnMouseEnter: true, // Pause when hovering over the swiper
                }}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
              >
                {blogs?.doc?.map((blog) => {
                  const { day, month } = formatDate(blog?.createdAt);
                  return (
                    <SwiperSlide key={blog?._id}>
                      <div className="rounded-lg overflow-hidden bg-white group/edit">
                        <div className="relative">
                          <Link to={`/blogs/${blog?.slug}`}>
                            <img
                              src={blog?.photos[0]}
                              alt="Farming Facilites"
                              className="w-full h-72 object-cover"
                            />
                          </Link>

                          <div className="bg-primary absolute group-hover/edit:bg-secondary transition-all ease-linear duration-200 right-3 -bottom-10 text-white rounded-full w-20 h-20 border-[7px] border-white flex justify-center items-center">
                            <p className="text-lg font-medium leading-6">
                              {day}
                              <br></br>
                              {month}
                            </p>
                          </div>
                        </div>
                        <div className="text-left pl-4 my-7">
                          <Link
                            to={`/blogs/${blog?.slug}`}
                            className="font-bold text-xl mt-4"
                          >
                            {blog?.title}
                          </Link>
                          <div>
                            <p className="text-[14px] mt-1.5 flex items-center">
                              <FaUserEdit className="inline-block mr-1" />
                              {blog?.author?.name}
                            </p>
                          </div>
                          <p className="text-gray-600 text-sm my-5 pr-4 line-clamp-3">
                            {blog?.content?.replace(/<[^>]*>/g, "")}
                          </p>
                          <div className="flex justify-between items-center mt-5">
                            <Link
                              to={`/blogs/${blog?.slug}`}
                              className="rounded-md text-[14px] text-white bg-[#178843] px-4 py-1"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Custom Navigation */}
              <div className="absolute hidden sm:flex top-1/2 transform -translate-y-1/2 -left-10 z-10 w-8 h-8  bg-primary rounded-full justify-center items-center custom-prev cursor-pointer">
                <FaChevronLeft className="text-white text-base" />
              </div>
              <div className="absolute hidden top-1/2 transform w-8 h-8 sm:flex justify-center items-center bg-primary rounded-full -translate-y-1/2 -right-10 z-10 custom-next cursor-pointer">
                <FaChevronRight className="text-white text-base" />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              to="/blogs"
              className="px-8 rounded-md py-2.5 bg-primary hover:bg-secondary transition-all ease-linear duration-150 text-white font-bold"
            >
              See All Blogs
            </Link>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Articles;
