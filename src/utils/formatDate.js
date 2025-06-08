export function formatedDate(date) {
  if (!date) return "";

  const [year, month, day] = typeof date === "string" ? date.split("-") : [];

  if (!!day && !!month && !!year) {
    return `${day}/${month}/${year}`;
  }

  return "";
}

export function formatedDateDayMonthYearHoursMinutes(
  dateToFormated,
  hasHours = false
) {
  const date = new Date(dateToFormated);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDateWithHours = `${day}/${month}/${year} - ${hours}:${minutes}`;
  const formattedDate = `${day}/${month}/${year}`;

  return hasHours ? formattedDateWithHours : formattedDate;
}

export function mergeDateAndTime(datePart = new Date(), timePart = new Date()) {
  const _datePart = datePart ?? new Date();
  const _timePart = timePart ?? new Date();

  const year = _datePart.getFullYear();
  const month = _datePart.getMonth();
  const day = _datePart.getDate();

  const hours = _timePart.getHours();
  const minutes = _timePart.getMinutes();
  const seconds = _timePart.getSeconds();
  const ms = _timePart.getMilliseconds();

  return new Date(year, month, day, hours, minutes, seconds, ms);
}
