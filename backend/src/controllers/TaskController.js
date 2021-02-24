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
}

module.exports = new TaskController();