const axios = require("axios");

exports.isHuman = async (token) => {
  console.log("verify started");
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  if (!token) {
    return false;
  }

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  );
  if (response) {
    return response.data.success;
  } else {
    return false;
  }
};
