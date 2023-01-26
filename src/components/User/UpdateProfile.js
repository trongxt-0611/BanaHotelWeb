import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./design.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faFileLines,
  faLocationDot,
  faMobileButton,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions/userActions";
import UserAvatar from "react-avatar";
import { borderRadius } from "@mui/system";
import Avatar from "react-avatar";

const UpdateProfile = () => {
  const account = useSelector((state) => state.userReducer.account);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const [size, setSize] = useState("large");
  let navigate = useNavigate();
  const { msg, setMsg } = useState();
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(
    "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM="
  );

  useEffect(() => {
    loadUser();
  }, []);

  const handlePreviewAvatar = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("Username", username);
    data.append("Phone", phone);
    if (address) {
      data.append("Address", address);
    }
    data.append("Name", name);
    if (avatar) {
      data.append("Avatar", avatar);
    }
    const response = await axios.put(
      `http://pandoraolaole-001-site1.btempurl.com/User/editProfile/${id}`,
      data
    );
    // console.log(response);
    if (response.status === 200) {
      toast.success("Update profile Success!!");
      dispatch(updateProfile(response.data));
    }
  };

  const loadUser = async () => {
    const result = await axios.get(
      `http://pandoraolaole-001-site1.btempurl.com/User/getUserByEmail/${account.email}`
    );
    let user = result.data;
    // console.log(">>>>>>>>>>>>>>>", user);
    setId(user.idUser);
    setUsername(user.username);
    setPhone(user.phone);
    setAddress(user.address);
    setName(user.name);
    setAvatar(user.avatar);
    if (!(user.avatar === null)) {
      setPreviewAvatar(user.avatar);
    }
  };

  return (
    <div className="profile">
      <Sidebar />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="profile-form">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="avt">
                <figure className="avatar-profile">
                  {/* {previewAvatar ? (
                      <img
                        // src={previewAvatar}
                        src={account.avatar === "null"
                              ? "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM="
                              : account.avatar}
                        className="rounded-circle"
                        alt="Avatar"
                      />
                    ) : (
                      <span></span>
                    )} */}
                  <img
                    src={previewAvatar}
                    className="rounded-circle"
                    alt="Avatar"
                  />
                </figure>
              </div>
              <div class="file-input">
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                  onChange={handlePreviewAvatar}
                />
                <label class="file-input__label" for="file-input">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="upload"
                    class="svg-inline--fa fa-upload fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                  <span>Upload Avatar</span>
                </label>
              </div>

              <label>User Name</label>
              <div className="profile-field">
                <input
                  type={"text"}
                  className="input-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FontAwesomeIcon
                  className="profile-icon"
                  icon={faPenToSquare}
                />
              </div>

              <label>Name</label>

              <div className="profile-field">
                <input
                  type={"text"}
                  className="input-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FontAwesomeIcon className="profile-icon" icon={faFileLines} />
              </div>

              <label>Address</label>

              <div className="profile-field">
                <input
                  type={"text"}
                  className="input-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FontAwesomeIcon
                  className="profile-icon"
                  icon={faLocationDot}
                />
              </div>

              <label>Phone Number</label>

              <div className="profile-field">
                <input
                  type={"text"}
                  className="input-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FontAwesomeIcon
                  className="profile-icon"
                  icon={faMobileButton}
                />
              </div>

              <button type="submit" className="btn update-btn btn-block mt-5">
                Lưu thông tin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
