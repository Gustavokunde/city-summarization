import { styled } from "styled-components";

export const FormContainer = styled.form`
  margin: 0 auto;
  height: 90vh;
  width: 90vw;
  > div {
    border-radius: 10px;
    border: 1px solid #c1c1c1;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 24px 50px;
  }
`;
