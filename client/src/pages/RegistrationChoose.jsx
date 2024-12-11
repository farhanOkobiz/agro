import React, { useState } from "react";
import img from "../assets/logo/logo.png";
import { socialLink } from "../components/constants";
import { Link } from "react-router-dom";
import CompanyTag from "../components/companyTag/CompanyTag";

const RegistrationChoose = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="sm:h-screen">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-12 sm:col-span-7 h-full ">
          <div className="relative lg:h-full flex items-center justify-center font-robo">
            <div className="bg-white shadow-lg rounded px-8 py-16 w-[560px]">
              <h2 className="text-2xl font-bold text-center">Sign up as</h2>
              <div className="flex justify-center items-center space-x-5 h-full mt-10">
                <Link className="w-full" to="/registration-dealer">
                  <button
                    className="bg-primary w-full hover:bg-green-600 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Dealer"}
                  </button>
                </Link>
                <Link className="w-full" to="/registration-user">
                  <button
                    className="bg-primary w-full hover:bg-green-600 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "User"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 hidden sm:block sm:col-span-5 bg-primary h-full">
          <CompanyTag/>
        </div>
      </div>
    </div>
  );
};

export default RegistrationChoose;
