import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import users from "./routes/user.route";

const app = express();

const database: string = "airbean";
const url: string = `mongodb://localhost:27017/${database}`;

mongoose
.connect(url)
.then(() => console.log("Successfully connected to database"))
.catch((error) => console.log(error.message))

app.use(
  cors({
    origin: "https://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api", users)

app.listen(8000, () => {
  console.log(`Server is running on 8000`);
})