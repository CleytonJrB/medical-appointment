import { IconButton, TextField } from "@mui/material";
import { phoneInputMask } from "../../utils/input-masks";

export default function CustomTextField({
  value = "",
  label = "label",
  placeholder = "",
  type,
  onChange,
  mask,
  multiline = null,
  fullWidth = false,
  error = null,
  leftIcon = null,
  rightIcon = null,
  colorLeftIcon = null,
  colorRightIcon = null,
  disabledButton = null,
  onClick = () => {},
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
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      multiline={multiline}
      rows={multiline}
      error={Boolean(error)}
      helperText={error}
      sx={{ mt: ".5rem", minWidth: 150 }}
      slotProps={{
        input: {
          startAdornment: leftIcon && (
            <InputAdornment
              sx={{
                "&.MuiInputAdornment-root": {
                  color: colorLeftIcon,
                },
              }}
              position="start"
            >
              {leftIcon}
            </InputAdornment>
          ),
          endAdornment: (
            <>
              {rightIcon && (
                <IconButton
                  disabled={disabledButton}
                  onClick={onClick}
                  sx={{
                    color: colorRightIcon,
                  }}
                >
                  {rightIcon}
                </IconButton>
              )}
            </>
          ),
        },
      }}
    />
  );
}
