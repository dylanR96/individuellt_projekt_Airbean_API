// Middleware to be used in routes to check if user is authenticated
const authAdmin = (req, res, next) => {
  if (global.admin) {
    req.user = global.admin;
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized request, please login.",
      status: 401,
    });
  }
};

export default authAdmin;
