const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { isHuman } = require("./captcha");
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.DOMAIN,
});

const sendEmail = (email, firstName, lastName, password) => {
  const token = jwt.sign(
    { lastName, email, password },
    process.env.JWT_ACC_ACTIVATE,
    { expiresIn: "15m" }
  );

  const url = `${process.env.SERVER_URL}/users/email-activate/${token}`;
  const data = {
    from: "noreply@bartosz.com",
    to: email,
    subject: "Account Activation Link",
    html: `
          <h2> Please click on given link to activate your account </h2>
          <a href="${url}">Click</a>
        `,
  };
  mailgun.messages().send(data, (error, body) => {
    if (error) {
      return {
        error: error.message,
      };
    } else {
      console.log("message sent");
      console.log(body);
      return {
        message: "Email has been sent, activate your account",
      };
    }
  });
};

exports.signup = async (req, res) => {
  console.log("here");
  try {
    // console.log(req.body);
    let {
      email,
      phone,
      password,
      passwordCheck,
      firstName,
      lastName,
      captchaToken,
    } = req.body;

    //validation
    if (
      !email ||
      !password ||
      !passwordCheck ||
      !firstName ||
      !lastName ||
      !phone
    )
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (!captchaToken) {
      return res.status(400).json({ msg: "Please provide captcha" });
    }
    const human = await isHuman(captchaToken);
    console.log(human);
    if (!human) {
      return res.status(400).json({ msg: "You're not human" });
    }
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    //check if human

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    } else {
      //create new user with is_active=false

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          firstName,
          lastName,
          phone,
          email,
          password: hashedPassword,
          isActive: false,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
      console.log("send email");
      const emailResponse = sendEmail(email, firstName, lastName, password);
      return res.json(emailResponse);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.activateAccount = (req, res) => {
  const { token } = req.params;
  console.log(token);

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACC_ACTIVATE,
      async (err, decodedToken) => {
        if (err) {
          return res.redirect("http://localhost:3000/inactive-token");
        } else {
          try {
            const { lastName, email, password } = decodedToken;
            const updatedUser = await User.findOneAndUpdate(
              { email: email },
              { isActive: true }
            );

            return res.redirect("http://localhost:3000/email-activate");
          } catch (err) {
            res.status(400).json({ error: err.message });
          }
        }
      }
    );
  } else {
    return res.redirect("http://localhost:3000/inactive-token");
  }
};

exports.expiredToken = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const { firstName, lastName, password } = user;
    if (!user) {
      return res.json({ msg: "no user" });
    } else {
      const emailReposnse = sendEmail(email, firstName, lastName, password);
      return res.json({ msg: "email send" });
    }
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};
