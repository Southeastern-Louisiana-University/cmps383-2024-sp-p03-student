import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./layout.css";

export default function MainLayout() {
  useEffect(() => {
    console.log("layout loaded");
  }, []);
  return (
    <>
      <div>layout page!</div>
      <nav>
        Some top nav
        <Link to="/help">click me</Link>
      </nav>
      <Outlet />
      <div className="layout-footer">Some footer thing</div>
    </>
  );
}
