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
  const [isClickedLogin, setIsClicedLogin] = useState(true);
  const [qrcode, setQrcode] = useState(null)
  const [tokenAuth, setTokenAuth] = useState(null)
  const [secret, setSecret] = useState('')
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };
    console.log(loginData);
    try {
      const qrcodeResponse = await axios.post(
        "http://localhost:4000/users/twoFactor",
        loginData
      );

      console.log(qrcodeResponse.data.qrCode)
   
        setQrcode(qrcodeResponse.data.qrCode)
        setSecret(qrcodeResponse.data.ascii)
        setIsClicedLogin(true)
     
    } catch (err) {
      setQrcode(null)
      setIsClicedLogin(false)
      console.log(err.response.data.msg);
    }
  };

  const handleAuth = async (e)=>{
    e.preventDefault();

    try{
      const authData={
        email,
        password,
        tokenAuth,
        secret
      }
      const authResponse = await axios.post("http://localhost:4000/users/verify", authData)
      console.log(authResponse)
      let {token, user} = authResponse.data;
      token = token ? token : null;
      user = user ? user : null;
      console.log(token);
      console.log(user)
    }catch(err){
      console.log(err)
    }

  }

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
      {!isClickedLogin ? null : (qrcode ? (<div><img src={qrcode} alt="this is qr code"/>
      <div>
        <label htmlFor="code">
        Enter your code here</label>
        <input type="text" id="code" value={tokenAuth} onChange={(e)=> setTokenAuth(e.target.value)}/>
        <button onClick={(e)=>handleAuth(e)}>Confirm</button>
      </div>
      </div>) : null)}
    </>
  );
};

export default LoginForm;
