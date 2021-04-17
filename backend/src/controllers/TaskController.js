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
            .table("tasks")
            .then(tarefa => {
                return res.json(tarefa);
            }).catch(error => {
                console.log(error);
            });
    }

    listarUmaTarefa(req, res) {
        const id = req.params;

        database
            .select("*")
            .table("tasks")
            .where({ id: id })
            .then(tarefa => {
                return res.json(tarefa);
            }).catch(error => {
                console.log(error);
            });
    }

    atualizarTarefa(req, res) {
        const id = req.params;
        const { responsavel, descricao, tarefa } = req.body;

        database
            .where({ id: id })
            .update({ tarefa, descricao, responsavel })
            .table("tasks")
            .then(data => {
                return res.json({ message: "Tarefa atualizada com sucesso" });
            }).catch(error => {
                return res.json(error);
            });
    }

    removerTarefa(req, res) {
        const { id } = req.params;

        database
            .table("tasks")
            .where({ id: id })
            .del()
            .then(data => {
                res.json({ message: "Tarefa removovida com sucesso" });
            }).catch(error => {
                res.json(error);
            })
    }
}

module.exports = new TaskController();