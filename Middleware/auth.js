import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";

export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) return res.status(401).json({ message: "User not authenticated" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};
