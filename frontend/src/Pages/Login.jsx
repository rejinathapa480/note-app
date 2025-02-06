import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuthStore from "../authStore/useAuthStore";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

 const {logInUser} = useAuthStore();
 const {isLoggedIn} = useAuthStore();
 const {accessToken} = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      const result = response.data;
      toast.success(result?.message);
      logInUser(result?.data?.accessToken)
    
      if(isLoggedIn){
        navigate('/')
      }

    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
    <div className="bg-[#F2F4F7] h-screen">
      <form className="flex justify-center items-center" onSubmit={handleLogin}>
        <div className="flex flex-col sm:w-[50%]  md:w-[40%]  gap-6  bg-[#FFFFFF]  shadow-lg border border-gray-300 my-20 px-10 py-10 ">
          <h1 className="text-2xl font-semibold text-center py-5">Log In</h1>
          <input
            type="text"
            placeholder="Enter your email"
            className="px-2 py-3 shadow-sm rounded-sm outline-none  border border-[#D1D5DB]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="px-2 py-3 shadow-sm rounded-sm outline-none border border-gray-300 "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errorMessage && <p className="text-red-800">{errorMessage}</p>}
          <div className="flex flex-col  justify-center ">
            <button
              className="bg-[#2563EB] cursor-pointer  py-3 text-white rounded-sm w-full hover:bg-[#1D4ED8] font-semibold"
              type="submit"
            >
              Login
            </button>
            <button  className="text-center text-[#2563EB] py-5 border-b-[1px] border-gray-300 cursor-pointer">
             <Link to="/signup"> create new account</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};
export default Login;
