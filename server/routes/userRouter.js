const router = require("express").Router();
const { signup, activateAccount } = require("../middlewares/register");

router.get("/", (req, res) => {
  res.json("hello user");
});

router.post("/register", signup);
router.post("/email-activate", activateAccount);

module.exports = router;
