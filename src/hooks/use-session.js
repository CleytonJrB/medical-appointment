//TYPES: PACIENT | ADMIN | DOCTOR

import { useAuthContext } from "../providers/AuthProvider";

export const useSession = () => {
  const { user } = useAuthContext();

  const session = {
    data: {
      user,
      status: "authenticated",
    },
  };

  return session;
};
