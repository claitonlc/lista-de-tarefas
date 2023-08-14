import React, { useState, useEffect } from "react";
import "./TodoList.css";
import Icone from "./assets/icon.webp";

function TodoList() {
  const listaStorage = localStorage.getItem("Lista");

  const [lista, setLista] = useState(
    listaStorage ? JSON.parse(listaStorage) : []
  );
  const [novoItem, setNovoItem] = useState("");

  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(lista));
  }, [lista]);

  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem) {
      return;
    }
    setLista([...lista, { text: novoItem, iscompleted: false }]);
    setNovoItem("");
    document.getElementById("input-entrada").focus();
  }
  function clicou(index) {
    const listaAux = [...lista];
    listaAux[index].iscompleted = !listaAux[index].iscompleted;
    setLista(listaAux);
  }

  function deleta(index) {
    const listaAux = [...lista];
    listaAux.splice(index, 1);
    setLista(listaAux);
  }
  function deletaTudo() {
    setLista([]);
  }

  function atualizaItem(index, newText) {
    const listaAux = [...lista];
    listaAux[index].text = newText;
    setLista(listaAux);
    setEditIndex(-1); // Sai do modo de edição
  }
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionaItem}>
        <input className="input-add"
          id="input-entrada"
          type="text"
          value={novoItem}
          onChange={(e) => {
            setNovoItem(e.target.value);
          }}
          placeholder="Adicione uma tarefa"
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
      <div className="listaTarefas">
        <div style={{ textAlign: "center" }}>
          {lista.length > 0 ? (
            lista.map((item, index) => (
              <div
                key={index}
                className={item.iscompleted ? "item completo" : "item"}
              >
                {editIndex === index ? (
                  <>
                    <input className="input-update"
                      type="text"
                      value={editText !== "" ? editText : item.text} // Use o texto do item se o editText estiver vazio
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      onClick={() => atualizaItem(index, editText || item.text)} 
                      className="update"
                    >
                      Atualizar
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() => {
                        clicou(index);
                      }}
                    >
                      {item.text}
                    </span>
                    <button
                      onClick={() => {
                        deleta(index);
                      }}
                      className="del"
                    >
                      Deletar
                    </button>
                    <button
                      onClick={() => setEditIndex(index)}
                      className="edit"
                    >
                      Editar
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <img className="icone-central" src={Icone} alt="Ícone" />
            
          )}
          {lista.length > 0 && (
                <button
                  onClick={() => {
                    deletaTudo();
                  }}
                  className="deleteALL"
                >
                  Deletar todos
                </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
