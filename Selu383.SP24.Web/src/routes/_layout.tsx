import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";
import AuthContext from "../features/authentication/AuthContext";
import UserDto from "../features/authentication/UserDto";
import { useFetch } from "use-http";
import NavBar from "../components/NavBar";

export default function MainLayout() {
  const [currentUser, setCurrentUser] = useState<null | undefined | UserDto>(undefined);

  useFetch(
    "/api/authentication/me",
    {
      onNewData: (_, x) => {
        console.log(x);
        if (typeof x === "object") {
          setCurrentUser(x);
        } else {
          setCurrentUser(null);
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

        <NavBar />
        <Outlet />
        <div className="layout-footer">Some footer thing</div>
      </AuthContext.Provider>
    </>
  );
}
