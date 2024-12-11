import Containar from "../containar/Containar";
import member4 from "../../assets/About/member-04.jpg";
import member5 from "../../assets/About/member-05.jpg";
import { socialLink } from "../constants/index";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const teamMembers = [
  {
    id: 1,
    name: "a",
    img: "https://webdesign-finder.com/seedone/wp-content/uploads/2022/05/member-07.jpg",
    role: "A",
  },
  {
    id: 2,
    name: "b",
    img: "https://webdesign-finder.com/seedone/wp-content/uploads/2022/05/member-08.jpg",
    role: "A",
  },
  {
    id: 3,
    name: "c",
    img: "https://webdesign-finder.com/seedone/wp-content/uploads/2022/05/member-07.jpg",
    role: "A",
  },
  {
    id: 4,
    name: "d",
    img: "https://webdesign-finder.com/seedone/wp-content/uploads/2022/05/member-08.jpg",
    role: "A",
  },
];

const OurTeam = () => {
  return (
    <div className="py-24">
      <Containar>
        <div>
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Meet With Our Dream Team
          </h1>
          <p className="w-full lg:w-3/5  leading-7 text-lg text-gray-500">
            Appetizing luscious savor hot senses. Effervescent the secure
            special. Kids spicey chance excellent proven too sleek handcrafted
            when makes intense. World&lsquo;s 100% get smells look cholesterol
            tangy pop-top wave.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            <div
              className="h-[400px] bg-cover relative rounded-lg group "
              style={{ backgroundImage: `url(${member5})` }}
            >
              <div className="absolute inset-0 bg-black  opacity-0 bottom-0"></div>
              <h2 className="absolute w-full py-5 px-5 bg-[rgba(0,0,0,0.5)] text-white bottom-0 left-0 text-3xl tracking-wide">
                Edwin
              </h2>
              <div className="absolute bottom-5 right-0 group-hover:block group-hover:right-10 duration-500 flex flex-col gap-6">
                <ul className="flex flex-col items-center flex-wrap gap-[14px] mt-3">
                  {socialLink.map((item, index) => {
                    const Icon = item?.icon;
                    return (
                      <li className="text-black" key={index}>
                        <Link
                          className={`w-0 h-0 duration-300 group-hover:w-10 group-hover:h-10 justify-center bg-white hover:scale-125 transition-all ease-linear items-center flex rounded-full text-[15px] hover:text-white`}
                          to={"/"}
                          style={{ color: item?.color }}
                        >
                          <Icon />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div
              className="h-[400px] bg-cover relative rounded-lg group "
              style={{ backgroundImage: `url(${member4})` }}
            >
              <div className="absolute inset-0 bg-black  opacity-0 bottom-0"></div>
              <h2 className="absolute w-full py-5 px-5 bg-[rgba(0,0,0,0.5)] text-white bottom-0 left-0 text-3xl tracking-wide">
                Edwin
              </h2>
              <div className="absolute bottom-5 right-0 group-hover:block group-hover:right-10 duration-500 flex flex-col gap-6">
                <ul className="flex flex-col items-center flex-wrap gap-[14px] mt-3">
                  {socialLink.map((item, index) => {
                    const Icon = item?.icon;
                    return (
                      <li className="text-black" key={index}>
                        <Link
                          className={`w-0 h-0 duration-300 group-hover:w-10 group-hover:h-10 justify-center bg-white hover:scale-125 transition-all ease-linear items-center flex rounded-full text-[15px] hover:text-white`}
                          to={"/"}
                          style={{ color: item?.color }}
                        >
                          <Icon />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div
              className="h-[400px] bg-cover relative rounded-lg group "
              style={{ backgroundImage: `url(${member5})` }}
            >
              <div className="absolute inset-0 bg-black  opacity-0 bottom-0"></div>
              <h2 className="absolute w-full py-5 px-5 bg-[rgba(0,0,0,0.5)] text-white bottom-0 left-0 text-3xl tracking-wide">
                Edwin
              </h2>
              <div className="absolute bottom-5 right-0 group-hover:block group-hover:right-10 duration-500 flex flex-col gap-6">
                <ul className="flex flex-col items-center flex-wrap gap-[14px] mt-3">
                  {socialLink.map((item, index) => {
                    const Icon = item?.icon;
                    return (
                      <li className="text-black" key={index}>
                        <Link
                          className={`w-0 h-0 duration-300 group-hover:w-10 group-hover:h-10 justify-center bg-white hover:scale-125 transition-all ease-linear items-center flex rounded-full text-[15px] hover:text-white`}
                          to={"/"}
                          style={{ color: item?.color }}
                        >
                          <Icon />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div
              className="h-[400px] bg-cover relative rounded-lg group "
              style={{ backgroundImage: `url(${member4})` }}
            >
              <div className="absolute inset-0 bg-black  opacity-0 bottom-0"></div>
              <h2 className="absolute w-full py-5 px-5 bg-[rgba(0,0,0,0.5)] text-white bottom-0 left-0 text-3xl tracking-wide">
                Edwin
              </h2>
              <div className="absolute bottom-5 right-0 group-hover:block group-hover:right-10 duration-500 flex flex-col gap-6">
                <ul className="flex flex-col items-center flex-wrap gap-[14px] mt-3">
                  {socialLink.map((item, index) => {
                    const Icon = item?.icon;
                    return (
                      <li className="text-black" key={index}>
                        <Link
                          className={`w-0 h-0 duration-300 group-hover:w-10 group-hover:h-10 justify-center bg-white hover:scale-125 transition-all ease-linear items-center flex rounded-full text-[15px] hover:text-white`}
                          to={"/"}
                          style={{ color: item?.color }}
                        >
                          <Icon />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-20">
          <button className="py-4 px-10 bg-primary font-medium text-white">
            See Full Team
          </button>
        </div>
      </Containar>
    </div>
  );
};

export default OurTeam;
