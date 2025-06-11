import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ptBR } from "date-fns/locale";

export default function CustomTimePicker({
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
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
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
