const jsonwebtoken = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    const header = req.headers.authorization.replace("Bearer ", "");
    if (!header) {
      res.status(401).json({ status: "Unauthorized" });
      return;
    }

    const isVerified = await jsonwebtoken.verify(
      header,
      process.env.JWTSECRETKEY
    );
    if (!isVerified) {
      res.status(401).json({ status: "Unauthorized" });
      return;
    }
    req.user = isVerified;
    next();
  } catch (err) {
    res.status(401).json({ status: "Unauthorized" });
  }
};
module.exports = isAuthenticated;
