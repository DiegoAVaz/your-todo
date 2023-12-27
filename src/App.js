import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import EmailRedefinirSenha from "./pages/EmailRedefinirSenha";
import RedefinirSenha from "./pages/redefinirSenha";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/criarConta" element={<CriarConta />} />
      <Route path="/emailRedefinirSenha" element={<EmailRedefinirSenha />} />
      <Route path="/redefinirSenha/:token" element={<RedefinirSenha />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
