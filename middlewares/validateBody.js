const HttpError = require("../utils/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const isFavorite = req.route.path === "/:contactId/favorite";
    const isEmpty = Object.keys(req.body).length === 0;

    if (isFavorite && isEmpty) {
      throw HttpError(400, "missing field favorite");
    }

    if (isEmpty) {
      throw HttpError(400, "missing fields");
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
