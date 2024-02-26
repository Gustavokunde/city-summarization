import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { object } from "yup";

const Params = () => {
  const formik = useFormik({
    initialValues: {},
    validationSchema: object().shape({}),
    onSubmit: () => {},
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField />
      <Button>Send</Button>
    </form>
  );
};

export default Params;
