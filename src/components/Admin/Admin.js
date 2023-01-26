import "./Admin.scss";
import { Sidebar } from "./Sidebar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminHeader } from "./Contents/components/AdminHeader";
export const Admin = () => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  const account = useSelector((state) => state.userReducer.account);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <AdminHeader
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            account={account}
            isAuthenticated={isAuthenticated}
          />
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
