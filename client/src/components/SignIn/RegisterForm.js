import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  FormContainer,
  Form,
  FormH1,
  InputContainer,
  FormInput,
  FormLabel,
  InputWrap,
  SubmitBtn,
} from "./SigninElements";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import PasswordMeter from "./PasswordMeter";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errors, setErrors] = useState(null);
  const [captchaToken, setCaptcha] = useState(null);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName,
        lastName,
        email,
        phone,
        password,
        passwordCheck,
        captchaToken,
      };
      const userResponse = await axios.post(
        "http://localhost:4000/users/register",
        newUser
      );

      console.log(userResponse);
      if (userResponse.status === 200) {
        history.push("/registersuccess");
      }
    } catch (err) {
      setErrors(err.response.data.msg);
      console.log(err.response.data.msg);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setErrors(null);
    setCaptcha(null);
  };

  const onCaptchaChange = (value) => {
    setCaptcha(value);
  };

  return (
    <>
      <FormContainer>
        <Form errors={errors ? true : false}>
          <FormH1>Registration Form</FormH1>
          <InputContainer>
            {errors ? (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {errors}
              </p>
            ) : null}
            <InputWrap>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <FormInput
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></FormInput>
            </InputWrap>
            <InputWrap>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <FormInput
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></FormInput>
            </InputWrap>
            <InputWrap>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormInput>
            </InputWrap>
            <InputWrap>
              <FormLabel htmlFor="phone">Phone number</FormLabel>
              <FormInput
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></FormInput>
            </InputWrap>
            <InputWrap>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormInput>
              {password ? <PasswordMeter password={password} /> : null}
            </InputWrap>
            <InputWrap>
              <FormLabel htmlFor="passwordcheck">Repeat password</FormLabel>
              <FormInput
                type="password"
                id="passwordcheck"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              ></FormInput>
            </InputWrap>

            <SubmitBtn onClick={(e) => handleSubmit(e)}>Register</SubmitBtn>
            <button onClick={(e) => handleClear(e)}>Clear</button>
          </InputContainer>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onCaptchaChange}
          />
        </Form>
      </FormContainer>
    </>
  );
};

export default RegisterForm;
