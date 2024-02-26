import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useError } from "../../hooks/useError";
import { createParams } from "../../services/params/createParams";
import { getParams } from "../../services/params/getParams";
import { FormContainer } from "./styles";
import { validationSchema } from "./validationSchema";

export const initialValues = {
  _id: null,
  countryCode: "",
  numberOfCityOptions: 10,
  cityDetails: "",
  geodbURL: "",
};

const Params = () => {
  const { handleError } = useError();

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      createParams({ ...values, cityDetails: values.cityDetails.split(",") })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          handleError("An error occured when trying to create params " + err);
        });
    },
  });

  useEffect(() => {
    getParams()
      .then((response) => {
        const data = response.data;
        formik.setValues({
          ...data,
          cityDetails: data.cityDetails?.toString(),
        });
      })
      .catch((err) =>
        handleError("An error occured when trying to get params " + err)
      );
  }, []);

  const formikInputHandler = (name: keyof typeof formik.values) => {
    return {
      name,
      fullWidth: true,
      InputLabelProps: {
        shrink: true,
      },
      id: name,
      value: formik.values[name],
      onChange: formik.handleChange,
      onBlurCapture: formik.handleBlur,
      error: formik.touched[name] && !!formik.errors[name],
      helperText: formik.touched[name] && formik.errors[name],
    };
  };

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <h1>Control params values in the cities summarization application </h1>
      <div>
        <TextField
          label="Country Code"
          {...formikInputHandler("countryCode")}
        />
        <TextField
          label="City Details"
          placeholder="Add city details splitted into commas"
          {...formikInputHandler("cityDetails")}
        />
        <TextField label="Geo DB URL" {...formikInputHandler("geodbURL")} />
        <TextField
          label="Number of city options"
          {...formikInputHandler("numberOfCityOptions")}
          type="number"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </div>
    </FormContainer>
  );
};

export default Params;
