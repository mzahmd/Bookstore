import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Stack
} from "@chakra-ui/react";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";

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

function LoginForm() {
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
          .min(10, "Password is too short")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 0));
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
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        // bgGradient={{ sm: "linear(to-r, blue.200, purple.400)" }}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>

          {/* <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl> */}

          <LoginForm />

          {/* <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={"blue.500"}>Forgot password?</Text>
            </Stack>
            <Button colorScheme={"blue"} variant={"solid"}>
              Sign in
            </Button>
          </Stack> */}
        </Stack>
      </Flex>
    </Stack>
  );
}
