// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// import Drink middlewares
const drinkMiddlewares = require("../middlewares/drinkMiddlewares")

//import Drink controllers
const drinkControllers = require("../controllers/drinkController")

// get all drink
router.get("/devcamp-pizza365/drink",drinkMiddlewares.getAllDrinkMiddlewares,drinkControllers.getAllDrink)
// create drink
router.post("/devcamp-pizza365/drink",drinkMiddlewares.createDrinkMiddlewares,drinkControllers.createDrink)

// Get detail by Id Drink
router.get("/devcamp-pizza365/drink/:drinkId",drinkMiddlewares.getDentailDrinkMiddlewares,drinkControllers.getDrinkById)

// update drink
router.put("/devcamp-pizza365/drink/:drinkId",drinkMiddlewares.updateDrinkMiddlewares,drinkControllers.updateDrinkById)

// deleted Dink
router.delete("/devcamp-pizza365/drink/:drinkId",drinkMiddlewares.deletedDrinkMiddlewares,drinkControllers.deletedDrinkOfOrderById)

module.exports = router

