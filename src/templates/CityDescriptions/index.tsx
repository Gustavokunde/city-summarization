import GoogleMapReact from "google-map-react";
import { CityDetails } from "../../store/cities/cities";
import { MapContainer } from "./styles";

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const CityDescriptions = ({
  description,
  latitude,
  longitude,
  name,
  population,
  region,
  regionCode,
}: CityDetails) => {
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 11,
  };

  return (
    <div>
      <h1>
        {name} - {region} - {regionCode}
      </h1>
      <p>{description}</p>
      <section>
        <p>Population amount: {population}</p>
      </section>
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        />
      </MapContainer>
    </div>
  );
};

export default CityDescriptions;
