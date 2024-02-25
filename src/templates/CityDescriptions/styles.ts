import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 100vh;
  margin: 0 auto;
  > div {
    max-width: 1140px;
    margin: 0 auto;
    background-color: RGB(4, 76, 250, 0.05);
    padding: 24px;
    border-radius: 24px;
    position: relative;
    z-index: 2;
  }
  > img {
    z-index: 1;
    position: relative;
    max-width: 100%;
    margin-top: -50px;
  }

  h1 {
    margin-top: -220px;
    margin-bottom: 100px;
    position: relative;
    z-index: 2;
    @media (max-width: 920px) {
      margin-top: -100px;
      font-size: 32px;
      margin-bottom: 80px;
    }
    @media (max-width: 750px) {
      margin-top: -90px;
      margin-bottom: 50px;
    }
    @media (max-width: 450px) {
      margin-top: -50px;
      margin-bottom: 20px;
    }
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  max-height: 100vh;
  div {
    border-radius: 5px;
  }
`;

export const PopularAttractionsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const DescriptivelySection = styled.section<{
  oppositeComponent?: boolean;
}>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 24px 0px;

  h2 {
    margin-bottom: 0;
    max-width: 200px;
  }

  img {
    width: 300px;
    max-width: 100%;
  }

  div {
    display: flex;
    flex-direction: column;
    max-width: 25%;
    flex-wrap: wrap;
    p {
      display: inline;
      font-size: 18px;
      text-align: left;
    }

    li {
      text-align: left;
    }
  }
  @media (max-width: 1200px) {
    div {
      max-width: 100%;
    }

    flex-direction: ${(props) =>
      props.oppositeComponent ? "column-reverse" : "column"};
  }
`;

export const AttractionCard = styled.div`
  border-top-left-radius: 24px;
  border-bottom-right-radius: 24px;
  color: #fff;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 200px;
  height: 200px;
  background: #1a5ec7;
  font-size: 18px;
  font-weight: bold;
`;
