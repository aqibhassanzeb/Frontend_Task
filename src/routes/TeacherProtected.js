import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";

const TeacherProtected = () => {
  const activeUser = useSelector((state) => state.authReducer.activeUser);
  console.log(activeUser);
  if (activeUser && activeUser.status === "teacher") {
    return <Outlet />;
  } else {
    return <Login />;
  }
};
export default TeacherProtected;
