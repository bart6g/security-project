import styled from "styled-components";

export const FormContainer = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

export const Form = styled.form`
  height: 620px;
  width: 350px;
  background-color: #fff;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

export const FormH1 = styled.h1`
  font-size: 32px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const InputWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 10px 0;
`;

export const FormLabel = styled.label`
  font-size: 18px;
  padding: 5px 0;
`;

export const FormInput = styled.input`
  padding: 5px 8px;
  font-size: 16px;
`;

export const SubmitBtn = styled.button`
  border-radius: 50px;
  width: 200px;
  background-color: #01bf71;
  white-space: nowrap;
  margin: 10px 0;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    transform: translateY(-5px);
  }
`;
