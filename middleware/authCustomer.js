// Middleware to be used in routes to check if user is authenticated
const authCustomer = (req, res, next) => {
  if (global.currentUser) {
    req.user = global.currentUser;
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized request, please login.",
      status: 401,
    });
  }
};

export default authCustomer;
