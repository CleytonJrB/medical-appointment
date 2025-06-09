//status - active, inactive

const mookServiceRooms = [
  {
    id: "asd22133f",
    name: "Serviços gerais",
    description: "Sala de Atendimento 1",
    appointments: [],
    status: "active",

    createAt: new Date(),
    updateAt: new Date(),
  },
];

export const useServiceRooms = () => {
  // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const serviceRooms = [...mookServiceRooms];

  return {
    data: serviceRooms,
    loading: false,
  };
};
