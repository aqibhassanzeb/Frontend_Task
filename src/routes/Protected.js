import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

const Protected = () => {
  const activeUser = useSelector((state) => state.authReducer.activeUser);
  if (activeUser) {
    return <Outlet />;
  } else {
    return <Login />;
  }
};
export default Protected;
