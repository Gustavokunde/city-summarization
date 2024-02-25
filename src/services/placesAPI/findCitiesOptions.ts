import axios from "axios";
import { config } from "../../config/config";
import { CityDetails } from "../../store/cities/cities";

export function findCitiesByName(name: string): Promise<CityDetails[]> {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        `https://geodb-free-service.wirefreethought.com/v1/geo/countries/${config.countryCode}/places?limit=5&offset=0&types=CITY&namePrefix=${name}`
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
