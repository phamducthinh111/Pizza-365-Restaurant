const { request, response } = require("express");

const getAllorder = (request,response, next) => {
    console.log("GET tất cả danh sách order");
    next()
}

const getDetailorder = (request,response, next) => {
    console.log("GET order phù hợp dựa vào orderID");
    next()
}

const createAllorder = (request,response, next) => {
    console.log("Create một list order mới");
    next()
}

const updatetAllorder = (request,response, next) => {
    console.log("Update order dựa vào orderID");
    next()
}

const deleteAllorder = (request,response, next) => {
    console.log("Delete order dựa vào orderID");
    next()
}
module.exports = {
    getAllorder,
    getDetailorder,
    createAllorder,
    updatetAllorder,
    deleteAllorder
}