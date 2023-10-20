const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization);
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(createError("unauthenticated", 401));
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "mascort");
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    if (!user) {
      return next(createError("unauthenticated", 401));
    }
    delete user.password;
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpireError" || err.name === "JsonWebTokenError") {
      err.statusCode = 401;
    }
    next(err);
  }
};
