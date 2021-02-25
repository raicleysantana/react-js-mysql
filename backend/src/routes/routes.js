const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.get('/tarefas', TaskController.listarTarefa);
router.get('/tarefas/:id', TaskController.listarUmaTarefa);
router.post('/novaTarefa', TaskController.novaTarefa);
router.put('/atualizar/tarefa/:id', TaskController.atualizarTarefa);
router.delete('/delete/tarefa/:id', TaskController.removerTarefa);

module.exports = router;
