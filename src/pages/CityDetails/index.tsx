import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CitiesState } from "../../store/cities/cities";
import CityDescriptions from "../../templates/CityDescriptions";

const CityLandPage = () => {
  const { cityName } = useParams();

  const cityDetails = useSelector((state: CitiesState) => state.cities).find(
    (city) => city.name === cityName
  )!;

  return <CityDescriptions {...cityDetails} />;
};

export default CityLandPage;
