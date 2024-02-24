import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CityDescriptions from "../../templates/CityDescriptions";

const CityDetails = () => {
  const { cityName } = useParams();

  const cityDetails = useSelector((state) => state.cities).find(
    (city) => city.name === cityName
  );

  return <CityDescriptions {...cityDetails} />;
};

export default CityDetails;
