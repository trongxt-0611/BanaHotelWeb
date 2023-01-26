import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { doLogout } from "../../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import Avatar from "react-avatar";
import _ from "lodash";
export const AdminHeader = (props) => {
  const dispatch = useDispatch();
  const { collapsed, setCollapsed, account, isAuthenticated } = props;
  const navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <FaBars
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-toggle"
        />
        {isAuthenticated ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="navbar-brand">
                <label id="black">BLΛƆK</label>
                <label id="pink">PIИK</label>
              </NavLink>
            </Nav>
            <Nav>
              <Avatar
                round={true}
                size="40"
                src={
                  !_.isEmpty(account.avatar)
                    ? account.avatar
                    : "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x488-rddkk3u9.png"
                }
                name="Foo Bar"
              />
              <NavDropdown id="basic-nav-dropdown" title={account.username}>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/updateprofile");
                  }}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    dispatch(doLogout());
                  }}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        ) : (
          ""
        )}
      </Container>
    </Navbar>
  );
};
