import React from "react";
import { useAuthContext } from "./AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
  const auth = useAuthContext();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleLogout = () => {
    auth.handleLogout();
    toast.success("Logout successful!");
    window.location.replace(redirectUrl);
  };

  return (
    <>
      <li>
        <Link className="dropdown-item" to={"/profile"}>
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <button className="dropdown-item" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Logout;
