import { GiChestnutLeaf } from "react-icons/gi";
import Containar from "../containar/Containar";

const WhatWeDo = () => {
  return (
    <div className="my-20">
      <Containar>
        <div className="">
          <div className="flex justify-center">
            <GiChestnutLeaf className="inline-block text-[#F4A51D] text-center w-10 h-10 mb-4" />
          </div>
          <h4 className=" text-xl font-bold text-[#F4A51D] text-center mb-10">
            Welcome to{" "}
            <span className="text-primary ">Agro Infusion Limeted!</span>
          </h4>
          <h1 className="text-4xl text-center font-semibold mb-12">
            What We Do Agricultural Work
          </h1>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
            <div className="flex flex-col">
              <div className="relative flex justify-center items-center">
                <div className="absolute w-64 h-64 rounded-full border-4 border-dashed border-yellow-500 animate-spin-slow"></div>

                <div className="w-60 h-60 rounded-full overflow-hidden">
                  <img
                    src="https://www.shutterstock.com/image-photo/farm-field-planted-pepper-crops-600nw-2031526355.jpg" // replace with your image source
                    alt="Person Picking Strawberries"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="text-center mt-8">
                <h1 className="text-2xl font-bold text-primary mb-4">
                  Expart Farmer
                </h1>
                <p className="text-lg lrading-7 text-gray-500">
                  Focus on goods originating from Bangladesh, we have cultivated
                  expertise in efficient.
                </p>
              </div>
            </div>
            <div className="flex flex-col pt-6">
              <div className="relative flex justify-center items-center">
                <div className="absolute w-64 h-64 rounded-full border-4 border-dashed border-yellow-500 animate-spin-slow"></div>

                <div className="w-60 h-60 rounded-full overflow-hidden">
                  <img
                    src="https://www.shutterstock.com/image-photo/farm-field-planted-pepper-crops-600nw-2031526355.jpg" // replace with your image source
                    alt="Person Picking Strawberries"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="text-center mt-8">
                <h1 className="text-2xl font-bold text-primary mb-4">
                  Quality Product
                </h1>
                <p className="text-lg lrading-7 text-gray-600">
                  Focus on goods originating from Bangladesh, we have cultivated
                  expertise in efficient.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative flex justify-center items-center">
                <div className="absolute w-64 h-64 rounded-full border-4 border-dashed border-yellow-500 animate-spin-slow"></div>

                <div className="w-60 h-60 rounded-full overflow-hidden">
                  <img
                    src="https://www.shutterstock.com/image-photo/farm-field-planted-pepper-crops-600nw-2031526355.jpg" // replace with your image source
                    alt="Person Picking Strawberries"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="text-center mt-8">
                <h1 className="text-2xl font-bold text-primary mb-4">
                  Expart Farmer
                </h1>
                <p className="text-lg lrading-7 text-gray-600">
                  Focus on goods originating from Bangladesh, we have cultivated
                  expertise in efficient.
                </p>
              </div>
            </div>
            <div className="flex flex-col pt-6">
              <div className="relative flex justify-center items-center">
                <div className="absolute w-64 h-64 rounded-full border-4 border-dashed border-yellow-500 animate-spin-slow"></div>

                <div className="w-60 h-60 rounded-full overflow-hidden">
                  <img
                    src="https://www.shutterstock.com/image-photo/farm-field-planted-pepper-crops-600nw-2031526355.jpg" // replace with your image source
                    alt="Person Picking Strawberries"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="text-center mt-8">
                <h1 className="text-2xl font-bold text-primary mb-4">
                  Expart Farmer
                </h1>
                <p className="text-lg lrading-7 text-gray-600">
                  Focus on goods originating from Bangladesh, we have cultivated
                  expertise in efficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default WhatWeDo;
