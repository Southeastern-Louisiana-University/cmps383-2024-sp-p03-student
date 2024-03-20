import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./layout.css";
import AuthContext from "../features/authentication/AuthContext";
import UserDto from "../features/authentication/UserDto";
import { useFetch } from "use-http";

export default function MainLayout() {
  const [currentUser, setCurrentUser] = useState<null | UserDto>(null);

  const { loading } = useFetch(
    "/api/authentication/me",
    {
      onNewData: (_, x) => {
        console.log(x);
        if (typeof x === "object") {
          setCurrentUser(x);
        }
      },
    },
    []
  );

  useEffect(() => {
    console.log("layout loaded");
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
        <div>layout page!</div>

        <nav>
          Some top nav
          <Link to="/help">help</Link>
          <Link to="/login">Login</Link>
          {loading ? <>Checking user</> : currentUser ? <>Current user: {currentUser.userName}</> : <>Not logged in</>}
        </nav>
        <Outlet />
        <div className="layout-footer">Some footer thing</div>
      </AuthContext.Provider>
    </>
  );
}
