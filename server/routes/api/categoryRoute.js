const express = require("express");
const protectMiddleware = require("../../middlewares/protectMiddleware");
const restrictToMiddleware = require("../../middlewares/restrictToMiddleware");
const {
  getAllCategoriesController,
  getCategoryController,
  getAllProductsOfCategory,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controllers/categoryController");

const router = express.Router();

router.get("/", getAllCategoriesController);
router.get("/:slug", getCategoryController);
router.get("/:slug/products", getAllProductsOfCategory);

router.use(protectMiddleware);
router.use(restrictToMiddleware("admin"));

router.post("/", createCategoryController);

router
  .route("/:slug")
  .patch(updateCategoryController)
  .delete(deleteCategoryController);

module.exports = router;
