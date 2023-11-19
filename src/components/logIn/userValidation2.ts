import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("first name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup.string().email("invalid email").required("email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/,
      "password must contain 8 characters one uppercase one lowercase and one special case character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password must match")
    .required("confirm password is required"),
});

export default schema;
