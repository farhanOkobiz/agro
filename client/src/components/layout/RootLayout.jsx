/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../shared/ScrollToTop";
// import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const RootLayout = () => {
  const location = useLocation();

  // Check if the current path is not /login, /registration, or /forgot-password
  const showNavbarFooter = ![
    "/login",
    "/registration-user",
    "/registration-dealer",
    "/registration-choose",
    "/forgot-password",
    "/verify",
  ].includes(location?.pathname);

  return (
    <>

    {/* <ToastContainer/> */}

      <ScrollToTop />
      {showNavbarFooter && <Navbar />}
      <Outlet />
      {showNavbarFooter && <Footer />}
    </>
  );
};

export default RootLayout;