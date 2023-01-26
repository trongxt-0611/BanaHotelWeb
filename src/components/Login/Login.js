import { useState } from "react";
import "./Login.scss";
import { postLogin } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/actions/userActions";
import axios from "axios";

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const emailOnChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const passwordOnChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };
  const loadUser = (email) => {
    return axios.get(
      `http://pandoraolaole-001-site1.btempurl.com/User/getUserByEmail/${email}`
    );
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    //validate

    //submit api
    try {
      let res = await postLogin(email, password);
      if (res && res.status === 200) {
        let userLoad = await loadUser(res.data.email);
        console.log(">>>userLoad", userLoad);
        if (userLoad.status === 200) {
          let userData = userLoad.data;
          userData["isAdmin"] = res.data.isAdmin;
          console.log(">>>userData", userData);
          dispatch(doLogin(userData));
          toast.success("Welcome to Bana Hotel");
          if (userData["isAdmin"]) {
            navigate(`/admins`);
          } else {
            navigate(`/${email}`);
          }
        } else {
          navigate(`/login`);
        }
      }
      // console.log(">>>>res: ", res);
    } catch (error) {
      if (error.response.data.status === 400) {
        setEmailError(error.response.data.errors["Email"]);
        setPasswordError(error.response.data.errors["Password"]);
        // console.log(">>>>err:", error.response.data.errors);
      } else {
        toast.error(error.response.data);
        // console.log(">>>>error: ", error);
      }
    }
  };

  return (
    <div className="login-container">
      <div
        className="login-logo"
        style={{ cursor: "pointer" }}
        title={"Home page"}
      >
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>
        <p>Ba Na Hill Hotel Web</p>
      </div>

      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h1 className="login-title">Login</h1>
          <div className="login-field">
            <FontAwesomeIcon className="login-icon" icon={faUser} />
            <input
              type="text"
              className="login-input"
              name="username"
              placeholder="User name"
              onChange={(event) => {
                emailOnChange(event);
              }}
            />
          </div>
          <p className="error-line">{emailError}</p>
          <br />
          <br />

          <div className="login-field">
            <FontAwesomeIcon className="login-icon" icon={faLock} />
            <input
              type="password"
              className="login-input"
              name="password"
              placeholder="Password"
              onChange={(event) => {
                passwordOnChange(event);
              }}
            />
          </div>
          <p className="error-line">{passwordError}</p>
          <br />

          <div className="error-container"></div>

          <button className="login-btn" type="submit">
            Login
          </button>
          <br />
          <button
            className="link-btn"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
