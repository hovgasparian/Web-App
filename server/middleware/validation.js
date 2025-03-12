const { sendErrorResponse } = require("../utils/helper");
const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return sendErrorResponse(res, error.message);
      next();
  };
};

module.exports = { validation };
