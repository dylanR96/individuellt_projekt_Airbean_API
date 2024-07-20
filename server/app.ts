import express, { Express} from "express";
import users from './routes/users.js'
import cors from 'cors'

const app: Express = express()

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api", users);

export default app;
