import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { parseISO } from "date-fns";

const EditarTarefa = ({ closeModal, tarefaId }) => {
  const modalRef = useRef();
  const [tarefa, setTarefa] = useState({
    nomeTarefa: "",
    descricaoTarefa: "",
    dataHoraTarefa: "",
    ativa: 1,
  });

  const formatDateTime = (dateTime) => {
    return dateTime.toISOString().slice(0, 16);
  };

  useEffect(() => {
    const fetchTarefaDetails = async () => {
      try {
        if (tarefaId) {
          const response = await fetch(
            `https://api-your-todo.vercel.app/buscarTarefa/?id_tarefa=${tarefaId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "123",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Não foi possível recuperar os detalhes da tarefa");
          }
          const data = await response.json();
          const tarefaData = data.tarefa[0];
          setTarefa({
            nomeTarefa: tarefaData.nome_tarefa,
            descricaoTarefa: tarefaData.descricao_tarefa,
            dataHoraTarefa: formatDateTime(parseISO(tarefaData.horario_tarefa)),
            ativa: tarefaData.status,
          });
        }
      } catch (error) {
        console.error("Erro ao recuperar detalhes da tarefa:", error.message);
      }
    };

    fetchTarefaDetails();
  }, [tarefaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatBackendDateTime = (dateTime) => {
      return new Date(dateTime).toISOString().slice(0, 19);
    };

    const updatedTarefa = {
      nome_tarefa: tarefa.nomeTarefa,
      descricao_tarefa: tarefa.descricaoTarefa,
      horario_tarefa: formatBackendDateTime(tarefa.dataHoraTarefa),
      status: tarefa.ativa,
    };

    try {
      const response = await fetch(
        `https://api-your-todo.vercel.app/atualizarTarefa/?id_tarefa=${tarefaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "123",
          },
          body: JSON.stringify(updatedTarefa),
        }
      );

      if (!response.ok) {
        throw new Error("Não foi possível atualizar a tarefa");
      }

      console.log("Tarefa atualizada com sucesso");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error.message);
    }
  };

  return (
    <div className="containerCadastro">
      <div className="overlay">
        <div className="modal" ref={modalRef}>
          <h2 className="addTaskTitle">Edição de Tarefa</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Nome da Tarefa:
              <input
                type="text"
                name="nomeTarefa"
                value={tarefa.nomeTarefa}
                onChange={(e) =>
                  setTarefa({ ...tarefa, nomeTarefa: e.target.value })
                }
              />
            </label>
            <label>
              Descrição da Tarefa:
              <textarea
                name="descricaoTarefa"
                value={tarefa.descricaoTarefa}
                onChange={(e) =>
                  setTarefa({ ...tarefa, descricaoTarefa: e.target.value })
                }
              />
            </label>
            <label>
              Data e Hora da Tarefa:
              <input
                type="datetime-local"
                name="dataHoraTarefa"
                value={tarefa.dataHoraTarefa}
                onChange={(e) =>
                  setTarefa({ ...tarefa, dataHoraTarefa: e.target.value })
                }
              />
            </label>
            <label>
              Ativar/Desativar tarefa:
              <select
                name="ativa"
                className="select"
                value={tarefa.ativa.toString()}
                onChange={(e) =>
                  setTarefa({
                    ...tarefa,
                    ativa: e.target.value === "1" ? 1 : 0,
                  })
                }
              >
                <option value={"1"}>Tarefa ativada</option>
                <option value={"0"}>Tarefa Desativada</option>
              </select>
            </label>
            <button type="submit">Atualizar</button>
          </form>
          <button onClick={closeModal}>Fechar Modal</button>
        </div>
      </div>
    </div>
  );
};

export default EditarTarefa;
