import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";

const StudentProtected = () => {
  const activeUser = useSelector((state) => state.authReducer.activeUser);
  if (activeUser && activeUser.status === "student") {
    return <Outlet />;
  } else {
    return <Login />;
  }
};
export default StudentProtected;
