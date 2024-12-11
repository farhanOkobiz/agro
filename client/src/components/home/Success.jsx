import React, { useEffect, useState } from "react";
import leaves1 from "../../assets/home/leaves-1-3.png";
import quote from "../../assets/Quote Left.png";
import Containar from "../containar/Containar";
import api from "../axios/Axios";

// Import Swiper and its modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaQuoteRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
// import "swiper/css/pagination";

const Success = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  // Function to fetch stories
  const getStories = async () => {
    try {
      const response = await api.get(`/stories`);
      setStories(response.data?.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div className="font-robo relative">
      <div className="absolute left-0 -top-[60px] sm:-top-[160px]">
        <img className="w-[100px] sm:w-[200px]" src={leaves1} alt="Leaves" />
      </div>
      <Containar>
        <div className="mb-24 pt-16 pb-10">
          <div className="my-10 text-center">
            <h6 className="text-primary uppercase font-bold text-[16px] sm:text-xl leading-[36px] sm:leading-[58px] mb-3">
              Our Success Story
            </h6>
            <h2 className="text-[20px] sm:text-[36px] leading-7 sm:leading-[48px] font-bold">
              From Fields to Fortune: Empowering <br /> Farmer Success Stories
            </h2>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            modules={[ Autoplay]} // Include modules here
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            speed={1000}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: true, pauseOnMouseEnter:true }}
          >
            {stories?.doc?.map((storie) => (
              <SwiperSlide key={storie?._id}>
                <div className="flex flex-wrap-reverse cursor-pointer w-full items-center justify-between px-0 pt-10">
                  <div onClick={()=>navigate(`/success-stories/${storie?._id}`)} className="bg-[#F2F2F2] w-full sm:w-[49%] rounded-lg p-10 h-[220px] sm:h-[380px] relative bg-red-300=">
                    <div className="border-[6px] absolute left-7 -top-8 border-white bg-primary w-16 h-16 rounded-full flex items-center justify-center">
                      <FaQuoteRight className="text-[20px] rotate-180 text-white" />
                    </div>
                    <div className="sm:mt-10">
                      <p
                        className="text-md leading-7 line-clamp-2 sm:line-clamp-6"
                        dangerouslySetInnerHTML={{
                          __html: storie?.text?.replace(/<img[^>]*>/g, ""), // Remove <img> tags from the content
                        }}
                      ></p>

                      <p className="mt-10 font-bold text-md">{storie?.name}</p>
                      <p className="text-md">{storie?.address}</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-[49%]  rounded-lg h-[220px] sm:h-[380px] pb-2 ">
                    <div className="youtube-embed-container w-full h-full  rounded-lg">
                      {storie?.photo.includes("youtube.com") ? (
                        <iframe
                          src={storie?.photo}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="rounded-lg w-full h-full"
                        ></iframe>
                      ) : (
                        <img
                          src={storie?.photo}
                          alt="Success Story"
                          className="rounded-lg w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Containar>
    </div>
  );
};

export default Success;
