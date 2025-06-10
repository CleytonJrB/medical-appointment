import { useSession } from "./use-session";

export const useCurrentUser = () => {
  const session = useSession();

  const user = session.data?.user;

  return user;
};
