import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import { toast } from "react-toastify";


const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader/>;
  } else if (!user || error) {
     toast.error("Please Signup or Login!!!");
    return <Navigate to="/" replace />;
  } else {
    
    return <Outlet />;
  }
};

export default PrivateRoutes;
