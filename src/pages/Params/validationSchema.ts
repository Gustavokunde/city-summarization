import { number, object, string } from "yup";

export const validationSchema = object().shape({
  _id: string().nullable(),
  countryCode: string().required("Field is required"),
  numberOfCityOptions: number()
    .required("Field is required")
    .test("Is positive", "Number must be positive", (value) => value > 0),
  cityDetails: string().required("Field is required"),
  geodbURL: string().required("Field is required"),
});
