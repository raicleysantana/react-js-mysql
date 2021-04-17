import React, { Component } from 'react';
import './App.css';
import { FaPlus, FaTrash } from 'react-icons/fa';
import api from './service/api';

export default class App extends Component {

  state = {
    tarefas: [],
    tarefa: "",
    descricao: "",
    responsavel: ""
  }

  async carregaTarefas() {
    await api.get('tarefas').then(resp => {
      console.log("Tarefas: " + resp.data);
      this.setState({ tarefas: resp.data });
    });

  }

  novaTarefa() {
    api.post('novaTarefa', { tarefa: this.state.tarefa }).then(resp => {
      console.log(resp.data)
    });
  }

  async removeTarefa(id) {
    const response = await api.delete(`delete/tarefa/${id}`);
    console.log(response);
  }

  componentDidMount() {
    this.carregaTarefas();
  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <h3>To do list</h3>
          </div>
          <div>
            <div className="form-row">
              <div className="form-group col-10">
                <input
                  style={{ marginTop: 25 }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Digite o nome da tarefa"
                  value={this.state.tarefa}
                  onChange={e => this.setState({ tarefa: e.target.value })}
                />
              </div>
              <div className="form-group col-2" style={{ marginTop: 25 }}>
                <button
                  className="btn btn-success"
                  onClick={() => { this.novaTarefa() }}
                ><FaPlus ></FaPlus>
                </button>
              </div>
            </div>
            <hr style={{ marginTop: 25, marginBottom: 25 }}></hr>
            <div className="titulo2">
              <h4>Tarefas Criadas</h4>
            </div>
            {this.state.tarefas.map(tarefa =>
              <div className="task" key={tarefa.id}>
                <div className="taskItem">{tarefa.tarefa}</div>
                <FaTrash className="trashIcon" onClick={() => this.removeTarefa(tarefa.id)}></FaTrash>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}
