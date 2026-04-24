const taskService = require('../services/taskService')

const addTask = async (req, res) => {
    try{
        const { title, description } = req.body;
        if(!title || !description){
            res.status(400).json({ message: "Missing requirred fields!" });
        }
        const newTask = await taskService.create({ title, description });
        res.status(201).json(newTask);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}

const getTasks = async(req, res)=> {
    try{
       const { completed } = req.query;
       const getTasks = await taskService.getAll(completed);
       res.status(200).json(getTasks);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}

const getTaskById = async(req, res) => {
    try{
        const { id } = req.params;
        const getTask = await taskService.getTask(id);
        res.status(200).json(getTask);
    }catch(error){
        res.status(404).json({ error: error.message });
    }
}

const updateTask = async(req, res) => {
    try{
        const { id } = req.params;
        const taskData = req.body;
        if (!taskData || Object.keys(taskData).length === 0) {
            return res.status(400).json({ error: 'No fields provided to update' });
        }
        const updateTask = await taskService.updateTask(id, taskData);
        res.status(200).json(updateTask);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

const deleteTask = async(req, res) => {
    try{
        const { id } = req.params;
        await taskService.deleteTask(id);
        res.status(200).json({ message: 'Task Deleted successfully' });
    }catch(error){
        res.status(404).json({ error: error.message });
    }
}


const softDelete = async(req, res) => {
    try{
        const { id } = req.params;
        const { isDeleted } = req.body;
        const result = await taskService.softDelete(id, isDeleted);
        res.status(200).json({ message: 'Task Deleted', result });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

const completeTask = async(req, res) => {
    try{
        const { completed, id } = req.query;
        const result = await taskService.completeTask(id, completed);
        res.status(200).json({ message: "Marked as completed", result });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addTask, getTasks, getTaskById, updateTask, deleteTask, softDelete, completeTask };