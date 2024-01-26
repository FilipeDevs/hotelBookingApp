import React from "react";

function Header({ title }) {
  return (
    <header className="header">
      <div className="overlay"></div>
      <div className="animated-texts overlay-content">
        <h1 className="text-center">{title}</h1>
      </div>
    </header>
  );
}

export default Header;
