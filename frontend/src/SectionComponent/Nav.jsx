import useAuthStore from "../authStore/useAuthStore"
import Login from "../Pages/Login";

const Nav = () =>{
  const {logout} = useAuthStore();

//   console.log(logout)
//     const handleLogout = () =>{
//       logout();
//     }
   
    return(
        <>
        <div className="">
            <div className="flex  justify-between ">
                <h2 className="font-semibold text-3xl">Note</h2>
                <button className="bg-blue-700 px-5 py-1 text-white rounded-sm cursor-pointer" onClick={() => logout()} >Logout</button>
            </div>
        </div>
        </>
    )
}
export default Nav