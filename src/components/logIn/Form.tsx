import { Box, Button, Typography } from "@mui/material";
import TextFields from "./TextField";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./userValidation2";
import { FormValues } from "./TextFieldProps";
import PasswordField from "./PasswordField";
const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "all",
    resolver: yupResolver<FormValues>(schema),
  });
  const onSubmit = (data: FieldValues) => {
    console.log(JSON.stringify(data));
    reset();
  };
  const splitCamelCase = (word: string) =>
    word.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  const formLabels: string[] = [
    "firstName",
    "lastName",
    "email",
    "password",
    "confirmPassword",
    "phone",
    "address",
    "id",
    "notes",
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "4ren",
        alignItems: "center",
      }}
    >
      <Typography component={"h1"}>Sign up</Typography>
      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        sx={{ width: "100%", mt: "2rem" }}
      ></Box>
      {formLabels.map((name) => {
        const label = splitCamelCase(name);
        if (name.toLocaleLowerCase().includes("password"))
          return (
            <PasswordField
              control={control}
              errors={errors}
              name={name}
              label={label}
            />
          );
        return (
          <TextFields
            control={control}
            errors={errors}
            name={name}
            label={label}
          />
        );
      })}
      {!Object.keys(errors).length && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
      )}
    </Box>
  );
};

export default RegisterForm;
