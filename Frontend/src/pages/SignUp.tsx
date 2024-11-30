import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import {
  errorNotification,
  successNotification,
} from "../components/Notification";
import { saveCustomer } from "../services/customerClient";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

const MyTextInput = ({ label, ...props }: Props) => {
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

function SignUpForm() {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        age: 0,
        gender: "",
        password: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(1, "Must be minimum 1 characters or more")
          .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        age: Yup.number()
          .min(17, "Too young for an Account")
          .required("Required"),
        gender: Yup.string().oneOf(["MALE", "FEMALE"], "Invalid gender"),
      })}
      onSubmit={(newCustomer, { setSubmitting }) => {
        setSubmitting(true);
        saveCustomer(newCustomer)
          .then(() => {
            successNotification(
              "customer saved",
              `${newCustomer.name} is successfully saved`
            );
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
            <MyTextInput label="Name" name="name" type="text" />
            <MyTextInput label="Email" name="email" type="email" />
            <MyTextInput label="Age" name="age" type="number" />
            <MyTextInput label="Gender" name="gender" type="text" />
            <MyTextInput label="Password" name="password" type="password" />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default function SignUp() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Register to your account</Heading>
          <SignUpForm />
          <Link href="/" color="blue.500">
            Already have an account?
          </Link>
        </Stack>
      </Flex>
    </Stack>
  );
}
