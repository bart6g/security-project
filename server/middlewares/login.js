const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
require("dotenv").config();

exports.twoFactorAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "No account with following email" });
    } else {
      const { isActive } = user;
      if (!isActive) {
        return res.status(400).json({ msg: "You have to verify your email" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid email or password" });
        }
        const secret = speakeasy.generateSecret({
          name: "thisIsSecret",
        });
        console.log(secret);
        qrcode.toDataURL(secret.otpauth_url, (err, data) => {
          if (err) {
            return res.json({ msg: err.message });
          } else {
            console.log(data);
            return res.json({ qrCode: data, ascii: secret.ascii });
          }
        });
      }
    }
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

exports.verify = async (req, res) => {
  const { email, password, tokenAuth, secret } = req.body;

  if (!email || !password || !tokenAuth || !secret) {
    return res.status(400).json({ msg: "Something went wrong" });
  }

  try {
    const user = await User.findOne({ email: email });

    const verified = speakeasy.totp.verify({
      secret,
      encoding: "ascii",
      token: tokenAuth,
    });
    if (verified) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_LOGIN);
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      return res.json({ msg: "Auth token has expired or something" });
    }
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    //check if user exists
    const user = await User.findOne({ email: email });
    console.log(user);
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
