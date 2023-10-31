const { ADMIN } = require("../config/constants");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

module.exports = async (req, res, next) => {
  try {
    const admin = await prisma.user.findUnique({
      where: {
        id: req.user.id,
        role: ADMIN,
      },
    });
    if (!admin) {
      return next(createError("Forbidden", 403));
    }
    next();
  } catch (err) {
    next(err);
  }
};
