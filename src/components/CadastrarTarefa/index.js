import React, { useEffect, useRef } from "react";
import { format } from "date-fns";
import "./styles.css";

export default function CadastraTarefa({ closeModal }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const nomeTarefa = formData.get("nomeTarefa");
    const descricaoTarefa = formData.get("descricaoTarefa");

    const dataHoraTarefa = format(
      new Date(formData.get("dataHoraTarefa")),
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
    );

    const tarefaData = {
      nome_tarefa: nomeTarefa,
      descricao_tarefa: descricaoTarefa,
      horario_tarefa: dataHoraTarefa,
    };

    try {
      const idUsuario = JSON.parse(localStorage.getItem("userInfos")).idusuario;

      const response = await fetch(
        `https://api-your-todo.vercel.app/criarTarefa/?idusuario=${idUsuario}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "123",
          },
          body: JSON.stringify(tarefaData),
        }
      );

      if (!response.ok) {
        throw new Error("Não foi possível cadastrar a tarefa");
      }

      console.log("Tarefa cadastrada com sucesso");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error.message);
    }
  };

  return (
    <div className="containerCadastro">
      <div className="overlay">
        <div className="modal" ref={modalRef}>
          <h2 className="addTaskTitle">Cadastro de Tarefa</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Nome da Tarefa:
              <input type="text" name="nomeTarefa" />
            </label>
            <label>
              Descrição da Tarefa:
              <textarea name="descricaoTarefa" />
            </label>
            <label>
              Data e Hora da Tarefa:
              <input type="datetime-local" name="dataHoraTarefa" />
            </label>
            <button type="submit">Cadastrar</button>
          </form>
          <button onClick={closeModal}>Fechar Modal</button>
        </div>
      </div>
    </div>
  );
}
