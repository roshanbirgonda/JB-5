const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
  console.log(decoded);
  req.user = decoded;
  next();
}
module.exports = verifyToken;
