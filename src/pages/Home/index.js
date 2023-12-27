import React, { useState, useEffect } from "react";
import "./styles.css";
import CadastraTarefa from "../../components/CadastrarTarefa";
import TarefaItem from "../../components/TarefaItem";
import { CiSquarePlus } from "react-icons/ci";
import LogoutButton from "../../components/LogoutButton";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfos = localStorage.getItem("userInfos");

    if (!userInfos) {
      navigate("/login");
    }
  }, [navigate]);

  const openRegisterModal = () => {
    setIsEditModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsEditModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfos");
    navigate("/login");
  };

  return (
    <div className="container">
      <button className="btn" onClick={openRegisterModal}>
        <CiSquarePlus className="addIcon" />
      </button>
      <TarefaItem />
      {isEditModalOpen && <CadastraTarefa closeModal={closeRegisterModal} />}
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
}
