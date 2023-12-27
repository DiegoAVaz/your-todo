import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2>404 - Página Não Encontrada</h2>
      <p>A página que você está procurando não existe.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
};

export default NotFound;
