import { Alert, AlertIcon, Box, FormLabel, Input } from "@chakra-ui/react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error">
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

const CreateBookForm = () => {
  return (
    <>
      <h1>Füge ein Buch hinzu</h1>
      <Formik
        initialValues={{
          title: "",
          author: "",
          isbn: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .min(1, "Must be minimum 1 characters or more")
            .required("Required"),
          author: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          isbn: Yup.string().min(1, "Invalid ISBN").required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="Buch Titel"
            name="title"
            type="text"
            placeholder="Harry Potter"
          />

          <MyTextInput
            label="Buch Autor"
            name="author"
            type="text"
            placeholder="J.K. Rowling"
          />

          <MyTextInput
            label="ISBN"
            name="isbn"
            type="text"
            placeholder="123-456-789"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default CreateBookForm;
