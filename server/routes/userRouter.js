const router = require("express").Router();
const {
  signup,
  activateAccount,
  expiredToken,
} = require("../middlewares/register");
const { twoFactorAuth, verify } = require("../middlewares/login");
const { loginLimitter } = require("../middlewares/limitters");

router.get("/", (req, res) => {
  res.json("hello user");
});

router.post("/register", loginLimitter, signup);
router.post("/twoFactor", loginLimitter, twoFactorAuth);
router.post("/verify", loginLimitter, verify);
router.get("/email-activate/:token", loginLimitter, activateAccount);
router.post("/expired-token", loginLimitter, expiredToken);

module.exports = router;
