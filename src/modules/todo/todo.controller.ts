import { Request, Response } from "express";
import { todosServices } from "./todo.services";

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosServices.getTodos();
    res.status(200).json({
      message: "todos retrieved successfully",
      status: 200,
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const createTodos = async (req: Request, res: Response) => {
  const { user_id, title, description } = req.body;
  try {
    const result = await todosServices.createTodos(user_id, title, description);
    res.status(201).json({
      message: "todos created sucessfully",
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await todosServices.getSingleTodo(id!);
    if (!result.rowCount) {
      res.status(404).json({
        message: "todo not found",
        success: false,
        status: 404,
      });
    } else {
      res.status(200).json({
        message: "todo fetched sucessfully",
        success: true,
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await todosServices.updateTodo(title, description, id!);
    if (!result.rowCount) {
      res.status(404).json({
        message: "todo not found",
        success: false,
      });
    } else {
      res.status(201).json({
        message: "todo updated successfully",
        success: true,
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await todosServices.deleteTodo(id!);
    if (!result.rowCount) {
      return res.status(404).json({
        message: "todo not found",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "todo deleted successfully",
        success: true,
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const todosController = {
  getTodos,
  createTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo
};
