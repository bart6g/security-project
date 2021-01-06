import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = () => {
  const onChange = (value) => {
    console.log("Captcha value:", value);
  };
  return (
    <ReCAPTCHA
      sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_SITE_KEY}
      onChange={onChange}
    />
  );
};

export default Captcha;
