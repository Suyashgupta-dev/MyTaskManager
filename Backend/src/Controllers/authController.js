// import User from "../Model/user.model.js";
// import generateToken from "../utils/generatetokens.js"
// export const registerUser = async (req, res) => {
//     const { name, email, password } = req.body;

//     if(!name || !email || !password){
//         return  res.status(400).json({message: "Please provide all required fields"});
//     }
//     const userExists = await user.findOne({email});
//     if(userExists){
//         res.status(400).json({message: "User already exists"});
//     }
//     const user =await user.create({
//         name,
//         email,
//         password
//     })
//     return res.status(200).json({
//         message: "User registered successfully",
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id)
//     })
// }

// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;
    
//     const user = await user.findOne({email}).select("+password");
//     if(!user){
//         return res.status(404).json({message: "Invalid credentials"});
//     }
//     const isMatch = await user.matchPassword(password);
//     if(!isMatch){
//         return res.status(400).json({message: "Invalid credentials"});
//     }
//     return res.status(200).json({
//         message: "User logged in successfully",
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id)
//     })
// }
// export const getMe = async (req, res) => {
//     return res.status(200).json( req.user);
// }


import User from "../Model/user.model.js"; // Hamein yahan U capital rakhna hai
import generateToken from "../utils/generatetokens.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Agar koi field missing hai toh return lagana zaroori hai
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    
    // 2. Model call (User) aur object name alag hona chahiye
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    // 3. Yahan 'const user' aur 'user.create' same name hone se crash ho raha tha
    // Isliye variable ka naam 'newUser' rakh diya hai
    const newUser = await User.create({
        name,
        email,
        password
    });
    
    return res.status(201).json({
        message: "User registered successfully",
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id)
    });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const foundUser = await User.findOne({ email }).select("+password");
    if (!foundUser) {
        return res.status(404).json({ message: "Invalid credentials" });
    }
    
    const isMatch = await foundUser.matchPassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    
    return res.status(200).json({
        message: "User logged in successfully",
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        token: generateToken(foundUser._id)
    });
};

export const getMe = async (req, res) => {
    return res.status(200).json(req.user);
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            return res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                token: generateToken(updatedUser._id)
            });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error updating profile details" });
    }
};