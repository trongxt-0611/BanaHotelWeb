import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  const account = useSelector((state) => state.userReducer.account);
  if (!isAuthenticated) {
    return <Navigate to={"/login"}></Navigate>;
  } else {
    if (account.isAdmin) {
      return <>{children}</>;
    } else {
      return <Navigate to={"/403"}></Navigate>;
    }
  }
};

export default ProtectedAdminRoute;
