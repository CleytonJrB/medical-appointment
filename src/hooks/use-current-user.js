import { useSession } from "./use-session";

export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
