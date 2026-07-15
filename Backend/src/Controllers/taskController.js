import task from "../Model/task.model.js"
export const findOwnedTask = async (taskId, userId, res) => {
    const task = await Task.findById(taskId);

    if(!task){
        return res.status(404)
        throw new Error("Task not found")
    }
    if (task.user.toString()!==userId){
        return res.status(403)
        throw new Error("not autheenticated ")
    }
    return task
}
export const createTask = asyncHandler( async(req , res)=>{
    const {title, description, dueDate, priority, category, status}=req.body; 
   const taskCreated = await task.create({
    title, 
    description, 
    priority, category, status,
    user: req.user.id
   })
   res.json(task)

})
export const getTasks = asyncHandler( async(req,res)=>{
    const {status, priority, search, sort}=req.body
    const query ={user:req.user.id};

    if(status)query.status=status;
    if (priority)query.priority=priority;
    if (search)query.title={$regex:search, $options:"i"}

    let sortBy="-createdAt";
    if(sort ==="oldest") sortBy="createdAt";
    if(sort==="dueDate") sortBy="dueDate";
    if(sort==="priority") sortBy="priority"

    const tasks=await Task.find(query).sort(sortBy)
    res.status(200).json({
        task
    })

})
export const getTask=asyncHandler(async(req,res)=>{
    const task= await findOwnedTask(req.params.id, req.user.id, res)
    res.status(200).json({
        task
    })
})
export const updateTask=asyncHandler(async(req,res)=>{
    await findOwnedTask(req.params.id, req.user.id, res)
    const task = Task.findByIdAndUpdate(req.params.id, req.body, {
        new :true,
        runValidators:true
    })
    res.status(200).json({
        task
    })
})
export const deleteTask=asyncHandler(async(req,res)=>{
    const task= await findOwnedTask(req.params.id, req.user.id, res)
    await task.deleteOne()
    res.status(200).json({
        message:"task deleted"
    })
})

export const toggleTask=asyncHandler(async(req,res)=>{
    const task= await findOwnedTask(req.params.id, req.user.id, res)
    task.completed=!task.completed;
    task.status=task.completed?"Done":"to-do";
    await task.save()
    res.status(200).json({
        message:"task toggled",
        task
    })
})

export const getStats=asyncHandler(async(req,res)=>{
    const userId = req.user.id
    const total=Task.countDocuments({user:userId});
    const completed=Task.countDocuments({user:userId, completed:true});
    const pending=total-completed
    const overdue=await Task.countDocuments(
        {user:userId, completed:False ,dueDate:{$lt:new Date()}}
    )
    res.status(200).json({
        total, completed, pending, overdue
    })
})