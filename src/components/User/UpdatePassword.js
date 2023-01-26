import React, { useEffect, useState } from "react";
import "./design.css";
import Sidebar from "./Sidebar/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { postChangePassword } from "../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import Password from "antd/es/input/Password";
import { result } from "lodash";
import { useSelector } from "react-redux";

const UpdatePassword = () => {
  const account = useSelector((state) => state.userReducer.account);

  const navigate = useNavigate();
  const [id, setId] = useState("");

  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");

  const oldPasswordOnChange = (e) => {
    setOldPassword(e.target.value);
    setOldPasswordError("");
  };

  const newPasswordOnChange = (e) => {
    setNewPassword(e.target.value);
    // setNewPasswordError("");
  };

  function validatePassword() {
    return (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      newPassword === confirmPassword
    );
  }
  const loadUser = async () => {
    const result = await axios.get(
      `http://pandoraolaole-001-site1.btempurl.com/User/getUserByEmail/${account.email}`
    );
    let user = result.data;
    // console.log(">>>>>>>>>>>>>>>", user);
    setId(user.idUser);
    setEmail(user.email);
    setAvatar(user.avatar);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const changePasswordSubmit = async (e) => {
    e.preventDefault();
    // const data = { "email": email,"oldPassword": oldPassword, "newPassword":newPassword}
    // console.log("data",data);

    // try {
    //     let res = await postChangePassword(data);
    //     if (res && res.status === 200) {
    //         toast.success("Change password Success!");
    //         navigate("/");
    //     }
    // } catch (error) {
    //     if (error.response.data.status === 400) {
    //         setOldPasswordError(error.response.data.errors["Password"]);
    //         console.log(">>>>err:", error.response.data.errors);
    //       } else {
    //         toast.error(error.response.data);
    //         console.log(">>>>error: ", error);
    //       }}

    axios({
      method: "post",
      url: `http://pandoraolaole-001-site1.btempurl.com/Account/changePassword`,
      headers: {},
      data: {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    }).then((response) => {
      // this.setState({data:response.data});
      console.log(response.data);
      if (response && response.status === 200) {
        toast.success("Thay đổi mật khẩu thành công!!!");
        navigate("/updateprofile");
      }
      console.log(response.data);
    });
  };

  return (
    <div className="profile">
      <Sidebar />
      <div class="container-container-fluid">
        <div class="row wrapper">
          <div class="profile-form">
            {/* <figure className="avatar avatar-profile">
              <img src={avatar} className="rounded-circle" alt="Avatar" />
            </figure> */}
            <form onSubmit={(e) => changePasswordSubmit(e)}>
              <label for="old_password_field">Old Password</label>
              <div className="profile-field">
                <input
                  type="password"
                  id="old_password_field"
                  class="input-control"
                  value={oldPassword}
                  onChange={(e) => oldPasswordOnChange(e)}
                />
              </div>

              <label for="new_password_field">New Password</label>
              <div class="profile-field">
                <input
                  type="password"
                  id="new_password_field"
                  class="input-control"
                  value={newPassword}
                  onChange={(e) => newPasswordOnChange(e)}
                />
              </div>

              <label for="confirm_password_field">Confirm Password</label>
              <div class="profile-field">
                <input
                  type="password"
                  id="confirm_password_field"
                  class="input-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={!validatePassword()}
                class="btn update-btn btn-block mt-5"
                id="submit-change-password"
              >
                Thay đổi mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
