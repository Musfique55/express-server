import express, { Request, Response } from "express";
import { config } from "./config";
import { initDB } from "./config/db";
import { userRoutes } from "./modules/user/user.route";
import { todosRoute } from "./modules/todo/todo.route";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
const port = config.port;
app.use(express.json());



// initializing db
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Woo!");
});

//* users crud
app.use("/users",userRoutes);

//* todos crud
app.use("/todos",todosRoute);

//* auth
app.use("/auth",authRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
