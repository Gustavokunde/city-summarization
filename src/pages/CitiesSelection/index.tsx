// import { Container } from './styles';
import { Autocomplete, Button, debounce, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { array, string } from "yup";
import { config } from "../../config/config";
import { getCitiesDetails } from "../../services/aiAPI/openAi";
import { findCitiesByName } from "../../services/placesAPI/findCitiesOptions";
import CityDescriptions from "../../templates/CityDescriptions";

const CitiesSelection = () => {
  const [citiesList, setCitiesList] = useState<Array<string>>([]);
  const [focusedFieldIndex, setFocusedFieldIndex] = useState<number | null>(
    null
  );

  const [citiesDetails, setCitiesDetails] = useState([]);
  const formik = useFormik({
    initialValues: [...Array(config.numberOfCityOptions).fill("")],
    validateOnChange: true,
    validateOnMount: false,
    validationSchema: array()
      .min(config.numberOfCityOptions)
      .of(
        string()
          .required("Field is required")
          .test(
            "test-city",
            "City name must be unique",
            function (value, { parent }) {
              if (value) {
                return (
                  parent.filter((city: string) => city === value).length === 1
                );
              } else return true;
            }
          )
      ),
    onSubmit: (values) => {
      getCitiesDetails(values).then((response) => {
        console.log(response);
        setCitiesDetails(response);
      });
    },
  });

  useEffect(() => {
    const inputValue =
      formik.values[focusedFieldIndex as keyof typeof formik.values];
    if (focusedFieldIndex !== null && inputValue)
      findCitiesByName(inputValue)
        .then((cities) => {
          setCitiesList(cities);
        })
        .catch((err) => console.log(err));
  }, [
    focusedFieldIndex,
    formik.values[focusedFieldIndex as keyof typeof formik.values],
  ]);

  const debounceInputSearch = useCallback(
    debounce((name, value) => {
      console.log(value, name);
      formik.setFieldValue(name, value);
    }, 300),
    []
  );

  const onInputBlur = useCallback(() => {
    setCitiesList([]);
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.map((_, index) => {
        return (
          <Autocomplete
            disablePortal
            key={index}
            id={index.toString()}
            options={citiesList}
            onInputChange={(_, value) => debounceInputSearch(index, value)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={
                  formik.touched[index] && (formik.errors[index] as string)
                }
                onBlurCapture={formik.handleBlur}
                error={formik.touched[index] && !!formik.errors[index]}
                name={index.toString()}
                label="Type a city in the US"
                onFocus={() => setFocusedFieldIndex(index)}
                onBlur={onInputBlur}
              />
            )}
          />
        );
      })}
      <Button type="submit">Enviar</Button>

      {citiesDetails.map((city) => (
        <CityDescriptions {...city} />
      ))}
    </form>
  );
};

export default CitiesSelection;
