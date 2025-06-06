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
import { useAuth } from "../hooks/useAuth";
import { errorNotification } from "../components/Notification";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
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

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      validateOnMount={true}
      validationSchema={Yup.object({
        userName: Yup.string()
          .email("Must be valid email")
          .required("Email is required"),
        password: Yup.string()
          .min(5, "Password is too short")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // alert(JSON.stringify(values, null, 0));
        setSubmitting(true);

        login(values)
          .then(() => {
            navigate("/dashboard");
            // console.log("Success login", res);
          })
          .catch((err) => {
            errorNotification(err.code, err.response.data.msg);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Form>
          <Stack spacing={5}>
            <MyTextInput
              label="Email"
              name="userName"
              type="email"
              placeholder="max.muster@gmail.com"
            />
            <MyTextInput
              label="Password"
              name="password"
              type="password"
              placeholder=""
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Login
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default function Login() {
  const { customer } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      navigate("/dashboard");
    }
  }, [customer, navigate]);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <LoginForm />
          <Link href={"/signup"} color="blue.500">
            Don't have an account? Sign up now
          </Link>
        </Stack>
      </Flex>
    </Stack>
  );
}
