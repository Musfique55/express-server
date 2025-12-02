import { Request, Response } from "express";
import { userServices } from "./user.service";

const getUsers =  async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    res.status(200).json({
      message: "users retrieved sucessfully",
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userServices.getSingleUser(id!);
    if (!result.rowCount) {
     return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }else{
        res.status(200).json({
           message: "user fetched successfully",
           success: true,
           data : result.rows[0]
         });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {name,age} = req.body;
  try {
    const result = await userServices.updateUser(name,age,id!);
    if (!result.rowCount) {
     return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }else{
        res.status(201).json({
           message: "user updated successfully",
           success: true,
           data : result.rows[0]
         });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userServices.deleteUser(id!);
    if (!result.rowCount) {
     return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }else{
        res.status(200).json({
           message: "user deleted successfully",
           success: true,
           data : result.rows[0]
         });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

const createUser = async (req: Request, res: Response) => {
  const { name, age } = req.body;
  try {
    const result = await userServices.createUser(name,age);

    res.status(201).json({
      message: "user created sucessfully",
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

export const userControllers = {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    createUser
}