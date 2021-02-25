const { json } = require('express');
const database = require('../database/connection');

class TaskController {
    novaTarefa(req, res) {
        const { tarefa, descricao, responsavel } = req.body;

        console.log(tarefa, descricao, responsavel);

        database.insert({ tarefa, descricao, responsavel })
            .table('tasks')
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            });

        return true;
    }

    listarTarefa(req, res) {
        database
            .select("*")
            .table("talks")
            .then(tarefa => {
                return tarefa.json(tarefa);
            }).catch(error => {
                console.log(error);
            });
    }

    listarUmaTarefa(req, res) {
        const id = req.params;

        database
            .select("*")
            .table("talks")
            .where({ id: id })
            .then(tarefa => {
                return tarefa.json(tarefa);
            }).catch(error => {
                console.log(error);
            });
    }

    atualizarTarefa(req, res) {
        const id = req.params;
        const { descricao } = req.body;

        database
            .where({ id: id })
            .update({ descricao: descricao })
            .table("tasks")
            .then(data => {
                return res.json({ message: "Tarefa atualizada com sucesso" });
            }).catch(error => {
                return res.json(error);
            });
    }

    removerTarefa(req, res) {
        const id = req.params;

        database
            .where({ id: id })
            .del()
            .table("tasks")
            .then(data => {
                return res.json({ message: "Tarefa removovida com sucesso" });
            }).catch(error => {
                return res.json(error);
            })
    }
}

module.exports = new TaskController();