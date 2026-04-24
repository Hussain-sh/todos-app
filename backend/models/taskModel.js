const pool = require("../config/db");

const addTask = async (taskData) => {
    const { title, description } = taskData;
    const query = 'Insert into tasks (title, description) values ($1, $2) returning *';
    const result = await pool.query(query, [title, description]);
    return result.rows;
}

const getAllTasks = async(completed) => {
    let query = 'Select * from tasks where is_deleted = false';
    let values = [];
    if(completed){
        query += ' AND completed = $1';
        values.push(completed === "true");
    }
    const result = await pool.query(query, values);
    return result.rows;
}

const getTask = async(id) => {
    const query = 'Select * from tasks where id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

const updateTask = async(setParts, values, paramIndex) => {
    const query = `Update tasks set ${setParts.join(",")} where id = $${paramIndex} returning *`;
    const updatedTask = await pool.query(query, values);
    return updatedTask.rows;
}

const deleteTask = async(id) => {
    const query = 'Delete from tasks where id = $1';
    await pool.query(query, [id]);
}

const softDelete = async(id, isDeleted) => {
    const query = `
    UPDATE tasks
    SET is_deleted = $1
    WHERE id = $2
    RETURNING *;
  `;
    const result = await pool.query(query, [isDeleted, id]);
    return result.rows[0];
}

const completeTask = async(id, completed) => {
    const query = `
    UPDATE tasks
    SET completed = $1
    WHERE id = $2
    RETURNING *;
  `;
    const result = await pool.query(query, [completed, id]);
    return result.rows[0];
}


module.exports =  { addTask, getAllTasks, getTask, updateTask, deleteTask, softDelete, completeTask };