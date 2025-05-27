import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "not authorized" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // safer to put userId here rather than inside req.body
    req.body.userId = token_decode.id;
    next();
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "auth error" });
  }
};

export default authMiddleware;
