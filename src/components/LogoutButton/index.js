import React from "react";
import "./styles.css";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = ({ onLogout }) => {
  return (
    <button className="logout-button" onClick={onLogout}>
      <FiLogOut className="logout-icon" /> Sair
    </button>
  );
};

export default LogoutButton;
