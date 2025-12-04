import { pool } from "../../config/db";
import bcrypt from "bcryptjs"
const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (id : string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result;
}

const updateUser = async (name:string,age:number,id:string) => {
   const result = await pool.query(`UPDATE users SET name=$1,age=$2 WHERE id=$3 RETURNING * `, [name,age,id]);
   return result;
}

const deleteUser = async (id : string) => {
   const result=  pool.query(`DELETE FROM users WHERE id = $1`, [id]);
   return result;
}

const createUser = async (payload : Record<string,unknown>) => {
   const {name,email,password,role} = payload;
   const hashedPass = await bcrypt.hash(password as string,10);
   const result =  await pool.query(
      `INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *`,
      [name, email,hashedPass,role]
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
