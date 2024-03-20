import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../features/authentication/AuthContext";
import LogoutButton from "../features/authentication/LogoutButton";

export default function NavBar() {
  const authContext = useContext(AuthContext);

  return (
    <nav>
      Some top nav
      <Link to="/help">help</Link>
      <Link to="/login">Login</Link>
      {authContext?.user === undefined ? (
        <>Checking user</>
      ) : authContext?.user !== null ? (
        <>
          Current user: {authContext.user.userName} <LogoutButton>Logout</LogoutButton>
        </>
      ) : (
        <>Not logged in</>
      )}
    </nav>
  );
}
