import { Outlet } from "react-router-dom";
import Home from "../Pages/Home";

const AppLayout = () =>{
    return(
        <>
        <Outlet/>
        </>
    )
}
export default AppLayout