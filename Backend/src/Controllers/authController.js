import user from "../Model/user.model.js" //
import generateToken from "../utils/generatetokens.js"
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400).json({message: "Please provide all required fields"});
    }
    const userExists = await user.findOne({email});
    if(userExists){
        res.status(400).json({message: "User already exists"});
    }
    const user =await user.create({
        name,
        email,
        password
    })
    return res.status(200).json({
        message: "User registered successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await user.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({message: "Invalid credentials"});
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    }
    return res.status(200).json({
        message: "User logged in successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
}
export const getMe = async (req, res) => {
    return res.status(200).json( req.user);
}