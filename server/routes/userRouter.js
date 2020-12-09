const router = require("express").Router();
const {
  signup,
  activateAccount,
  expiredToken,
} = require("../middlewares/register");
const { twoFactorAuth, verify } = require("../middlewares/login");

router.get("/", (req, res) => {
  res.json("hello user");
});

router.post("/register", signup);
router.post("/twoFactor", twoFactorAuth);
router.post("/verify", verify)
router.get("/email-activate/:token", activateAccount);
router.post("/expired-token", expiredToken);

module.exports = router;
