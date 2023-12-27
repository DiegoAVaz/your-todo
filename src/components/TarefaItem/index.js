import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import "./styles.css";
import { FaEdit } from "react-icons/fa";
import EditarTarefa from "../EditarTarefa";

export default function TarefaItem() {
  const [tarefas, setTarefas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tarefaEditId, setTarefaEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasTasks, setHasTasks] = useState(true);

  useEffect(() => {
    const userInfos = JSON.parse(localStorage.getItem("userInfos"));

    if (!userInfos || !userInfos.idusuario) {
      setLoading(false);
      setHasTasks(false);
      return;
    }

    const idUsuario = userInfos.idusuario;

    const fetchTarefas = async () => {
      try {
        const response = await fetch(
          `https://api-your-todo.vercel.app/buscarTarefas/?idusuario=${idUsuario}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "123",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Não foi possível recuperar as tarefas");
        }

        const data = await response.json();

        const tarefasFormatadas = (data.tarefas || []).map((tarefa) => ({
          ...tarefa,
          data_formatada: format(new Date(tarefa.horario_tarefa), "dd/MM/yy"),
          hora_formatada: format(new Date(tarefa.horario_tarefa), "HH:mm"),
          desativada: tarefa.status,
        }));

        setTarefas(tarefasFormatadas);
        setLoading(false);
        setHasTasks(tarefasFormatadas.length > 0);
      } catch (error) {
        console.error("Erro ao recuperar tarefas:", error.message);
        setLoading(false);
        setHasTasks(false);
      }
    };

    fetchTarefas();
  }, []);

  const handleVerEditar = (id_tarefa) => {
    setTarefaEditId(id_tarefa);
    setIsModalOpen(true);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="tarefa-list">
      {hasTasks ? (
        <>
          <div className="tarefa-item tarefa-header">
            <span>Nome</span>
            <span>Data e Hora</span>
            <span></span>
          </div>
          {tarefas.map((tarefa) => (
            <div
              key={tarefa.id_tarefa}
              className={`tarefa-item ${
                tarefa.desativada === 0 ? "desativada" : ""
              }`}
            >
              <span>{tarefa.nome_tarefa}</span>
              <div className="dataHora">
                <FaCalendarAlt className="icone" /> {tarefa.data_formatada}
                <br />
                <FaClock className="icone" /> {tarefa.hora_formatada}
              </div>
              <div className="acoes">
                <button
                  className="editarBtn"
                  onClick={() => handleVerEditar(tarefa.id_tarefa)}
                >
                  {<FaEdit />} <div className="actBtnText">Ver/Editar</div>
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="empty-message fadeIn">Nenhuma tarefa encontrada.</p>
      )}
      {isModalOpen && (
        <EditarTarefa
          closeModal={() => setIsModalOpen(false)}
          tarefaId={tarefaEditId}
        />
      )}
    </div>
  );
}
