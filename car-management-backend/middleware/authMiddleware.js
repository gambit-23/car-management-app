const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // Look for the token in the 'Authorization' header
  const token = req.header("Authorization")?.replace("Bearer ", "");  // Strip "Bearer " prefix

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  // Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
