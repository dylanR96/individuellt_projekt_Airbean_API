import mongoose from "mongoose";
import express from 'express';

const app = express();

const database: string = "airbean";
const url: string = `mongodb://localhost27017/${database}`;

mongoose
  .connect(url)
  .then(() => console.log("Successfully conencted to database"))
  .catch((error) => console.log(error.message));

  app.listen(8000, () => {
    console.log("Server running on 8000");
  });
