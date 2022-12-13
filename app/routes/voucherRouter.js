// khai báo thư viện express
const express = require("express");

// khai báo router app
const router = express.Router();

// import voucher Middlewares
const voucherMiddlewares = require("../middlewares/voucherMiddlewares");

// import voucher controllers
const voucherControllers = require("../controllers/voucherControllers");

router.get("/voucher",voucherMiddlewares.getAllVoucher,voucherControllers.getAllVoucher)

router.get("/voucher/:voucherId", voucherMiddlewares.getDetailVoucher,voucherControllers.getVoucherById) 

router.get("/order/:orderid/voucher", voucherMiddlewares.getDetailVoucher,voucherControllers.getVoucherDentailOfOrder) 

router.post("/order/:orderid/voucher",voucherMiddlewares.createAllVoucher,voucherControllers.createVoucher) 

router.put("/voucher/:voucherId", voucherMiddlewares.updatetAllVoucher,voucherControllers.updateVoucherById) 

router.delete("/order/:orderid/voucher/:voucherId", voucherMiddlewares.deleteAllVoucher,voucherControllers.deletedVoucherById) 

module.exports = router