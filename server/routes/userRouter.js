const router = require("express").Router();
const {
  signup,
  activateAccount,
  expiredToken,
} = require("../middlewares/register");
const { login } = require("../middlewares/login");

router.get("/", (req, res) => {
  res.json("hello user");
});

router.post("/register", signup);
router.post("/login", login);
router.get("/email-activate/:token", activateAccount);
router.post("/expired-token", expiredToken);

module.exports = router;
