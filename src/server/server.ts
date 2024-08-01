import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 8000;

const database: string = "airbean";
const url: string = `mongodb://localhost27017/${database}`

mongoose
.connect(url)
.then(() => console.log("Successfully connected to database"))
.catch((error) => console.log(error.message))

app.use(
  cors({
    origin: "https://localhost:5173"
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.listen(8000, () => {
  console.log(`Server is running on ${PORT}`);
})