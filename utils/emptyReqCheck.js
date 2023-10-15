const HttpError = require("./");

const emptyCheck = () => {
  const func = (req, res, next) => {
    console.log("func -> req:", Object.keys(req.body).length);

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    next();
  };

  return func;
};

module.exports = emptyCheck;
