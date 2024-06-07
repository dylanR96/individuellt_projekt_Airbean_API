import db from "../../db/database.js";

const loginAdmin = async (req, res) => {
  // Validates users input
  const { error } = userSchema.validate(req.body);
  // Checks if validation fails
  if (error) return res.status(400).send(error.details[0].message);

  // Get username and password from request body
  const { username, password } = req.body;

  try {
    // Get information about user from database
    const user = await db.users.findOne({ username });

    // Checks if user doesn't exist in database
    if (!user)
      return res.status(401).json({
        message: `Incorrect username or password.`,
      });

    // Compares password with hashed password in database
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: `Incorrect username or password.`,
      });
    }

    // Checks if user exists in database and password is correct
    global.currentUser = { id: user._id, username: user.username };

    // Checks if user already exists in database
    res.status(200).json({
      message: `Login successful. Logged in user: ${username}. Id: ${user._id}.`,
    });
  } catch (error) {
    // Logging error message in console
    console.error(error);
    res.status(500).send(`Login failed.`);
  }
};

export default loginAdmin;
