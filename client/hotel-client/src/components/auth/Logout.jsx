import React from "react";
import { useAuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    toast.success("Logout successful!");
    navigate("/");
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
