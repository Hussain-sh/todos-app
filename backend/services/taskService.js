const taskModel = require("../models/taskModel");

const create = async(taskData) => {
    return await taskModel.addTask(taskData);
}

const getAll = async(completed) => {
    return await taskModel.getAllTasks(completed);
}

const getTask = async(id) => {
    const task = await taskModel.getTask(id);
    if(!task){
        throw new Error('Task not found');
    }
    return task;
}

const updateTask = async(id, taskData) => {
    const allowedFields = ['title', 'description', 'completed'];
    let setParts = [];
    let values = [];
    let paramIndex = 1;

    for(const field of allowedFields){
        if(taskData[field] !== undefined){
            setParts.push(`${field} = $${paramIndex}`);
            values.push(taskData[field]);
            paramIndex++;
        }
    }

    values.push(id);

    const updatedTask = await taskModel.updateTask(setParts, values, paramIndex);
    return updatedTask;
}

const deleteTask = async(id) => {
    const deletedTask = await taskModel.deleteTask(id);
    if(!deletedTask){
        throw new Error("Task not found");
    }
    return deletedTask;
}

const softDelete = async(id, isDeleted) => {
    const deletedTask = await taskModel.softDelete(id, isDeleted);
    return deletedTask;
}

const completeTask = async(id, completed) => {
    const completeTask = await taskModel.completeTask(id, completed);
    return completeTask;
}

module.exports = { create, getAll, getTask, updateTask, deleteTask, softDelete, completeTask }