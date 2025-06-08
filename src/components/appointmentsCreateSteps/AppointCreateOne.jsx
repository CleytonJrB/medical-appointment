import CustomDateSelected from "../customDateSelected/CustomDateSelected";

export default function AppointCreateOne({ values, handleInput }) {
  const { date } = values;

  return (
    <CustomDateSelected
      initialDate={date}
      handleChange={(e) => handleInput("date", e)}
    />
  );
}
