const taskService = require('../services/taskService')

const addTask = async (req, res) => {
    try{
        const { title, description } = req.body;
        if(!title){
            res.status(400).json({ message: "Missing requirred fields!" });
        }

        if (description.length > 500) {
            return res.status(400).json({ message: "Description must be under 500 characters." });
        }
        const newTask = await taskService.create({ title, description });
        res.status(201).json({ message: 'Task created successfully!', newTask });
    } catch(error){
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
}

const getTasks = async(req, res)=> {
    try{
       const { completed } = req.query;
       const getTasks = await taskService.getAll(completed);
       res.status(200).json(getTasks);
    } catch(error){
        res.status(500).json({ message: 'Failed to fetch tasks.' });
    }
}

const getTaskById = async(req, res) => {
    try{
        const { id } = req.params;
        const task = await taskService.getTask(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json(task);
    } catch(error){
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
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
        res.status(200).json({ message: 'Task Updated successfully', updateTask });
    }catch(error){
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
}

const deleteTask = async(req, res) => {
    try{
        const { id } = req.params;
        const task = await taskService.deleteTask(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json({ message: 'Task Deleted successfully' });
    }catch(error){
        res.status(500).json({ message: 'Failed to delete tasks.' });
    }
}


const softDelete = async(req, res) => {
    try{
        const { id } = req.params;
        const { isDeleted } = req.body;
        const result = await taskService.softDelete(id, isDeleted);
        if(!result){
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.status(200).json({ message: 'Task Deleted', result });
    }catch(error){
        res.status(500).json({ message: 'Failed to delete tasks.' });
    }
}

const completeTask = async(req, res) => {
    try{
        const { completed } = req.query;
        const { id } = req.params;
        const result = await taskService.completeTask(id, completed);
        res.status(200).json({ message: "Marked as completed", result });
    }catch(error){
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
}

module.exports = { addTask, getTasks, getTaskById, updateTask, deleteTask, softDelete, completeTask };