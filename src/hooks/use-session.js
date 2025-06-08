//TYPES: CLIENT | ADMIN | DOCTOR

export const useSession = () => {
  const session = {
    data: {
      user: {
        name: "John Doe",
        email: "John@email.com",
        type: "CLIENT",
        appointments: [],
      },
    },
    status: "authenticated",
  };

  return session;
};
