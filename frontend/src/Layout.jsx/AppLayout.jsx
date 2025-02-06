import { Outlet } from "react-router-dom";
import Nav from "../Component/Nav";
const AppLayout = () => {
  return (
    <>
      <Nav />
      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
};
export default AppLayout;
