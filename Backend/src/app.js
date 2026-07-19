import express from 'express';
import cors from 'cors';
import authRouter from './Routes/authroutes.js';
import taskRouter from './Routes/taskRoutes.js'; 

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter); 
app.use("/api/tasks", taskRouter); 

export default app;