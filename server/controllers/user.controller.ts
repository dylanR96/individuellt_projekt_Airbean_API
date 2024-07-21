import { Request, Response } from 'express'
import { getErrorMessage } from '../utils/error.util';
import * as userServices from '../../services/user.service';

export const createUser = async (req: Request, res: Response) => {

  try {
    await userServices.register(req.body)
    res.status(200).send("User created");

  } catch (err) {
    res.status(400).send(getErrorMessage)
  }
};

// Login controller
export const login = async (req: Request, res: Response) => {

  try {
   const foundUser = await userServices.login(req.body)

  } catch (error) {
    console.error(error);
    res.status(500).send(getErrorMessage);
  }
};

// Logout user
export const logout = (req, res) => {
  global.currentUser = null;
  res.status(200).json({
    message: "Logout successful.",
  });
};

