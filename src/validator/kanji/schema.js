const Joi = require("joi");

const KanjiPayloadSchema = Joi.object({
  question: Joi.string().required(),
  correctAnswer: Joi.string().required(),
  incorrectAnswer1: Joi.string().required(),
  incorrectAnswer2: Joi.string().required(),
  incorrectAnswer3: Joi.string().required(),
});

module.exports = { KanjiPayloadSchema };
