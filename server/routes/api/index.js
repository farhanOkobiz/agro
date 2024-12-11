const express = require("express");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const categoryRoute = require("./categoryRoute");
const productRoute = require("./productRoute");
const discountRoute = require("./discountRoute");
const orderRoute = require("./orderRoute");
const paymentRoute = require("./paymentRoute");
const blogCategoryRoute = require("./blogCategoryRoute");
const blogRoute = require("./blogRoute");
const storyRoute = require("./storyRoute");
const serviceRoute = require("./serviceRoute");
const eventRoute = require("./eventRoute");
const partnerRoute = require("./partnerRoute");
const bannerRoute = require("./bannerRoute");
const contactRoute = require("./contactRoute");
const searchRoute = require("./searchRoute");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/category", categoryRoute);
router.use("/products", productRoute);
router.use("/discount", discountRoute);
router.use("/orders", orderRoute);
// router.use("/payment", paymentRoute);
router.use("/blogCategories", blogCategoryRoute);
router.use("/blogs", blogRoute);
router.use("/stories", storyRoute);
router.use("/services", serviceRoute);
router.use("/events", eventRoute);
router.use("/partners", partnerRoute);
router.use("/banners", bannerRoute);
router.use("/contacts", contactRoute);
router.use("/search", searchRoute);

module.exports = router;
