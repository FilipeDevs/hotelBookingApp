import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../auth/AuthProvider";
import Logout from "../auth/Logout";

function Navbar() {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const { token } = useAuthContext();
  const { userRole } = useAuthContext();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <span className="hotel-color">Felix Oasis Hotel</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                to={"/browse-all-rooms"}
                className="nav-link"
                aria-current="page"
              >
                Browse all rooms
              </NavLink>
            </li>
            {token && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <NavLink to={"/admin"} className="nav-link" aria-current="page">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/find-booking"}>
                Find Booking
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                Account
              </a>
              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {token ? (
                  <Logout />
                ) : (
                  <li>
                    <Link className="dropdown-item" to={"/login"}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
