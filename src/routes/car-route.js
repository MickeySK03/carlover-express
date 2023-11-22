const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const uploadMiddleware = require("../middlewares/upload");
const permissionMiddleware = require("../middlewares/permission");
const carController = require("../controllers/car-controller");
const router = express.Router();

router.get("/allcars", authenticateMiddleware, carController.getAllCar);
router.post(
  "/sellcar",
  authenticateMiddleware,
  permissionMiddleware,
  uploadMiddleware.single("image"),
  carController.postSellCar
);
router.get("/allcars/:carId", authenticateMiddleware, carController.getCarById);
router.delete(
  "/allcars/:carId",
  authenticateMiddleware,
  permissionMiddleware,
  carController.deleteSellCar
);
router.patch(
  "/allcars/:carId",
  authenticateMiddleware,
  permissionMiddleware,
  uploadMiddleware.single("image"),
  carController.updateSellCar
);
router.post(
  "/bookcar/:carId",
  authenticateMiddleware,
  uploadMiddleware.single("image"),
  carController.reserveCar
);

router.get("/usercar", authenticateMiddleware, carController.userReservedCar);

router.get(
  "/userPendingCar",
  authenticateMiddleware,
  carController.userPendingCar
);

router.get(
  "/admincar",
  authenticateMiddleware,
  permissionMiddleware,
  carController.adminReservedCar
);

router.patch(
  "/admincar/:carId",
  authenticateMiddleware,
  permissionMiddleware,
  carController.adminCancelReserve
);

router.get(
  "/adminPendingCar",
  authenticateMiddleware,
  permissionMiddleware,
  carController.adminPendingCar
);

router.patch(
  "/editStatus/:carId",
  authenticateMiddleware,
  permissionMiddleware,
  carController.adminConfirm
);

module.exports = router;
