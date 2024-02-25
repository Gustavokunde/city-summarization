import { array, object, string } from "yup";
import { config } from "../../config/config";
import { CityDetails } from "../../store/cities/cities";

export const validationSchema = array()
  .min(config.numberOfCityOptions)
  .of(
    object()
      .shape({
        name: string(),
      })
      .required("Field is required")
      .test(
        "test-city",
        "City name must be unique",
        function (value, { parent }) {
          if (value) {
            return (
              parent.filter((city: CityDetails) => city?.name === value?.name)
                ?.length === 1
            );
          } else return true;
        }
      )
  );
