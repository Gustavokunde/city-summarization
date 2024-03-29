import { Button } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import GoogleMapReact from "google-map-react";
import ReactGA from "react-ga";
import Card from "../../components/Card";
import { CityDetails } from "../../store/cities/cities";

import {
  DescriptivelySection,
  MainContainer,
  MapContainer,
  PopularAttractionsContainer,
} from "./styles";

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const CityDescriptions = ({
  latitude,
  longitude,
  name,
  male_population_amount,
  female_population_amount,
  population,
  region,
  regionCode,
  climate,
  cuisine,
  culture_history,
  local_tips,
  safety,
  top_attractions,
  transportation,
}: CityDetails) => {
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 11,
  };

  const onLearnMoreClick = (search: string) => {
    //included analytic tracking for button click
    ReactGA.event({
      category: "Button",
      action: "Click",
      label: "Learn more about" + search,
    });

    window.open(`http://www.google.com/search?q=${search}`);
  };

  return (
    <MainContainer>
      <img src="/background_city.png" />
      <h1>
        {name} - {region}/{regionCode}
      </h1>
      <div>
        <DescriptivelySection>
          <img src="/city_people.svg" />
          <h2>
            Population amount is of {population.toLocaleString()} habitants
          </h2>
          {male_population_amount && female_population_amount ? (
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: male_population_amount,
                      label: "male",
                      color: "#1A5EC7",
                    },
                    {
                      id: 1,
                      value: female_population_amount,
                      label: "female",
                      color: "#d32f2f",
                    },
                  ],
                },
              ]}
              width={500}
              height={400}
            />
          ) : (
            <></>
          )}
        </DescriptivelySection>
        <MapContainer>
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          />
        </MapContainer>
        {top_attractions.length > 0 && (
          <section>
            <h2>Most popular attractions </h2>
            <PopularAttractionsContainer>
              {top_attractions?.map((attraction) => (
                <Card>
                  <p>{attraction}</p>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onLearnMoreClick(attraction)}
                  >
                    Learn more
                  </Button>
                </Card>
              ))}
            </PopularAttractionsContainer>
          </section>
        )}
        <DescriptivelySection oppositeComponent={true}>
          <img src="/city_bike.svg" />
          <div>
            <h2>Transportation </h2>
            <p>{transportation}</p>
          </div>
        </DescriptivelySection>
        <DescriptivelySection>
          <div>
            <h2>Climate </h2>
            <p>{climate}</p>
          </div>
          <img src="/climate.svg" />
        </DescriptivelySection>
        <DescriptivelySection oppositeComponent={true}>
          <img src="/cuisine.svg" />
          <div>
            <h2>Cuisine </h2>
            <p>{cuisine}</p>
          </div>
        </DescriptivelySection>
        <DescriptivelySection>
          <div>
            <h2>Culture and history </h2>
            <p>{culture_history}</p>
          </div>
          <img src="/history.svg" />
        </DescriptivelySection>
        <DescriptivelySection oppositeComponent={true}>
          <img src="/reading.svg" />
          <div>
            <h2>Local tips and recommendations </h2>
            {typeof local_tips === "string" ? (
              <p>{local_tips}</p>
            ) : (
              <ul>
                {local_tips.map((tip) => (
                  <li>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        </DescriptivelySection>
        <DescriptivelySection>
          <div>
            <h2>Safety </h2>
            <p>{safety}</p>
          </div>
          <img src="/safety.svg" />
        </DescriptivelySection>
      </div>
    </MainContainer>
  );
};

export default CityDescriptions;
