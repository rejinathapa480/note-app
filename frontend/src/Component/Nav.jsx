import { toast } from "react-toastify";
import useAuthStore from "../authStore/useAuthStore"
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
const Nav = () =>{

  const {logout} = useAuthStore();

    return(
        <>
            <div className="flex  justify-between  px-5 py-5 sm:px-10 overflow-hidden ">
                <h2 className="font-semibold text-3xl">Note</h2>
                <button className="bg-blue-700 px-5  sm:py-1  text-white rounded-sm cursor-pointer text-sm py-0 " onClick={() =>
                {
                    logout()
                    toast.success("logout successful")
                } } >Logout</button>
        </div>
        </>
    )
}
export default Nav