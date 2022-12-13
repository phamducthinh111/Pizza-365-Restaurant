// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

const pizza365Controller = require("../controllers/pizza365Apicontroller")

router.post("/devcamp-pizza365/orders",pizza365Controller.createOrdersPizza)
// get all drink
router.get("/devcamp-pizza365/drinks",pizza365Controller.getAllDrink)
// get all order
router.get("/devcamp-pizza365/orders",pizza365Controller.getAllOrder)
// get order by Id
router.get("/devcamp-pizza365/orders/:orderid", pizza365Controller.getOderById)
// update order by Id
router.put("/devcamp-pizza365/orders/:orderid", pizza365Controller.updateOrderById)
// get voucher by Id
router.get("/devcamp-pizza365/voucher_detail/:maVoucher", pizza365Controller.getVoucherByMaVoucher)


module.exports = router