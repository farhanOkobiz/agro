/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo/logo.png";
import Drawer from "react-modern-drawer";
import { Link, NavLink } from "react-router-dom";
import { socialLink } from "../constants";

const NavberDrawer = ({ menulist, isShopDrawerOpen, toggleDrawer }) => {
  return (
    <>
      <Drawer
        open={isShopDrawerOpen}
        onClick={toggleDrawer}
        direction="left"
        className="bla bla bla md:hidden "
      >
        <div
          onClick={toggleDrawer}
          className="h-screen md:w-80 bg-white z-50  transition-transform duration-300 ease-in-out lg:hidden"
        >
          <div className="flex justify-between px-8 my-12">
            <img className="w-[50px] h-[50px]" src={logo} alt="Logo" />
            <RxCross2
              onClick={toggleDrawer}
              className="w-7 h-7 p-1 font-extrabold bg-green-500 rounded text-white"
            />
          </div>
          <ul className="my-8 space-y-4 px-8">
            {menulist?.map(
              (item, index) =>
                item?.title != "Contact Us" && (
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
                )
            )}
          </ul>
          <div className="ps-8">
            <h2 className="font-bold text-2xl my-3">Social</h2>
            <div className="flex gap-3">
              {/*  */}
              <ul className="flex items-center flex-wrap gap-x-[14px] mt-3">
                {socialLink.map((item, index) => {
                  const Icon = item?.icon;
                  return (
                    <li className="text-black" key={index}>
                      <Link
                        className={`w-10 h-10 justify-center bg-white hover:scale-125 transition-all ease-linear duration-150 items-center flex rounded-full text-[15px] hover:text-white`}
                        to={"/"}
                        style={{ color: item?.color }}
                      >
                        <Icon />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/*  */}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default NavberDrawer;
