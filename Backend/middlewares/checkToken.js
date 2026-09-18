import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err) => {
    if (err) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

export default checkToken;
