import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "../authStore/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
const SignUP = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


 const {logInUser} = useAuthStore();
 const {isLoggedIn} = useAuthStore();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/signUp",
        {
          username: userName,
          email: email,
          password: password,
        }
      );
      const result = response.data;
      logInUser(result?.data?.accessToken);
      toast.success(result?.message);

      if(isLoggedIn){
        navigate('/')
      }

    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message)
      toast.error(error?.response?.data?.message    )
    }
  };


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <div className="flex flex-col sm:w-[50%]  md:w-[40%]  gap-6  bg-[#F9FAFB]  shadow-lg border border-gray-300 my-20 px-10 py-10 ">
          <h1 className="text-2xl font-semibold text-center py-5">Sign UP</h1>
          <input
            type="text"
            placeholder="Enter username"
            className="px-2 py-3 shadow-sm rounded-sm outline-none  border border-[#D1D5DB]  "
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="px-2 py-3 shadow-sm rounded-sm  outline-none border border-gray-300 "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="create a password"
            className="px-2 py-3 shadow-sm rounded-sm outline-none border border-gray-300 "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {
            errorMessage && <div className="text-red-600">{errorMessage}</div>
          }
          <div className="flex flex-col justify-center py-10">
            <button
              className="bg-green-500   py-3 text-white rounded-sm w-full hover:bg-[#1D4ED8] font-semibold"
              type="submit"
            >
              Signup
            </button>
            <p className="text-blue-500 py-5 text-center cursor-pointer" ><Link to="/login">Already have an account ?</Link></p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUP;
