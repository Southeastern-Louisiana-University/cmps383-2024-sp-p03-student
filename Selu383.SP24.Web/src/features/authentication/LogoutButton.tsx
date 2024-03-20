import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useFetch } from "use-http";

export interface LogoutButtonProps {
  children: React.ReactNode;
}
export default function LogoutButton({ children }: LogoutButtonProps) {
  const authContext = useContext(AuthContext);

  const { loading, post, ...rest } = useFetch("/api/authentication/logout", {
    onNewData: () => {
      console.log(rest);
      authContext?.setUser(null);
    },
  });

  return (
    <button type="button" disabled={loading} onClick={() => post()}>
      {children}
    </button>
  );
}
