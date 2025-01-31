import { useNavigate } from "react-router-dom";
import useAuthStore from "../authStore/useAuthStore"

const ProtectedRoute = ({element}) => {

    const {isLoggedIn} = useAuthStore();
    const navigate  = useNavigate();

    return isLoggedIn ? navigate('/') : element;
};
export default  ProtectedRoute