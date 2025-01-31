import { Outlet } from "react-router-dom";
import Home from "../Pages/Home";

const AppLayout = () =>{
    return(
        <>
        <Home/>
        <Outlet/>
        </>
    )
}
export default AppLayout