import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({

    name :{
        type: String,
        required: [true, "Please provide a name"],
        trim: true
    },
    email :{
        type: String,
        required: [true, "Please provide an email"],    
        unique: true,
        trim: true,
        lowercase: true
    },
    password :{
        type: String,
        required: [true, "Please provide a password"],  
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    }
})
userSchema.pre("save", async function() {
    if(!this.isModified("password")){
        return next();
    } 
    const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    

})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};  

const userModel = mongoose.model("User", userSchema);
export default userModel;