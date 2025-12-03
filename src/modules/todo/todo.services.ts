import { pool } from "../../config/db";

const getTodos = async () => {
    const result = await pool.query(`SELECT * FROM todos`);
    return result;
}
const createTodos = async (user_id:number,title:string,description:string) => {
    const result = await pool.query(`INSERT INTO todos(user_id,title,description) VALUES($1,$2,$3) RETURNING *`,[user_id,title,description]);
    return result;
}

const getSingleTodo = async (id:string) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`,[id]);
    return result;
}

const updateTodo = async(title:string,description:string,id:string) => {
    const result = await pool.query(`UPDATE todos SET title=$1,description=$2 WHERE id=$3 RETURNING *`,[title,description,id]);
    return result;
}

const deleteTodo = async (id:string) => {
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`,[id]);
    return result;
}

export const todosServices = {
    getTodos,
    createTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo
}