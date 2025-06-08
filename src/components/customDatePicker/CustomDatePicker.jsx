import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";
import { FormHelperText } from "@mui/material";

export default function CustomDatePicker({
  value = null,
  label = "Selecione uma data",
  error = null,
  onChange,
}) {
  function handleChange(event) {
    onChange(event);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          value={value}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              error: Boolean(error),
              helperText: error,
            },
          }}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
