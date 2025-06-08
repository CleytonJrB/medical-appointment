import { TextField } from "@mui/material";

export default function CustomTextField({
  value = "",
  label = "label",
  placeholder = "",
  onChange,
}) {
  function handleChange(event) {
    onChange(event.target.value);
  }

  return (
    <TextField
      error={false}
      id="outlined-error-helper-text"
      value={value}
      label={label}
      helperText={null}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
