/* eslint-disable no-unused-vars */
import React from "react";
import Containar from "../containar/Containar";
import logo from "../../assets/logo/logo.png";
import { contactInfo, menulist, socialLink } from "../constants";
import { Link, NavLink } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[rgba(23,136,67,0.19)] text-black pt-20 font-robo px-4 md:px-2 lg:px-0">
        <div className="pb-16">
          <Containar>
            <div className=" grid grid-cols-12 gap-y-4 md:gap-4 lg:gap-10">
              {/* Section 1 */}
              <div className="col-span-12 md:col-span-6 lg:col-span-4 h-auto">
                <div className="w-[68px]">
                  <img className="w-full" src={logo} />
                </div>
                <h2 className="text-xl text-text font-bold mb-3 mt-5">
                  We Are Agro Infusion Ltd
                </h2>
                <p className="text-[14px] leading-7 text-gray-600">
                  Our Mission Is To Empower Farmers, Businesses, And Communities
                  By Offering High-Quality Products And Services, that Drive
                  Agricultural Efficiency And Sustainability.
                </p>
              </div>

              {/* Section 3 */}
              <div className="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <h2 className="text-xl font-bold mb-4">Links</h2>
                    <ul className="navLink flex flex-col md:flex-row md:flex-wrap lg:flex-col md:gap-3 lg:gap-0 md:gap-y-2">
                      {menulist.map((item, index) => (
                        <li key={index}>
                          <NavLink
                            to={item?.link}
                            className={({ isActive }) =>
                              isActive
                                ? "  text-primary text-[14px]"
                                : "text-gray-600  text-[14px] hover:text-primary transition-all ease-linear duration-150"
                            }
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-7">
                    <h2 className="text-xl font-bold my-4 lg:mt-0">Office</h2>
                    <p className="text-gray-600 text-[14px]">
                      R.S Tower (2nd Floor), Space G-(Southeast corner
                      room).B-34, Savar Bus Stand, Majidpur,  Savar, Dhaka.
                    </p>

                    <ul className="mt-5 flex flex-col gap-y-3">
                      {contactInfo.map((item, index) => {
                        const Icon = item?.icon;
                        return (
                          <li
                            className="hover:text-primary text-gray-600 transition-all ease-linear duration-150"
                            key={index}
                          >
                            <div className="flex gap-x-2   text-[14px] items-center">
                              <h3>
                                <Icon className="" />
                              </h3>
                              <Link target="_blanck" to={item?.link}>
                                {item?.contact}
                              </Link>
                            </div>{" "}
                          </li>
                        );
                      })}
                    </ul>

                    <div className=" mt-8">
                      <h3 className="text-[16px] font-bold">Get in touch</h3>
                      <ul className="flex items-center flex-wrap gap-x-2 mt-3">
                        {socialLink.map((item, index) => {
                          const Icon = item?.icon;
                          return (
                            <li className="text-black" key={index}>
                              <Link
                                target="_blanck"
                                className="w-8 h-8 justify-center hover:bg-primary transition-all ease-linear duration-150 items-center flex rounded-full text-text text-[15px] border border-[#828282] hover:border-primary hover:text-white"
                                to={item?.link}
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
              {/* Section 2 */}

              {/* Section 4 */}
              <div className="col-span-12 lg:col-span-4">
                <h2 className="text-xl font-bold mb-4">Maps</h2>
                <iframe
                  className="h-[200px] w-full border-none"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24548.442709530453!2d90.24166469547629!3d23.848883384302226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755eb490dba663d%3A0x674035f9196f93f6!2sAgro%20Infusion!5e0!3m2!1sen!2sbd!4v1728377757178!5m2!1sen!2sbd"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </Containar>
        </div>
      </div>

      <div className=" bg-[#178843]  text-sm">
        <Containar>
          <div className="flex justify-between flex-wrap px-5 lg:px-0 py-5 text-white">
            <p className="text-[12px] sm:text-[14px]">
              Agro Infusion Ltd © 2024. All Rights Reserved.
            </p>
            <a
              href="https://okobiz.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-[12px] sm:text-[14px]">
                Developed by <span className="font-bold">okobiz</span>
              </p>
            </a>
          </div>
        </Containar>
      </div>
    </footer>
  );
};

export default Footer;
