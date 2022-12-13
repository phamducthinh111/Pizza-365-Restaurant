// khai báo thư viện express
const express = require("express");

// khai báo router app
const router = express.Router();

// import order Middlewares
const orderMiddlewares = require("../middlewares/orderMiddlewares")

// import order Controllers
const orderControllers = require("../controllers/orderControllers")

router.get("/order",orderMiddlewares.getAllorder, orderControllers.getAllOrder)

router.get("/order/:orderid", orderMiddlewares.getDetailorder, orderControllers.getOderById)

router.get("/users/:usersid/order", orderMiddlewares.getAllorder, orderControllers.getAllOrderOfUser) 

router.post("/users/:usersid/order",orderMiddlewares.createAllorder, orderControllers.createOrderOfUser) 

router.put("/order/:orderid", orderMiddlewares.updatetAllorder,orderControllers.updateOrderById) 

router.delete("/users/:usersid/order/:orderid", orderMiddlewares.deleteAllorder, orderControllers.deletedOrderOfUserById) 

router.delete("/order/:orderid", orderMiddlewares.deleteAllorder, orderControllers.deleteOrderById) 

module.exports = router