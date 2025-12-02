import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { config } from "./config";
import { initDB, pool } from "./config/db";
import { userRoutes } from "./modules/user/user.route";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const app = express();
const port = config.port;
app.use(express.json());



// initializing db
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Woo!");
});

// users crud
app.use("/users",userRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
