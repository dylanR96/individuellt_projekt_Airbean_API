import { Router } from "express";
import * as userController from '../controllers/user.controller'

const router = Router();

// Log in user
router.post("/login", userController.login);

// Create user
router.post("/signup", userController.createUser);

// Log out user
router.post("/logout", userController.logout);

export default router;
