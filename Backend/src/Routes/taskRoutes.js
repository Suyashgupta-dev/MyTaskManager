import express from "express";
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    toggleTask,
    getStats
} from "../Controllers/taskController.js"; 
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.route("/")
    .post(createTask)
    .get(getTasks);

router.get("/stats", getStats);

router.route("/:id")
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

router.patch("/:id/toggle", toggleTask);

export default router;