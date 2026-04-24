const express = require('express');

const router = express.Router();

const { addTask, getTasks, getTaskById, updateTask, deleteTask, softDelete, completeTask } = require('../controllers/taskController');

router.post('/tasks', addTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/:id', softDelete);
router.patch('/tasks', completeTask);

module.exports = router;