import React, { useState } from "react";
import {
  Form,
  FormContainer,
  InputContainer,
  InputWrap,
  FormLabel,
  FormInput,
  SubmitBtn,
  FormH1,
} from "../SignIn/SigninElements";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };
    console.log(loginData);
    try {
      const loginResponse = await axios.post(
        "http://localhost:4000/users/login",
        loginData
      );
      let { token, user } = loginResponse.data;
      console.log(token);
      token = token ? token : undefined;
      user = user ? user : undefined;

      if (!token) {
        history.push("/loginfailed");
      } else {
        history.push("loginsuccess");
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };
  return (
    <>
      <FormContainer>
        <Form login="true" onSubmit={(e) => handleSubmit(e)}>
          <FormH1>Login</FormH1>
          <InputContainer>
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
            <SubmitBtn type="submit">Login</SubmitBtn>
          </InputContainer>
        </Form>
      </FormContainer>
    </>
  );
};

export default LoginForm;
