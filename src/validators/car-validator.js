const Joi = require("joi");

const checkCarIdSchema = Joi.object({
  carId: Joi.number().integer().positive().required(),
});

exports.checkCarIdSchema = checkCarIdSchema;
