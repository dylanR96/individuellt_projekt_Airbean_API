import express, { Express, Request, Response, NextFunction} from "express";
import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";
import company from "./routes/company";
import order from "./routes/order";
import users from "./routes/users";
import admin from "./routes/admin";

const port: number = 8000;
const app: Express = express();

declare global {
  let currentUser: any;
}

global.currentUser = null;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/company", company);
app.use("/api/order", order);
app.use("/api/users", users);
app.use("/api/admin", admin);

// Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on PORT: ${port}`));
