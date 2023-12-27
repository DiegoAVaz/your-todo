import React from "react";
import "./styles.css";
import logoImage from "../../assets/imgs/yourTodo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logoImage} alt="Logo" />
      </div>
    </div>
  );
};

export default Header;
