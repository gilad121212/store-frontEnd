import { FormControl, TextField } from "@mui/material";
import { Controller, FieldError } from "react-hook-form";
import { FC } from "react";
import TextFieldsProps from "./TextFieldProps";
import errorToTrue from "./errorToTrue";
import ErrorMessage from "./ErrorMessage";

const TextFields: FC<TextFieldsProps> = ({
  label,
  inputProps,
  name,
  control,
  errors,
  type,
  sx,
}) => {
  const error = errors[name] as FieldError;
  return (
    <FormControl fullWidth sx={sx ? sx : { mb: "1rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            {...errorToTrue(error)}
            required
            label={label}
            variant="outlined"
            InputProps={inputProps}
            type={type}
          />
        )}
      />
      {error ? <ErrorMessage errorMessage={error} /> : null}
    </FormControl>
  );
};

export default TextFields;
