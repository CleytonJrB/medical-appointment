import { TextField } from "@mui/material";
import { phoneInputMask } from "../../utils/input-masks";

export default function CustomTextField({
  value = "",
  label = "label",
  placeholder = "",
  onChange,
  mask,
  multiline = null,
  fullWidth = false,
  error = null,
}) {
  function handleChange(event) {
    if (mask == "PHONE") {
      onChange(phoneInputMask(event));
    }

    onChange(event.target.value);
  }

  return (
    <TextField
      fullWidth={fullWidth}
      id="outlined-error-helper-text"
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={handleChange}
      multiline={multiline}
      rows={multiline}
      error={Boolean(error)}
      helperText={error}
      sx={{ mt: ".5rem", minWidth: 150 }}
    />
  );
}
