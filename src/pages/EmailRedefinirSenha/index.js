import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

const EmailRedefinirSenha = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const navigate = useNavigate();

  const handleRedefinirSenha = async () => {
    const requestBody = {
      email: email,
    };

    try {
      setIsSendingEmail(true);

      const response = await fetch(
        "https://api-your-todo.vercel.app/sendEmailRecuperaSenha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "123",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar email");
      }

      setShowAlert(true);
    } catch (error) {
      console.error(error);
      setShowAlert(true);
    } finally {
      setIsSendingEmail(false);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="email-redefine-container">
      <h2>Redefinir Senha</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          onClick={handleRedefinirSenha}
          disabled={isSendingEmail}
        >
          {isSendingEmail ? (
            <div className="loader"></div>
          ) : (
            "Enviar Email de Recuperação"
          )}
        </button>
        <p>
          Lembrou a senha? <Link to="/login">Faça login aqui.</Link>
        </p>
      </form>

      {showAlert && (
        <div className="success-alert">
          Email de recuperação enviado com sucesso!
          <button onClick={() => navigate("/login")}>OK</button>
        </div>
      )}
    </div>
  );
};

export default EmailRedefinirSenha;
