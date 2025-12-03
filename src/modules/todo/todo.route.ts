import { Router } from "express";
import { todosController } from "./todo.controller";

const route = Router();

route.get("/",todosController.getTodos);
route.post("/",todosController.createTodos);
route.get("/:id",todosController.getSingleTodo);
route.put("/:id",todosController.updateTodo);
route.delete("/:id",todosController.deleteTodo);

export const todosRoute = route;