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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    console.log(loginData);
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
