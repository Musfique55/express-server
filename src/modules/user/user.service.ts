import { pool } from "../../config/db";

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (id : string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result;
}

const updateUser = async (name:string,age:number,id:string) => {
   const result = await pool.query(`UPDATE userS SET name=$1,age=$2 WHERE id=$3 RETURNING * `, [name,age,id]);
   return result;
}

const deleteUser = async (id : string) => {
   const result=  pool.query(`DELETE FROM users WHERE id = $1`, [id]);
   return result;
}

const createUser = async (name:string,age:number) => {
   const result =  await pool.query(
      `INSERT INTO users(name,age) VALUES($1,$2) RETURNING *`,
      [name, age]
    );
    return result;
}

export const userServices = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createUser
};
