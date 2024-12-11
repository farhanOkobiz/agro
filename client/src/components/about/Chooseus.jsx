import Containar from "../containar/Containar";
import Leaf1 from "../../assets/About/Leaf-1.svg";

// eslint-disable-next-line no-unused-vars
const topics = [
  {
    id: 1,
    title: "100% natural product",
    description:
      "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. Nulla porttitor accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
  },
  {
    id: 2,
    title: "Only high quality",
    description:
      "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. Nulla porttitor accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
  },
  {
    id: 3,
    title: "Fair & competitive prices",
    description:
      "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. Nulla porttitor accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
  },
];

const Chooseus = () => {
  return (
    <div>
      <Containar>
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div>
            <h4 className="text-md font-bold text-[#F4A51D] uppercase mb-5">
              Why our clients love us
            </h4>
            <h1 className="text-4xl font-semibold">Why you should choose us</h1>
          </div>
          <div>
            <img src={Leaf1} className="rotate-135"></img>
          </div>
        </div>
        <div>
          <div className="container mx-auto px-4 py-8">
            {/* Wrapper for the entire section */}
            <div className="">
              <p className="mb-6 text-lg font-medium flex items-center">
                01 <div className="w-full h-px bg-gray-300 ml-4"></div>
              </p>
              <div className="flex flex-col md:flex-row justify-between">
                <h2 className="text-3xl font-medium text-gray-900 w-full md:w-1/2 ">
                  100% natural product
                </h2>

                {/* Description */}
                <p className=" text-gray-500  w-full md:w-1/2 text-lg">
                  Curabitur arcu erat, accumsan id imperdiet et, porttitor at
                  sem. Vestibulum ac diam sit amet quam vehicula elementum sed
                  sit amet dui. Pellentesque in ipsum id orci porta dapibus.
                  Donec rutrum congue leo eget malesuada. Nulla porttitor
                  accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet
                  et, porttitor at sem. Vestibulum ac diam sit amet quam
                  vehicula elementum sed sit amet dui.
                </p>
              </div>
            </div>
            <div className="">
              <p className="my-6 text-lg font-medium flex items-center">
                02 <div className="w-full h-px bg-gray-300 ml-4"></div>
              </p>
              <div className="flex flex-col md:flex-row justify-between">
                <h2 className="text-3xl font-medium text-gray-900   w-full md:w-1/2">
                  Only high quality
                </h2>

                {/* Description */}
                <p className=" text-gray-500  w-full md:w-1/2 text-lg">
                  Curabitur arcu erat, accumsan id imperdiet et, porttitor at
                  sem. Vestibulum ac diam sit amet quam vehicula elementum sed
                  sit amet dui. Pellentesque in ipsum id orci porta dapibus.
                  Donec rutrum congue leo eget malesuada. Nulla porttitor
                  accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet
                  et, porttitor at sem. Vestibulum ac diam sit amet quam
                  vehicula elementum sed sit amet dui.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <p className="mb-6 text-lg font-medium flex items-center">
                03 <div className="w-full h-px bg-gray-300 ml-4"></div>
              </p>
              <div className="flex flex-col md:flex-row justify-between">
                <h2 className="text-3xl font-medium text-gray-900   w-full md:w-1/2">
                  Fair & competitive prices
                </h2>

                {/* Description */}
                <p className=" text-gray-500  w-full md:w-1/2 text-lg">
                  Curabitur arcu erat, accumsan id imperdiet et, porttitor at
                  sem. Vestibulum ac diam sit amet quam vehicula elementum sed
                  sit amet dui. Pellentesque in ipsum id orci porta dapibus.
                  Donec rutrum congue leo eget malesuada. Nulla porttitor
                  accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet
                  et, porttitor at sem. Vestibulum ac diam sit amet quam
                  vehicula elementum sed sit amet dui.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Chooseus;
