const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Nexmo = require("nexmo");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
require("dotenv").config();

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});

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
      const { isActive, phone } = user;
      if (!isActive) {
        return res.status(400).json({ msg: "You have to verify your email" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid email or password" });
        }
        // const secret = speakeasy.generateSecret({
        //   name: "thisIsSecret",
        // });
        // console.log(secret);
        // qrcode.toDataURL(secret.otpauth_url, (err, data) => {
        //   if (err) {
        //     return res.json({ msg: err.message });
        //   } else {
        //     console.log(data);
        //     return res.json({ qrCode: data, ascii: secret.ascii });
        //   }
        // });
        nexmo.verify.request(
          {
            number: `48${phone}`,
            brand: "Vonage",
            code_length: "4",
          },
          (err, result) => {
            if (err) {
              return res.json({ msg: err.message });
            } else {
              console.log("sms sent");
              console.log(result);
              return res.json({ requestId: result.request_id });
            }
          }
        );
      }
    }
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

exports.verify = async (req, res) => {
  const { email, password, requestId, secret } = req.body;

  if (!email || !password || !requestId || !secret) {
    return res.status(400).json({ msg: "Something went wrong" });
  }

  try {
    const user = await User.findOne({ email: email });

    nexmo.verify.check(
      {
        request_id: requestId,
        code: secret,
      },
      (err, result) => {
        if (err) {
          return res.json({ err: err.message });
        } else {
          console.log(result);
          console.log(result.status);
          if (result.status === "0") {
            const token = jwt.sign({ id: user._id }, process.env.JWT_LOGIN);
            console.log("token sent");
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
        }
      }
    );
    // const verified = speakeasy.totp.verify({
    //   secret,
    //   encoding: "ascii",
    //   token: tokenAuth,
    // });
    // if (verified) {
    //   const token = jwt.sign({ id: user._id }, process.env.JWT_LOGIN);
    //   res.json({
    //     token,
    //     user: {
    //       id: user._id,
    //       name: user.name,
    //       email: user.email,
    //     },
    //   });
    // } else {
    //   return res.json({ msg: "Auth token has expired or something" });
    // }
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // console.log(req.body);
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
