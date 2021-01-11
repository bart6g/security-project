const limitter = require("express-rate-limit");

exports.loginLimitter = limitter({
  windowMs: 5000,
  max: 3,
  message: {
    code: 429,
    message: "Too many request!",
  },
});
