const router = require("express").Router();
const { signup, activateAccount, expiredToken } = require("../middlewares/register");

router.get("/", (req, res) => {
  res.json("hello user");
});

router.post("/register", signup);
router.get("/email-activate/:token", activateAccount);
router.post("/expired-token", expiredToken )

module.exports = router;
