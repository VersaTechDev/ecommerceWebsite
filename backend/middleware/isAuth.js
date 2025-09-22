import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("Cookie token:", token); // 👀 see what arrives

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.log("isAuth error", error);
    return res.status(500).json({ message: `isAuth error ${error.message}` });
  }
};

export default isAuth;
