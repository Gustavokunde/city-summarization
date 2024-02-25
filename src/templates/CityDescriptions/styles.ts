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
    max-width: 100vh;
    margin-top: -50px;
  }

  h1 {
    margin-top: -220px;
    margin-bottom: 100px;
    position: relative;
    z-index: 2;
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

export const DescriptivelySection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 24px 0px;
  img {
    max-width: 300px;
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
