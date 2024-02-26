import { useEffect } from "react";
import ReactGA from "react-ga";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CitiesState, CityDetails } from "../../store/cities/cities";
import CityDescriptions from "../../templates/CityDescriptions";

const createMarkup = (cityDetails: CityDetails) => {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: cityDetails.name,
    description: cityDetails.description,
    address: {
      addressRegion: cityDetails.region,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: cityDetails.latitude,
      longitude: cityDetails.longitude,
    },
    url: window.location.href,
  };
};

const CityLandPage = () => {
  const { cityName } = useParams();

  const cityDetails = useSelector((state: CitiesState) => state.cities).find(
    (city) => city.name === cityName
  )!;

  useEffect(() => {
    //included analytic event on load city page
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <CityDescriptions {...cityDetails} />

      {/* included schema markup with city landingPage content */}
      <script type="application/ld+json">
        {JSON.stringify(createMarkup(cityDetails))}
      </script>
    </>
  );
};

export default CityLandPage;
