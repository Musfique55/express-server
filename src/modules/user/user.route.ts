import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

const getUsers = router.get('/',userControllers.getUsers);
const createUser = router.post('/',userControllers.createUser);
const getSingleUser = router.get('/:id',userControllers.getSingleUser);
const updateUser = router.put('/:id',userControllers.updateUser);
const deleteUser = router.delete('/:id',userControllers.deleteUser);


export const userRoutes = router;