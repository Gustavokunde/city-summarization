import { array, object, string } from "yup";
import { Params } from "../../services/params";
import { CityDetails } from "../../store/cities/cities";

export const validationSchema = (config: Params | null) =>
  array()
    .min(config?.numberOfCityOptions || 0)
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
                parent?.filter(
                  (city: CityDetails) =>
                    city.name && value.name && city?.name === value?.name
                )?.length !== 1
              );
            } else return true;
          }
        )
    );
