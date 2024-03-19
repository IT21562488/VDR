const { request } = require("express")
const TaskModel = require("../models/TaskModel")


//get method

module.exports.getTasks = async(req,res)=>{
    const task = await TaskModel.find()
    res.send(task)
// res.send("Hii")
}

//post(add) method

module.exports.addTasks = (req,res)=>{

    const {task} = req.body

    TaskModel.create({task})
    .then((data)=>{
            console.log("Saved Successfully!!")
            res.status(201).send(data)
    }).catch((err)=>{
        console.log((err))
        res.send({error: err,msg:"something went wrong!!"})
    })

}

//put(update) method

module.exports.updateTasks = (req,res)=>{
    const {id} =req.params
    const {task} = req.body

    TaskModel.findByIdAndUpdate(id,{task})
    .then((data)=>res.send("Updated Successfully!!"))
    .catch((err)=>{
        console.log((err))
        res.send({error: err,msg:"something went wrong!!"})
    })

}

//delete method

module.exports.deleteTasks = (req,res)=>{
    const {id} =req.params

    TaskModel.findByIdAndDelete(id)
    .then((data)=>res.send("Deleted Successfully!!"))
    .catch((err)=>{
        console.log((err))
        res.send({error: err,msg:"something went wrong!!"})
    })

}