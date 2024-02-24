import {
  Autocomplete,
  Button,
  debounce,
  Skeleton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { array, object } from "yup";
import { config } from "../../config/config";
import { findCitiesByName } from "../../services/placesAPI/findCitiesOptions";
import { addCities, CitiesState, CityDetails } from "../../store/cities/cities";
import {
  CitiesChosenSection,
  FormSection,
  SubmitButtonContent,
} from "./styles";

const CitiesSelection = () => {
  const [citiesList, setCitiesList] = useState<Array<CityDetails>>([]);
  const [focusedFieldIndex, setFocusedFieldIndex] = useState<number | null>(
    null
  );

  const [fetchingCities, setFetchingCities] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const citiesDetails = useSelector((state: CitiesState) => state.cities);

  const formik = useFormik({
    initialValues:
      citiesDetails.length > 0
        ? citiesDetails
        : [...Array(config.numberOfCityOptions).fill({})],

    validateOnChange: true,
    validateOnMount: false,
    validationSchema: array()
      .min(config.numberOfCityOptions)
      .of(
        object()
          .required("Field is required")
          .test(
            "test-city",
            "City name must be unique",
            function (value, { parent }) {
              if (value) {
                return (
                  parent.filter((city: CityDetails) => city.name === value.name)
                    .length === 1
                );
              } else return true;
            }
          )
      ),
    onSubmit: (values) => {
      console.log(values);
      setFetchingCities(true);
      dispatch(addCities(values));
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
    debounce((value) => {
      findCitiesByName(value)
        .then((cities) => {
          setCitiesList(cities);
        })
        .catch((err) => console.log(err));
    }, 300),
    []
  );

  const onInputBlur = useCallback(() => {
    setCitiesList([]);
  }, []);

  return (
    <>
      <FormSection>
        <form onSubmit={formik.handleSubmit}>
          {formik.values.map((city, index) => {
            return (
              <Autocomplete
                disablePortal
                key={index}
                options={citiesList}
                getOptionLabel={(city) => city.name || ""}
                sx={{ width: 300 }}
                defaultValue={city.name}
                onChange={(_, value) =>
                  formik.setFieldValue(index.toString(), value)
                }
                onInputChange={(_, value) => debounceInputSearch(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={
                      formik.touched[index] && (formik.errors[index] as string)
                    }
                    onBlurCapture={formik.handleBlur}
                    error={formik.touched[index] && !!formik.errors[index]}
                    id={index.toString()}
                    name={index.toString()}
                    label="Type a city in the US"
                    onFocus={() => setFocusedFieldIndex(index)}
                    onBlur={onInputBlur}
                  />
                )}
              />
            );
          })}
          <SubmitButtonContent>
            <Button type="submit" disabled={fetchingCities}>
              Enviar
            </Button>
          </SubmitButtonContent>
        </form>
      </FormSection>
      <CitiesChosenSection>
        {fetchingCities
          ? formik.values.map(() => (
              <Skeleton variant="rectangular" width={200} height={100} />
            ))
          : citiesDetails.map((city) => (
              <Button
                key={city.name}
                onClick={() => navigate(`city/${city.name}`)}
              >
                {city.name}
              </Button>
            ))}
      </CitiesChosenSection>
    </>
  );
};

export default CitiesSelection;
