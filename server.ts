import express, { Express, Request, Response, NextFunction} from "express";
import errorHandler from "./server/middleware/errorHandler";
import notFound from "./server/middleware/notFound";
import company from "./server/routes/company";
import order from "./server/routes/order";
import users from "./server/routes/users";
import admin from "./server/routes/admin";

const port: number = 8000;
const app: Express = express();

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
