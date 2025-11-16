const jwt = require("jsonwebtoken");

function auth(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "No token" });

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Malformed token" });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // payload has: id, role ('teacher'|'student')
      req.user = payload;
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}

module.exports = auth;
