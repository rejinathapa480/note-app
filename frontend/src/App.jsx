import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUP from "./Pages/SignUp";
import AuthLayout from "./Layout.jsx/AuthLayout";
import AppLayout from "./Layout.jsx/AppLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import useAuthStore from "./authStore/useAuthStore";

function App() { 
  const {isLoggedIn} = useAuthStore();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route  element={isLoggedIn ? <Navigate to={'/'}/> : (<AuthLayout />)}>
          <Route path="login"  element={<Login/>}/>
          <Route path="signup" element={<SignUP/>} />
        </Route>
        <Route path="/" element={isLoggedIn ? (<AppLayout/>) : <Navigate to={'login'}/>}>
           <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </>
  );
}
export default App;

