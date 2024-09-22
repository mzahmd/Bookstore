import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { saveBook } from "../services/client";
import { errorNotification, successNotification } from "./Notification";

const MyTextInput = ({
  label,
  ...props
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <Box>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status="error" mt={2}>
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

export default function CreateBookForm({
  fetchBooks,
}: {
  fetchBooks: () => void;
}) {
  return (
    <>
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
        onSubmit={(newBook, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
          setSubmitting(true);
          saveBook(newBook)
            .then(() => {
              successNotification(
                "book saved",
                `${newBook.title} is successfully saved`
              );
              fetchBooks();
            })
            .catch((err) => {
              console.log(err);
              errorNotification(err.code, `${err.response.data.msg}`);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <Stack spacing={"24px"}>
              <MyTextInput
                label="book title"
                name="title"
                type="text"
                placeholder="Harry Potter"
              />

              <MyTextInput
                label="book author"
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
              <Button disabled={!isValid || isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}
