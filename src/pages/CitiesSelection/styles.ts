import styled from "styled-components";

export const FormSection = styled.section`
  form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap;
  }
  @media (max-width: 924px) {
    h1 {
      font-size: 32px;
    }

    h2 {
      font-size: 24px;
    }
  }
`;

export const SubmitButtonContent = styled.div`
  width: 100%;
`;

export const CitiesChosenSection = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;

  > div {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }
`;
