const{Router} = require("express")
const{getTasks,addTasks,updateTasks,deleteTasks} = require("../controllers/TaskControllers")

const router = Router()

router.get("/get",getTasks);
router.post("/add",addTasks);
router.put("/update/:id",updateTasks);
router.delete("/delete/:id",deleteTasks);

module.exports = router;