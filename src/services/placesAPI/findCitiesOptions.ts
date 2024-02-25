import axios from "axios";
import { config } from "../../config/config";
import { CityDetails } from "../../store/cities/cities";

export function findCitiesByName(name: string): Promise<CityDetails[]> {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        `${config.geodbURL}/geo/countries/${config.countryCode}/places?limit=5&offset=0&types=CITY&namePrefix=${name}`,
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
        console.log(err);
        return reject(err);
      });
  });
}
