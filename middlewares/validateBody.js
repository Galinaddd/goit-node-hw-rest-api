const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { name, email, phone } = req.body;
    switch (req.method) {
      case "POST":
        const errorMessage =
          `missing  required ` +
          `${!name ? " name" : ""}` +
          `${!email ? " email" : ""}` +
          `${!phone ? " phone" : ""}` +
          ` field`;

        if (!name || !email || !phone) {
          next(HttpError(400, errorMessage));
        }
        break;
      case "PUT":
        if (JSON.stringify(req.body) == "{}") {
          next(HttpError(400, "missing fields"));
        }
        break;

      case "PATCH":
        if (JSON.stringify(req.body) == "{}") {
          next(HttpError(400, "missing field favorite"));
        }
        break;
    }

    next();
  };
  return func;
};
module.exports = validateBody;
