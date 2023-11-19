import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { Controller, FieldError } from "react-hook-form";
import PasswordFieldProps from "./TextFieldProps";
import errorToTrue from "./errorToTrue";
import ErrorMessage from "./ErrorMessage";
import { FC } from "react";
import PasswordVisibilityToggle from "./PasswordVisibilityToggle";

const PasswordField: FC<PasswordFieldProps> = ({
  label,
  name,
  control,
  errors,
  sx,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = errors[name] as FieldError;
  return (
    <>
      <FormControl fullWidth sx={sx ? sx : { mb: "1rem" }}>
        <InputLabel
          htmlFor="outlined-adornment-password"
          {...errorToTrue(error)}
          required
        >
          {label}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              {...errorToTrue(error)}
              required
              type={showPassword ? "text" : "password"}
              label={label}
              endAdornment={
                <PasswordVisibilityToggle
                  setShowPassword={setShowPassword}
                  showPassword={showPassword}
                />
              }
            />
          )}
        />
        {error ? <ErrorMessage errorMessage={error} /> : null}
      </FormControl>
    </>
  );
};

export default PasswordField;
