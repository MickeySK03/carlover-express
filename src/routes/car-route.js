const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const uploadMiddleware = require("../middlewares/upload");
const carController = require("../controllers/car-controller");
const router = express.Router();

router.get("/allcars", authenticateMiddleware, carController.getAllCar);
router.post(
  "/sellcar",
  authenticateMiddleware,
  uploadMiddleware.single("image"),
  carController.postSellCar
);
router.get("/allcars/:carId", authenticateMiddleware, carController.getCarById);
router.delete(
  "/allcars/:carId",
  authenticateMiddleware,
  carController.deleteSellCar
);
router.patch(
  "/allcars/:carId",
  authenticateMiddleware,
  uploadMiddleware.single("image"),
  carController.updateSellCar
);

module.exports = router;
