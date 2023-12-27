import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfos = localStorage.getItem("userInfos");

    if (userInfos) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const credenciais = {
      username: username,
      senha: senha,
    };
    try {
      const response = await fetch("https://api-your-todo.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "123",
        },
        body: JSON.stringify(credenciais),
      });

      if (!response.ok) {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);

        throw new Error("Não foi possível realizar o Login");
      }

      const data = await response.json();
      const { userInfos } = data;

      localStorage.setItem("userInfos", JSON.stringify(userInfos));

      navigate("/");

      console.log("Login ok");
    } catch (error) {
      console.error(error);
    }
    console.log("Efetuar login com:", username, senha);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>
          Não tem uma conta? <Link to="/criarConta">Crie uma aqui.</Link>
        </p>
        <p>
          Esqueceu a senha?{" "}
          <Link to="/emailRedefinirSenha">Redefina sua senha.</Link>
        </p>
      </form>

      {showAlert && (
        <div className="alert">
          Ops... Há algo errado. Verifique suas credenciais.
        </div>
      )}
    </div>
  );
};

export default Login;
