import _ from "lodash";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { doLogout } from "../../redux/actions/userActions";
import "./Header.css"

const Header = () => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const account = useSelector((state) => state.userReducer.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          <label id="black">BLΛƆK</label>
          <label id="pink">PIИK</label>
          {/* <h3>BLΛƆKPIИK</h3> */}

        </NavLink>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">

            </NavLink>
            {isAuthenticated && account.isAdmin ? (
              <NavLink to="/admins" className="nav-link">
                System Management
              </NavLink>
            ) : (
              ""
            )}
          </Nav>
          {!isAuthenticated ? (
            <Nav className="d-flex">
              <NavLink to="/login" className="btn btn-primary btn-login">
                Log in
              </NavLink>
              <NavLink to="/register" className="btn btn-dark">
                Register
              </NavLink>
            </Nav>
          ) : (
            <Nav>
              <Avatar
                round={true}
                size="40"
                src={account.avatar === null
                    ? "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM="
                    : account.avatar}
                    />
              <NavDropdown
                title={
                  account && !_.isEmpty(account.name) ? account.name : "no name"
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/updateprofile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/updatepassword">
                  Change password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(doLogout());
                    navigate("/login");
                  }}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
