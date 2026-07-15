import jwt from 'jsonwebtoken';
import user from "../Model/user.model.js"
const protect =async (req,res,next)=>{
    let token;

    if(req.headers.authorization?.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await user.findById(decode.id).select("-password");
            
            if (!req.user) {
                return res.status(400).json({
                     message: "invalid token" });
            }
            next();
        } catch (error) {
           console.log(error);
        }
    }
     else {
        return res.json({ message: "Not authorized" });
    }
}

export default protect;

