// import { Container } from './styles';
import axios from "axios";
import { useFormik } from "formik";
import { config } from "../../config/config";

const CitiesSelection = () => {
  const formik = useFormik({
    initialValues: {
      cities: [...Array(config.numberOfCityOptions)],
    },
    onSubmit: () => {},
  });

  axios
    .get(
      `http://geodb-free-service.wirefreethought.com/v1/geo/countries/${config.countryCode}/places?limit=5&offset=0&types=CITY&namePrefix=New`
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));

  return (
    <div>
      {formik.values.cities.map((_, index) => (
        <input
          name={`cities[${index}]`}
          id={`cities[${index}]`}
          onChange={formik.handleChange}
        />
      ))}
    </div>
  );
};

export default CitiesSelection;
