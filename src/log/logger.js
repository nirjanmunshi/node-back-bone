const moment = require("moment");

// middleware functions
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : ${moment().format('yyyy-MM-D h:m:s')}`
  );
  next();
};

module.exports = logger;
