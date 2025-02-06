import { toast } from "react-toastify";
import useAuthStore from "../authStore/useAuthStore"

const Nav = () =>{
  const {logout} = useAuthStore();
    return(
        <>
            <div className="flex  justify-between py-5 px-10 overflow-hidden ">
                <h2 className="font-semibold text-3xl">Note</h2>
                <button className="bg-blue-700 px-5 py-1 text-white rounded-sm cursor-pointer" onClick={() =>
                {
                    logout()
                    toast.success("logout successful")
                } } >Logout</button>
        </div>
        </>
    )
}
export default Nav