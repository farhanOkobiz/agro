import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Containar from "../containar/Containar";
import { partnerList } from "../constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import from swiper/modules
import "swiper/css"; // Core Swiper styles
import api from "../axios/Axios";
// import "swiper/css/navigation";  // Navigation styles
// import "swiper/css/pagination";  // Pagination styles

const Partner = () => {
  // const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPartners = async () => {
    try {
      const response = await api.get(`/partners`);
      // console.log(`response`, response);

      setPartners(response.data?.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);


  return (
    <div className="py-[100px] font-robo">
      <Containar>
        <div>
          <div>
            <h4 className="uppercase text-[16px] sm:text-[20px] font-bold text-primary tracking-wide leading-7 sm:leading-[58px]">
              Our Trusted Partner
            </h4>
            <h2 className="text-[22px] sm:text-[36px] font-semibold leading-8 sm:leading-[48px] mt-2.5 text-text">
              Trusted Partner of Agro Infusion Ltd
            </h2>

            <div className="mt-[65px]">
              {loading ? (
                // Render Skeleton placeholders while loading
                <div className="flex justify-between items-center flex-wrap">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="w-[190px] h-[112px]">
                      <Skeleton className="w-full h-full" />
                    </div>
                  ))}
                </div>
              ) : (
                // Render Swiper once loading is complete
                <Swiper
                  modules={[Autoplay]} // Use imported modules
                  spaceBetween={30}
                  slidesPerView={1} // Default number of slides
                  // navigation
                  speed={3000}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 0 }}
                  loop={true}
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                    },
                    640: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                    1280: {
                      slidesPerView: 6,
                    },
                  }}
                >

                  {partners?.doc?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Link className="w-full h-full inline-block" to={"/"}>
                        <img
                          className="w-full h-full"
                          src={item?.photo}
                          alt={`Partner logo ${index + 1}`}
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Partner;
