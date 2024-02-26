import axios from "axios";
import { CityDetails } from "../../store/cities/cities";
import { Params } from "../params";

export function findCitiesByName(
  name: string,
  config: Params | null
): Promise<CityDetails[]> {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        `${config?.geodbURL}/geo/countries/${config?.countryCode}/places?limit=5&offset=0&types=CITY&namePrefix=${name}`,
        {
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
          },
        }
      )
      .then((res) => {
        return resolve(res.data.data as unknown as CityDetails[]);
      })
      .catch((err) => {
        return reject(
          "An error ocurred, please try again later " + err.toString()
        );
      });
  });
}
