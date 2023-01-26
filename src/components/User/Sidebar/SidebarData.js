import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { useParams } from "react-router-dom";

export const SidebarData = [
  {
    title: "Thông tin cá nhân",
    link: `/updateprofile`,
    icon: <AccountCircleIcon />,
  },
  {
    title: "Đổi mật khẩu",
    link: `/updatepassword`,
    icon: <KeyIcon />,
  },
];
