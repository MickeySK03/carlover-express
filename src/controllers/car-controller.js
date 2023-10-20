const prisma = require("../models/prisma");
const { upload } = require("../utils/cloudinary-service");
const createError = require("../utils/create-error");
const fs = require("fs/promises");
const { checkCarIdSchema } = require("../validators/car-validator");

exports.getAllCar = async (req, res, next) => {
  try {
    const car = await prisma.car.findMany({});
    console.log(car);
    res.status(200).json({ car });
  } catch (err) {
    next(err);
  }
};

exports.postSellCar = async (req, res, next) => {
  try {
    const {
      price,
      year,
      color,
      mileage,
      fuelType,
      transmission,
      location,
      description,
      reservePrice,
      brand,
      model,
      driveTrain,
      seat,
    } = req.body;
    if (!req.file) {
      return next(createError("image is require", 400));
    }
    const data = {};
    if (req.file) {
      data.image = await upload(req.file.path);
    }
    if (price) {
      data.price = price;
    }
    if (year) {
      data.year = year;
    }
    if (color) {
      data.color = color;
    }
    if (mileage) {
      data.mileage = mileage;
    }
    if (fuelType) {
      data.fuelType = fuelType;
    }
    if (transmission) {
      data.transmission = transmission;
    }
    if (location) {
      data.location = location;
    }
    if (description) {
      data.description = description;
    }
    if (reservePrice) {
      data.reservePrice = reservePrice;
    }
    if (brand) {
      data.brand = brand;
    }
    if (model) {
      data.model = model;
    }
    if (driveTrain) {
      data.driveTrain = driveTrain;
    }
    if (seat) {
      data.seat = seat;
    }
    const post = await prisma.car.create({
      data: data,
    });
    res.status(201).json({ message: "post sell car created", post });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

exports.getCarById = async (req, res, next) => {
  try {
    const { carId } = req.params;
    console.log(carId);
    const detailCar = await prisma.car.findUnique({
      where: {
        id: +carId,
      },
    });
    res.status(200).json({ detailCar });
  } catch (err) {
    next(err);
  }
};

exports.deleteSellCar = async (req, res, next) => {
  try {
    const { value, error } = checkCarIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const existCar = await prisma.car.findFirst({
      where: {
        id: value.carId,
      },
    });
    if (!existCar) {
      return next(createError("cannot delete", 400));
    }
    await prisma.car.delete({
      where: {
        id: existCar.id,
      },
    });
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    next(err);
  }
};

exports.updateSellCar = async (req, res, next) => {
  try {
    const {
      price,
      year,
      color,
      mileage,
      fuelType,
      transmission,
      location,
      description,
      reservePrice,
      brand,
      model,
      driveTrain,
      seat,
    } = req.body;
    const data = {};
    if (req.file) {
      data.image = await upload(req.file.path);
    }
    if (price) {
      data.price = price;
    }
    if (year) {
      data.year = year;
    }
    if (color) {
      data.color = color;
    }
    if (mileage) {
      data.mileage = mileage;
    }
    if (fuelType) {
      data.fuelType = fuelType;
    }
    if (transmission) {
      data.transmission = transmission;
    }
    if (location) {
      data.location = location;
    }
    if (description) {
      data.description = description;
    }
    if (reservePrice) {
      data.reservePrice = reservePrice;
    }
    if (brand) {
      data.brand = brand;
    }
    if (model) {
      data.model = model;
    }
    if (driveTrain) {
      data.driveTrain = driveTrain;
    }
    if (seat) {
      data.seat = seat;
    }
    const { carId } = req.params;
    const updateCar = await prisma.car.update({
      where: {
        id: +carId,
      },
      data: data,
    });
    res.status(200).json({ message: "update car", updateCar });
  } catch (err) {
    next(err);
  }
};
