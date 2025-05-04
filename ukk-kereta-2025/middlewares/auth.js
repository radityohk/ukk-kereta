const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (roles = []) => (req, res, next) => {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: "Token missing" });
  const token = h.split(" ")[1];
  try {
    const dec = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.length && !roles.includes(dec.role))
      return res.status(403).json({ error: "Forbidden" });
    req.user = dec;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
