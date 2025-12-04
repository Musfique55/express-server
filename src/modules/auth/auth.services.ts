import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import { config } from "../../config";


const login = async (payload : Record<string,unknown>) => {
    const {email,password} = payload;

    const result = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);
    if(!result.rows){
        return null;
    }

    const user = result.rows[0];
    const matched = await bcrypt.compare(password as string,user.password);

    if(!matched){
        return false;
    }


    const token = jwt.sign({name:user.name,email:user.email},config.jwt_secret as string,{
        expiresIn : "10h"
    });

    delete user.password;
    
    return {token,user};
}



export const authServices = {
     login
}