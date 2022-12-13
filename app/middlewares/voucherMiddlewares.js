const { request, response } = require("express");

const getAllVoucher = (request,response, next) => {
    console.log("GET tất cả danh sách Voucher");
    next()
}

const getDetailVoucher = (request,response, next) => {
    console.log("GET Voucher phù hợp dựa vào VoucherID");
    next()
}

const createAllVoucher = (request,response, next) => {
    console.log("Create một list Voucher mới");
    next()
}

const updatetAllVoucher = (request,response, next) => {
    console.log("Update Voucher dựa vào VoucherID");
    next()
}

const deleteAllVoucher = (request,response, next) => {
    console.log("Delete Voucher dựa vào VoucherID");
    next()
}
module.exports = {
    getAllVoucher,
    getDetailVoucher,
    createAllVoucher,
    updatetAllVoucher,
    deleteAllVoucher
}