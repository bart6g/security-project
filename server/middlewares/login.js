const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    console.log("login");
    console.log(req.body);
    console.log("login");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    //check if user exists
    const user = await User.findOne({ email: email });
    const { isActive } = user;
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with following email exists" });
    } else {
      if (!isActive) {
        return res.status(400).json({
          msg: "You must activate your account, please check your email",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_LOGIN);
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
