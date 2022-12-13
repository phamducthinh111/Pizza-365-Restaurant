

// get all drink
const getAllDrinkMiddlewares = (request,response, next) => {
    console.log("Get ALL Drink Middleware");
    next();
}
// create drink
const createDrinkMiddlewares = (request,response, next) => {
    console.log("Create Drink Middleware");
    next();
}
// Get detail by Id Drink
const getDentailDrinkMiddlewares = (request,response, next) => {
    console.log("Get detail Drink Middleware");
    next();
}
// update drink 
const updateDrinkMiddlewares = (request,response, next) => {
    console.log("Update Drink Middleware");
    next();
}
// deleted Dink
const deletedDrinkMiddlewares = (request,response, next) => {
    console.log("Deleted Drink Middleware");
    next();
}

module.exports = {
    getAllDrinkMiddlewares,
    createDrinkMiddlewares,
    getDentailDrinkMiddlewares,
    updateDrinkMiddlewares,
    deletedDrinkMiddlewares,
}