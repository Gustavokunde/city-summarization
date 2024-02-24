import axios from "axios";
import { config } from "../../config/config";

export const findCitiesByName = (name: string) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        `http://geodb-free-service.wirefreethought.com/v1/geo/countries/${config.countryCode}/places?limit=5&offset=0&types=CITY&namePrefix=${name}`
      )
      .then((res) => {
        return resolve(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  });
};
