import { Outlet } from "react-router-dom";
import NavMenu from "../components/Pages/NavMenu";

const MainLayout = () => {
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
};

export default MainLayout;
