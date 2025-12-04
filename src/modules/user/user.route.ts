import { Router } from "express";
import { userControllers } from "./user.controller";
import  auth  from "../../middleware/auth";

const router = Router();

router.get("/",auth("admin"), userControllers.getUsers);
router.post("/", userControllers.createUser);
router.get("/:id", userControllers.getSingleUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
