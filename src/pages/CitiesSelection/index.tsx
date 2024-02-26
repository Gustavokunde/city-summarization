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
import Card from "../../components/Card";
import { useError } from "../../hooks/useError";
import { UseParams } from "../../hooks/useParams";
import { getCitiesDetails } from "../../services/aiAPI/openAi";
import { findCitiesByName } from "../../services/placesAPI/findCitiesOptions";
import { addCities, CitiesState, CityDetails } from "../../store/cities/cities";
import {
  CitiesChosenSection,
  FormSection,
  SubmitButtonContent,
} from "./styles";
import { validationSchema } from "./validationSchema";

const CitiesSelection = () => {
  const [citiesList, setCitiesList] = useState<Array<CityDetails>>([]);
  const [fetchingCities, setFetchingCities] = useState(false);
  const params = UseParams();
  const { handleError } = useError();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const citiesDetails = useSelector((state: CitiesState) => state.cities);

  const formik = useFormik({
    initialValues: citiesDetails?.length > 0 ? citiesDetails : [],

    validateOnChange: true,
    validateOnMount: false,
    validationSchema: validationSchema(params),
    onSubmit: (values) => {
      setFetchingCities(true);
      getCitiesDetails(values, params)
        .then((response) => {
          setFetchingCities(false);
          dispatch(addCities(response));
        })
        .catch((err) => {
          handleError(err);
        });
    },
  });

  const debounceInputSearch = useCallback(
    debounce((value) => {
      findCitiesByName(value, params)
        .then((cities) => {
          setCitiesList(cities || []);
        })
        .catch((err) => handleError(err));
    }, 300),
    [params]
  );

  useEffect(() => {
    if (formik.values.length === 0 && params?.numberOfCityOptions)
      formik.setValues([...Array(params?.numberOfCityOptions).fill(null)]);
  }, [params?.numberOfCityOptions]);

  const onInputFocus = useCallback((value: CityDetails) => {
    if (value) debounceInputSearch(value.name);
    else {
      setCitiesList([]);
    }
  }, []);

  console.log(citiesList);

  return (
    <>
      <FormSection>
        <h1>
          Include {params?.numberOfCityOptions} cities in the United States to
          get the best provided information from an AI tool
        </h1>
        <form onSubmit={formik.handleSubmit}>
          {formik.values.map((city, index) => {
            return (
              <Autocomplete
                disablePortal
                key={index}
                options={citiesList as any}
                getOptionLabel={(option) => (option as any)?.name || city?.name}
                sx={{ width: 300 }}
                onChange={(_, value) =>
                  formik.setFieldValue(index.toString(), value)
                }
                defaultValue={city?.name}
                onInputChange={(_, value) => {
                  debounceInputSearch(value);
                }}
                isOptionEqualToValue={() => true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={
                      formik.touched[index] && (formik.errors[index] as string)
                    }
                    onBlurCapture={formik.handleBlur}
                    error={formik.touched[index] && !!formik.errors[index]}
                    onFocus={() => onInputFocus(formik.values[index])}
                    id={index.toString()}
                    name={index.toString()}
                    label="Type a city in the US"
                  />
                )}
              />
            );
          })}
          <SubmitButtonContent>
            <Button
              type="submit"
              disabled={fetchingCities}
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </SubmitButtonContent>
        </form>
      </FormSection>
      <CitiesChosenSection>
        {fetchingCities ? (
          <>
            <h2>
              Please wait, we are working in finding very relevant information
              about the chosen cities
            </h2>
            <div>
              {formik.values?.map((_, index) => (
                <Skeleton
                  key={_?.name + index}
                  variant="rectangular"
                  width={200}
                  height={200}
                  animation="wave"
                  sx={{ borderTopLeftRadius: 24, borderBottomRight: 24 }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {citiesDetails.length > 0 ? (
              <h2>
                Choose one of the selected cities to understand further more
                from them
              </h2>
            ) : (
              <></>
            )}
            <div>
              {citiesDetails?.map((city, index) => (
                <Card key={city?.name + index}>
                  <p>{city?.name}</p>
                  <Button
                    key={city?.name}
                    onClick={() => navigate(`city/${city?.name}`)}
                    color="error"
                    variant="contained"
                  >
                    find out more
                  </Button>
                </Card>
              ))}
            </div>
          </>
        )}
      </CitiesChosenSection>
    </>
  );
};

export default CitiesSelection;
