/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Containar from "../containar/Containar";
import logo from "../../assets/logo/logo.png";
import { Link, NavLink } from "react-router-dom";
import { menulist } from "../constants";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { IoReorderThree } from "react-icons/io5";
import api from "../axios/Axios";
import NavberDrawer from "../Drawer/NavberDrawer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSticky, setIsSticky] = useState(false); // New state for sticky navbar

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const agroCart = useSelector((state) => state.agroCart);
  const totalItems = agroCart.reduce((total, item) => total + item.quantity, 0);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await api.get("/users/getMe", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data.data.doc);
        } catch (error) {
          // Handle error (optional)
        }
      } else {
        // Clear user data if token is not available
        setUserData(null);
      }
    };

    fetchUserData();
  }, [token]); // Dependency includes token to refetch data when token changes

  // Add scroll event listener to update sticky state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isShopDrawerOpen, setShopDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setShopDrawerOpen((prevState) => !prevState);
  };

  return (
    <nav
      className={`transition-all duration-300 ease-in-out ${
        isSticky ? "bg-primary" : "bg-[rgba(0,0,0,0.11)] backdrop-blur-[3%]"
      } z-[9999] font-robo fixed left-0 top-0 w-full`}
    >
      <Containar>
        <div className="py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex gap-x-3 items-center">
                <div className="w-[36px] sm:w-[56px]">
                  <Link to={"/"}>
                    <img className="w-full" src={logo} alt="Logo" />
                  </Link>
                </div>
                <div>
                  <Link
                    to={"/"}
                    className="text-base sm:text-xl  xl:text-[24px] font-bold text-white"
                  >
                    Agro Infusion Ltd
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-x-10">
              <ul className="flex gap-x-8 items-center">
                {menulist.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item?.link}
                      className={({ isActive }) =>
                        isActive
                          ? "text-secondary text-sm lg:text-base font-bold relative before:bg-secondary before:absolute before:contents-[] before:left-0 before:-bottom-3 before:w-full before:h-[2px]"
                          : "text-white text-sm xl:text-base relative before:bg-secondary before:absolute before:contents-[] before:right-0 before:-bottom-3 before:w-[0px] hover:before:w-full before:h-[2px] font-bold hover:text-secondary hover:before:left-0 transition-all ease-linear duration-150 before:transition-all before:ease-linear before:duration-100"
                      }
                    >
                      {item?.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <ul className="flex items-center gap-x-3">
                <li className="text-white text-[24px] ">
                  <Link to="/shoping-cart">
                    <div className="relative">
                      <HiOutlineShoppingBag />
                      <div className="absolute -left-1 -bottom-2 px-[7px] bg-secondary py-0.5 text-[11px] rounded-full">
                        <span>
                          {totalItems >= 1000
                            ? `${totalItems / 1000}T`
                            : totalItems}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
                {userData?.photo ? (
                  <li className="text-white w-8 h-8 mt-1 rounded-full relative">
                    <Link
                      className="block w-full h-full rounded-full"
                      to="/profile"
                    >
                      <img
                        className="w-full h-full rounded-full"
                        src={userData?.photo}
                        alt="User"
                      />
                    </Link>
                  </li>
                ) : (
                  <li className="text-white text-[20px] relative">
                    <Link className="block" to="/profile">
                      <FaUser />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="block lg:hidden pr-2">
              <ul className="flex items-center gap-x-3">
                <li className="text-white text-[24px] ">
                  <Link to="/shoping-cart">
                    <div className="relative">
                      <HiOutlineShoppingBag />
                      <div className="absolute -left-1 -bottom-2 px-[7px] bg-secondary py-0.5 text-[11px] rounded-full">
                        {totalItems}
                      </div>
                    </div>
                  </Link>
                </li>
                {userData?.photo ? (
                  <li className="text-white w-8 h-8 rounded-full relative">
                    <Link
                      className="block w-full h-full rounded-full"
                      to="/profile"
                    >
                      <img
                        className="w-full h-full rounded-full"
                        src={userData?.photo}
                        alt="User"
                      />
                    </Link>
                  </li>
                ) : (
                  <li className="text-white text-[20px] relative">
                    <Link className="block" to="/profile">
                      <FaUser />
                    </Link>
                  </li>
                )}
                <li className="text-white text-[20px] relative">
                  <IoReorderThree
                    onClick={toggleDrawer}
                    className="block lg:hidden text-white text-3xl "
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* sm navbar */}
          {/* <div className="relative lg:hidden">
            <div
              onClick={toggleNavbar}
              className={`fixed top-0 right-0 w-2/3 md:w-80 bg-white z-50 transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 ease-in-out lg:hidden`}
            >
              <div className="flex justify-between px-8 my-12">
                <img className="w-[50px] h-[50px]" src={logo} alt="Logo" />
                <RxCross2 className="w-[32px] h-[32px] p-1 font-extrabold bg-green-500 rounded text-white" />
              </div>
              <ul className="my-8 h-screen space-y-4 px-8">
                {menulist.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item?.link}
                      className={({ isActive }) =>
                        isActive
                          ? "text-secondary text-[17px] font-bold relative before:bg-secondary before:absolute before:contents-[] before:left-0 before:-bottom-3 before:w-full before:h-[2px]"
                          : "text-black text-[17px] relative before:bg-secondary before:absolute before:contents-[] before:right-0 before:-bottom-3 before:w-[0px] hover:before:w-full before:h-[2px] font-bold hover:text-secondary hover:before:left-0 transition-all ease-linear duration-150 before:transition-all before:ease-linear before:duration-100"
                      }
                    >
                      {item?.title}
                    </NavLink>
                    <hr className="mt-2" />
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* Drawer */}
          <NavberDrawer
            menulist={menulist}
            isShopDrawerOpen={isShopDrawerOpen}
            toggleDrawer={toggleDrawer}
          ></NavberDrawer>
          {/* Drawer */}
          {/*  */}
        </div>
      </Containar>
    </nav>
  );
};

export default Navbar;
