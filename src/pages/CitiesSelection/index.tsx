// import { Container } from './styles';
import { Autocomplete, debounce, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { array, string } from "yup";
import { config } from "../../config/config";
import { findCitiesByName } from "../../services/placesAPI/findCitiesOptions";

// getCitiesDetails();

const CitiesSelection = () => {
  const [citiesList, setCitiesList] = useState<Array<string>>([]);
  const [focusedFieldIndex, setFocusedFieldIndex] = useState<number | null>(
    null
  );
  const formik = useFormik({
    initialValues: [...Array(config.numberOfCityOptions).fill("")],
    validateOnChange: true,
    validationSchema: array()
      .min(config.numberOfCityOptions)
      .of(
        string()
          .notRequired()
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
    onSubmit: () => {},
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
  useEffect(() => {}, []);

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
    <div>
      {formik.values.map((_, index) => {
        const name = `cities[${index}]`;
        return (
          <Autocomplete
            disablePortal
            key={name}
            id={name}
            options={citiesList}
            onInputChange={(_, value) => debounceInputSearch(index, value)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={formik.errors[index] as string}
                error={!!formik.errors[index]}
                name={name}
                label="Type a city in the US"
                onFocus={() => setFocusedFieldIndex(index)}
                onBlur={onInputBlur}
              />
            )}
          />
        );
      })}
    </div>
  );
};

export default CitiesSelection;
