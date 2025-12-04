import { Request, Response } from "express";
import { authServices } from "./auth.services";

const login = async (req: Request, res: Response) => {
  try {
    const result = await authServices.login(req.body);
    res.status(201).json({
      message: "user created successfully",
      status: 201,
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const authController = {
  login,
};
