import GoogleMapReact from "google-map-react";
import { CityDetails } from "../../store/cities/cities";

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const CityDescriptions = ({
  name,
  description,
  longitude,
  latitude,
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
      <h1>{name}</h1>
      <p>{description}</p>
      <div style={{ maxHeight: "100vh", height: 500, width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default CityDescriptions;
