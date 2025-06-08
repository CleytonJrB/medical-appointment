import { parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import Badge from "@mui/material/Badge";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.getDate()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "✅" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function CustomDateSelected({
  handleChange,
  initialDate = new Date(),
}) {
  const formattedToInitialValue = (date) => date.toISOString().slice(0, 10);

  const initialValue = parseISO(formattedToInitialValue(initialDate));

  const handleMonthChange = () => {
    //date
  };

  function handleDateChange(date) {
    handleChange(date);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <DateCalendar
        defaultValue={initialValue}
        loading={false}
        onMonthChange={handleMonthChange}
        onChange={handleDateChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays: [],
          },
        }}
        sx={{
          width: "100%",
          maxWidth: "500px",
          minWidth: "350px",
          minHeight: "420px",
          margin: "0 auto",
          borderRadius: "8px",

          fontSize: "1.2rem",
          "& .MuiPickersDay-root": {
            fontSize: "1.1rem",
            width: 48,
            height: 48,
          },
          "& .MuiDayCalendar-weekDayLabel": {
            fontSize: "1.1rem",
          },
          "& .MuiPickersCalendarHeader-label": {
            fontSize: "1.2rem",
          },
        }}
      />
    </LocalizationProvider>
  );
}
