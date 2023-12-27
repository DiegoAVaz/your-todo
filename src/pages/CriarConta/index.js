import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const CriarConta = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfos = localStorage.getItem("userInfos");

    if (userInfos) {
      navigate("/");
    }
  }, [navigate]);

  const handleCriarConta = async () => {
    const userInfo = {
      nome,
      sobrenome,
      email,
      username,
      senha,
    };
    try {
      const response = await fetch(
        "https://api-your-todo.vercel.app/criarUsuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: "123",
          },
          body: JSON.stringify(userInfo),
        }
      );

      if (!response.ok) {
        throw new Error("Houve algum problema ao criar conta");
      }

      setShowSuccessAlert(true);

      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="criar-conta-container">
      <h2>Criar Conta</h2>
      <form>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label>Sobrenome:</label>
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Nome de usuário:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="button" onClick={handleCriarConta}>
          Criar Conta
        </button>

        <p onClick={() => navigate("/login")}>Já tem uma conta? Faça login.</p>
      </form>

      {showAlert && (
        <div className="alert">
          Ops... Houve um erro ao criar a conta. Tente novamente.
        </div>
      )}

      {showSuccessAlert && (
        <div className="success-alert">
          Conta criada com sucesso! <br />
        </div>
      )}
    </div>
  );
};

export default CriarConta;
