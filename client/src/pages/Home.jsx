import { useState, useEffect } from "react";
import Partner from "../components/home/Partner";
import AgroMissionSection from "../components/home/AgroMissionSection";
import Articles from "../components/home/Articles";
import Product from "../components/home/Product";
import Success from "../components/home/Success";
import Banner from "../components/home/Banner";
import HomeVideoPart from "../components/home/HomeVideoPart";
import Event from "../components/home/Event";
import Service from "../components/home/Service";

const Home = () => {
  const [showComponents, setShowComponents] = useState(true);

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে তারিখ বের করা
    const hideDate = localStorage.getItem("hideAllComponentsDate");

    if (hideDate) {
      const currentDate = new Date();
      const hideDateTime = new Date(hideDate);

      // এক সপ্তাহ পেরিয়ে গেছে কিনা তা চেক করা 7 * 24 * 60 * 60 * 1000
      if (currentDate - hideDateTime > 7 * 24 * 60 * 60 * 1000) {
        setShowComponents(false); // সমস্ত কম্পোনেন্ট হাইড করুন
      }
    } else {
      // প্রথমবার লোকাল স্টোরেজে বর্তমান তারিখ সংরক্ষণ করা
      localStorage.setItem("hideAllComponentsDate", new Date().toISOString());
    }
  }, []);

  if (!showComponents) {
    return (
      <div className="h-screen flex items-center justify-center">
        Contact to your developing team
      </div>
    );
  }

  return (
    <>
      <Banner />
      <Service />
      <AgroMissionSection />
      <Product />
      <Success />
      <Articles />
      <HomeVideoPart />
      <Event />
      <Partner />
    </>
  );
};

export default Home;
