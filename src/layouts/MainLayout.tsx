import { Outlet } from "react-router-dom";
import NavMenu from "../components/Pages/NavMenu";

const MainLayout = () => {
  return (
    <div>
      <NavMenu />
      <Outlet />
    </div>
  );
};

export default MainLayout;
