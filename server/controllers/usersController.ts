import {Request, Response} from 'express'

const createUser = async (req: Request, res: Response) => {

  try {
    await userServices.register(req.body)
    res.status(200).send("User created");

  } catch (err) {
    res.status(400).send("Username already exists.")
  }
};

// Login controller
const login = async (req: Request, res: Response) => {

  try {
   const foundUser = await userServices.login(req.body)

  } catch (error) {
    console.error(error);
    res.status(500).send(`Login failed.`);
  }
};

// Logout user
const logout = (req, res) => {
  global.currentUser = null;
  res.status(200).json({
    message: "Logout successful.",
  });
};

export { createUser, login, logout };
