const InvariantError = require("../../exceptions/InvariantError");
const { KanjiPayloadSchema } = require("./schema");

const KanjiValidator = {
  validateKanjiPayload: (payload) => {
    const validationResult = KanjiPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = KanjiValidator;
