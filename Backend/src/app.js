import express from 'express';
import router from './Routes/authroutes.js';
// const router = express.Router()
const app = express();
app.use(express.json());
app.use("/api", router);
export default app;