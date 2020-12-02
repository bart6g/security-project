const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.DOMAIN,
});

exports.signup = async (req, res) => {
  console.log("here");
  try {
    // console.log(req.body);
    let { email, password, passwordCheck, name } = req.body;
    !name ? (name = email) : name;

    //validation
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    } else {
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACC_ACTIVATE,
        { expiresIn: "15m" }
      );

      //create new user with is_active=false

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          isActive: false,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }

      const data = {
        from: "noreply@bartosz.com",
        to: email,
        subject: "Account Activation Link",
        html: `
          <h2> Please click on given link to activate your account </h2>
          <a> ${process.env.SERVER_URL}/auth/activate/${token}</a>
        `,
      };
      mailgun.messages().send(data, (error, body) => {
        if (error) {
          return res.json({
            error: error.message,
          });
        } else {
          console.log("message sent");
          console.log(body);
          return res.json({
            message: "Email has been sent, activate your account",
          });
        }
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.activateAccount = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACC_ACTIVATE,
      async (err, decodedToken) => {
        if (err) {
          return res.status(400).json({ error: "Incorrect or expired link" });
        } else {
          try {
            const { name, email, password } = decodedToken;
            const updatedUser = await User.findOneAndUpdate(
              { email: email },
              { isActive: true }
            );
            res.json(updatedUser);
          } catch (err) {
            res.status(400).json({ error: err.message });
          }
        }
      }
    );
  } else {
    return res.json({ error: "something went wrong" });
  }
};
