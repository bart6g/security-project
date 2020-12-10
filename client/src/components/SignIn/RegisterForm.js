import React, { useState } from "react";
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
import axios from "axios";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errors, setErrors] = useState(null);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        passwordCheck,
      };
      const userResponse = await axios.post(
        "http://localhost:4000/users/register",
        newUser
      );

      console.log(userResponse.data);
    } catch (err) {
      setErrors(err.response.data.msg);
      console.log(err.response.data.msg);
    }
  };
  return (
    <>
      <FormContainer>
        <Form onSubmit={(e) => handleSubmit(e)} errors={errors ? true : false}>
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormInput>
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

            <SubmitBtn type="submit">Register</SubmitBtn>
          </InputContainer>
        </Form>
      </FormContainer>
    </>
  );
};

export default RegisterForm;
