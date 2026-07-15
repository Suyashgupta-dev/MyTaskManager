import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title :{
        type: String,
        required: [true, "Please provide a title"],
        
    },
    description :{
        type: String,
        required: [true, "Please provide a description"],
    },
    duedate :{
        type: Date,
        
    }, 
    priority :{
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    category :{
        type: String,
        enum: ["work", "personal", "shopping", "others"],   
        default: "others"
    },
    status :{
        type: String,
        enum: ["TO-DO", "in progress", "completed"],
        default: "TO-DO"
    },
    completed   :{
        type: Boolean,
        default: false
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})
const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;
