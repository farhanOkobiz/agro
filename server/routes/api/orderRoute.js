const express = require("express");
const protectMiddleware = require("../../middlewares/protectMiddleware");
const restrictToMiddleware = require("../../middlewares/restrictToMiddleware");
const {
  uploadPhotoMiddleware,
  cloudinaryUploadMiddleware,
} = require("../../middlewares/photoMiddleware");

const {
  createOrderController,
  getAllOrdersController,
  getOrderController,
  updateOrderController,
  deleteOrderController,
} = require("../../controllers/orderController");

const router = express.Router();

router.use(protectMiddleware);

router
  .route("/")
  .post(
    uploadPhotoMiddleware(),
    cloudinaryUploadMiddleware("order", "photo"),
    createOrderController
  )
  .get(getAllOrdersController);

router.get("/:id", getOrderController);

router.use(restrictToMiddleware("admin"));
router.route("/:id").patch(updateOrderController).delete(deleteOrderController);

module.exports = router;
