import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../auth/AuthProvider";
import Logout from "../auth/Logout";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function MainNavbar() {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const { token } = useAuthContext();
  const { userRole } = useAuthContext();

  return (
    <Navbar expand="lg" bg="body-tertiary" className="px-5 shadow sticky-top">
      <Navbar.Brand as={Link} to="/">
        Felix Oasis Hotel
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-label="Toggle navigation"
      />

      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
          <Nav.Item>
            <NavLink
              to="/browse-all-rooms"
              className="nav-link"
              aria-current="page"
            >
              Browse all rooms
            </NavLink>
          </Nav.Item>
          {token && userRole === "ROLE_ADMIN" && (
            <Nav.Item>
              <NavLink to="/admin" className="nav-link" aria-current="page">
                Admin
              </NavLink>
            </Nav.Item>
          )}
        </Nav>

        <Nav className="d-flex">
          <NavDropdown
            title="Account"
            id="navbarDropdown"
            show={showAccount}
            onClick={handleAccountClick}
          >
            {token ? (
              <Logout />
            ) : (
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
            )}
          </NavDropdown>
          <Nav.Item>
            <NavLink to="/find-booking" className="nav-link">
              Find Booking
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavbar;
