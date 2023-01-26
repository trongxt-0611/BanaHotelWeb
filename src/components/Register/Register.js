import { useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import Logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faIdCard,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const usernameOnChange = (e) => {
    setUsername(e.target.value);
  };
  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };
  const nameOnChange = (e) => {
    setName(e.target.value);
  };
  const phoneOnChange = (e) => {
    setPhone(e.target.value);
  };
  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let res = await postRegister(email, password, username, phone, name);
      if (res && res.status === 200) {
        toast.success("Sign Up Success");
        navigate("/login");
      }
    } catch (error) {
      if (error.response.data.status === 400) {
        setEmailError(error.response.data.errors["Email"]);
        setPasswordError(error.response.data.errors["Password"]);
        setUsernameError(error.response.data.errors["Username"]);
        setNameError(error.response.data.errors["Name"]);
        setPhoneError(error.response.data.errors["Phone"]);
      } else {
        toast.error(error.response.data);
      }
    }
  };

  return (
    <div className="register-container">
      <div
        className="logo"
        style={{ cursor: "pointer", zIndex: "9999" }}
        title={"Home page"}
      >
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>
        <p>Ba Na Hill Hotel Web</p>
      </div>

      <div className="register-form">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div class="user-detail">
            <div class="input-box">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <input
                type="text"
                className="r-input"
                placeholder="Username"
                onChange={(e) => usernameOnChange(e)}
              />
            </div>
            <p className="error-line">{usernameError}</p>
            <br />
            <br />

            <div class="input-box">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <input
                type="text"
                className="r-input"
                placeholder="Email"
                onChange={(e) => emailOnChange(e)}
              />
            </div>
            <p className="error-line">{emailError}</p>
            <br />
            <br />

            <div class="input-box">
              <FontAwesomeIcon className="icon" icon={faIdCard} />
              <input
                type="text"
                className="r-input"
                placeholder="Name"
                onChange={(e) => nameOnChange(e)}
              />
            </div>
            <p className="error-line">{nameError}</p>
            <br />
            <br />

            <div class="input-box">
              <FontAwesomeIcon className="icon" icon={faPhone} />
              <input
                type="text"
                className="r-input"
                placeholder="Phone"
                onChange={(e) => phoneOnChange(e)}
              />
            </div>
            <p className="error-line">{phoneError}</p>
            <br />
            <br />

            <div class="input-box">
              <FontAwesomeIcon className="icon" icon={faLock} />
              <input
                type="password"
                className="r-input"
                placeholder="Password"
                onChange={(e) => passwordOnChange(e)}
              />
            </div>
            <p className="error-line">{passwordError}</p>
            <br />
            <br />
          </div>

          <button className="register-btn " type="submit">
            Register
          </button>
          <br />
          <button
            style={{
              justifyItem: "center",
            }}
            className="link-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
