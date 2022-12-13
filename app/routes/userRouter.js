// khai báo thư viện express
const express = require("express");

// khai báo router app
const router = express.Router();

// import users Middlewares

const usersMiddlewares = require("../middlewares/userMiddlewares");

//import users controllers
const usersControllers = require("../controllers/userController");

router.get("/users",usersMiddlewares.getAllusers, usersControllers.getAllUsers ) 

router.get("/users/:usersid", usersMiddlewares.getDetailusers, usersControllers.getDentalUserById) 

router.post("/users",usersMiddlewares.createAllusers, usersControllers.createUsers) 

router.put("/users/:usersid", usersMiddlewares.updatetAllusers, usersControllers.updateUsers) 

router.delete("/users/:usersid", usersMiddlewares.deleteAllusers, usersControllers.deleteUsers) 


// get limit user
router.get("/limit-users",usersMiddlewares.getAllusers, usersControllers.getAllUsersLimit)
// get skip user
router.get("/skip-users",usersMiddlewares.getAllusers, usersControllers.getAllUserSkip)
// get skip user
router.get("/skip-limit-users",usersMiddlewares.getAllusers, usersControllers.getAllUserSkipLimit)
// get limit user
router.get("/sort-users",usersMiddlewares.getAllusers, usersControllers.getAllUsersSort)
// get skip user
router.get("/sort-skip-limit-users",usersMiddlewares.getAllusers, usersControllers.getAllSortUserSkipLimit)






module.exports = router