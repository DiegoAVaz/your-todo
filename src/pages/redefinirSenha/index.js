import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./styles.css";

const RedefinirSenha = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleRedefinirSenha = async () => {
    const requestBody = {
      novaSenha: novaSenha,
    };
    try {
      const response = await fetch(
        `https://api-your-todo.vercel.app/redefinirSenha/?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "123",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log(response);

      console.log("Redefinir senha com token:", token);

      setShowAlert(true);
    } catch (error) {
      console.error(error);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="redefine-container">
      <h2>Redefinir Senha</h2>
      <form>
        <label>Nova Senha:</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <label>Confirmar Senha:</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <button type="button" onClick={handleRedefinirSenha}>
          Redefinir Senha
        </button>
        <p>
          Lembrou a senha? <Link to="/login">Faça login aqui.</Link>
        </p>
      </form>

      {showAlert && (
        <div className="success-alert">
          Senha redefinida com sucesso! <br />
          <button onClick={() => navigate("/login")}>
            Voltar para a tela de login
          </button>
        </div>
      )}
    </div>
  );
};

export default RedefinirSenha;
