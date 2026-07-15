import mongoose from "mongoose";
async function connectDB() {  
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
  }
export default connectDB;