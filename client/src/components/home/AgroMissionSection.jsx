/* eslint-disable no-unused-vars */
import React from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Group23 from "../../assets/icon/Group 23.png";
import Guarantee from "../../assets/icon/Guarantee.png";
import leaves1 from "../../assets/leaves-1-3 1.png";
import team from "../../assets/team-bg 1 (1).png";
import bgImg from "../../assets/bg-1.png";
import bgImg2 from "../../assets/bg-2 (2).png";
import Containar from "../containar/Containar";

// InViewCounter Component
const InViewCounter = ({ end }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref}>
      {inView ? (
        <CountUp end={end} duration={2} className="font-bold text-3xl" />
      ) : (
        <span className="font-bold text-3xl">0</span>
      )}
    </div>
  );
};

const AgroMissionSection = () => {
  return (
    <div className="font-robo relative mb-10 hodden lg:block">
      <div className="absolute left-0 -top-[140px]">
        <img className="w-[200px]" src={leaves1} alt="Leaves Decoration"></img>
      </div>
      <div className="hidden md:inline-block absolute right-0 top-80 pt-6">
        <img src={team} alt="Team Background"></img>
      </div>
      <Containar>
        <div className="py-[95px] w-full">
          <div className="flex flex-col md:flex-row gap-y-10 md:gap-y-0 justify-between items-start w-full pb-10 md:pb-20 lg:pb-48">
            <div className="z-20 w-full md:w-3/5">
              <h6 className="text-primary font-bold text-xl mb-3 uppercase">
                Our Mission
              </h6>
              <h2 className="text-4xl font-bold w-full md:w-5/6 leading-[48px]">
                Navigate the Future of Agriculture with Agro Infusion Ltd
              </h2>
            </div>
            <div className="float-end flex flex-col items-center gap-10 -mt4 w-full md:w-2/5">
              <div className="flex gap-6 ">
                <div className="flex flex-col items-center">
                  <div className="w-[75px] h-[75px] bg-primary rounded-full flex justify-center items-center">
                    <i className="fa-brands fa-pagelines text-white text-[32px]"></i>
                  </div>

                  <h6 className="font-bold text-xl md:text-[18px]  xl:text-2xl my-8">
                    100% Organic
                  </h6>
                  <p className="text-center text-sm ">
                    Nisi eget venenatis felis posuere aptent aenean ipsum
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-[75px] h-[75px] bg-primary rounded-full flex justify-center items-center">
                    <i className="fa-solid fa-medal text-white text-[32px]"></i>
                  </div>

                  <h6 className="font-bold text-xl md:text-[17px] xl:text-2xl my-8">
                    Premium Quality
                  </h6>
                  <p className="text-center text-sm">
                    Nisi eget venenatis felis posuere aptent aenean ipsum
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:inline-block w-full">
            <img src={bgImg} alt="" className="w-full h-full object-cover" />
            <div className="absolute -top-28 -left-8 flex text-white p-12 ps-24 z-50 h-full items-center">
              <p className="text-4xl leading-[44px]">
                We are proud of
                <br /> our <strong>Numbers</strong>
              </p>
            </div>

            <div className="absolute bottom-10 right-2 rounded-xl text-white grid grid-cols-3 items-center gap-y-10 gap-x-6">
              <div className="text-center">
                <InViewCounter end={13000} />
                <small className="text-2xl font-normal">
                  Satisfied customer
                </small>
              </div>
              <div className="text-center">
                <InViewCounter end={26} />
                <small className="text-2xl font-normal">Our Products</small>
              </div>
              <div className="text-center">
                <InViewCounter end={265} />
                <small className="text-2xl font-normal">Our Dealership</small>
              </div>
              <div className="text-center">
                <InViewCounter end={1460} />
                <small className="text-2xl font-normal">Our Team Members</small>
              </div>
              <div className="text-center">
                <InViewCounter end={3} />
                <small className="text-2xl font-normal">
                  Years of Experience
                </small>
              </div>
              <div className="text-center">
                <InViewCounter end={11} />
                <small className="text-2xl font-normal">Achievements</small>
              </div>
            </div>
          </div>
          {/* for small device */}
          <div className="relative w-full lg:hidden mt-28">
            <img
              src={bgImg2}
              alt=""
              className="w-full h-[500px] object-cover rounded-2xl"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl text-white grid grid-cols-2 md:grid-cols-3 items-center gap-y-10 gap-x-6 p-4">
              <div className="text-center">
                <InViewCounter end={13000} />
                <small className="text-lg font-normal">
                  Satisfied customer
                </small>
              </div>
              <div className="text-center">
                <InViewCounter end={26} />
                <small className="text-lg font-normal">Our Products</small>
              </div>
              <div className="text-center">
                <InViewCounter end={265} />
                <small className="text-lg font-normal">Our Dealership</small>
              </div>
              <div className="text-center">
                <InViewCounter end={1460} />
                <small className="text-lg font-normal">Our Team Members</small>
              </div>
              <div className="text-center">
                <InViewCounter end={3} />
                <small className="text-lg font-normal">
                  Years of Experience
                </small>
              </div>
              <div className="text-center">
                <InViewCounter end={11} />
                <small className="text-lg font-normal">Achievements</small>
              </div>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default AgroMissionSection;
