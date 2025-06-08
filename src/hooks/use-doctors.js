const mookDoctors = [
  {
    name: "John",
    specialtys: ["Cardiologia", "Homeopatia"],
    rating: 3,
    hours: [new Date()],
  },
  {
    name: "John",
    specialtys: ["Cardiologia", "Homeopatia"],
    rating: 3,
    hours: [new Date()],
  },
];

export const useDoctors = () => {
  const doctors = [...mookDoctors];

  return {
    data: doctors,
    loading: false,
  };
};
