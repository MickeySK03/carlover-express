const prisma = require("../models/prisma");
const { upload } = require("../utils/cloudinary-service");
const createError = require("../utils/create-error");
const fs = require("fs/promises");
const { checkCarIdSchema } = require("../validators/car-validator");
const { RESERVED } = require("../config/constants");

exports.getAllCar = async (req, res, next) => {
  try {
    const car = await prisma.car.findMany({
      where: {
        isReserve: false,
      },
    });
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

exports.reserveCar = async (req, res, next) => {
  try {
    const { userPhone } = req.body;
    const { carId } = req.params;
    const data = { userId: req.user.id };

    const reservedCheck = await prisma.car.findUnique({
      where: {
        id: +carId,
        isReserve: true,
      },
    });
    if (reservedCheck) {
      return next(createError("car already booked", 400));
    }
    console.log(userPhone);
    const reserveCar = await prisma.reserveCar.create({
      data: {
        status: RESERVED,
        userPhone: userPhone,
        userId: data.userId,
        carId: +carId,
      },
    });
    await prisma.car.update({
      where: {
        id: +carId,
      },
      data: {
        isReserve: true,
      },
    });

    res.status(201).json({ message: "reserved success", reserveCar });
  } catch (err) {
    next(err);
  }
};

exports.userReservedCar = async (req, res, next) => {
  try {
    const userCar = await prisma.reserveCar.findMany({
      where: {
        userId: req.user.id,
        status: RESERVED,
      },
      include: {
        car: {
          select: {
            price: true,
            year: true,
            color: true,
            mileage: true,
            fuelType: true,
            transmission: true,
            location: true,
            image: true,
            description: true,
            reservePrice: true,
            isReserve: true,
            brand: true,
            model: true,
            seat: true,
            driveTrain: true,
          },
        },
      },
    });
    res.status(200).json({ userCar });
  } catch (err) {
    next(err);
  }
};

exports.adminReservedCar = async (req, res, next) => {
  try {
    const adminCar = await prisma.reserveCar.findMany({
      include: {
        car: {
          select: {
            price: true,
            year: true,
            color: true,
            mileage: true,
            fuelType: true,
            transmission: true,
            location: true,
            image: true,
            description: true,
            reservePrice: true,
            isReserve: true,
            brand: true,
            model: true,
            seat: true,
            driveTrain: true,
          },
        },
      },
    });
    res.status(200).json({ adminCar });
  } catch (err) {
    next(err);
  }
};

exports.adminCancelReserve = async (req, res, next) => {
  try {
    const { carId } = req.params;
    const cancelReserve = await prisma.car.update({
      where: {
        id: +carId,
      },
      data: {
        isReserve: false,
      },
    });
    const cancelCar = await prisma.reserveCar.findFirst({
      where: {
        carId: +carId,
      },
    });
    await prisma.reserveCar.delete({
      where: {
        id: cancelCar.id,
      },
    });
    res.status(200).json({ message: "cancel success", cancelReserve });
  } catch (err) {
    next(err);
  }
};
