const { request, response } = require("express");

const getAllusers = (request,response, next) => {
    console.log("GET tất cả danh sách Users");
    next()
}

const getDetailusers = (request,response, next) => {
    console.log("GET Users phù hợp dựa vào usersID");
    next()
}

const createAllusers = (request,response, next) => {
    console.log("Create một list Users mới");
    next()
}

const updatetAllusers = (request,response, next) => {
    console.log("Update Users dựa vào usersID");
    next()
}

const deleteAllusers = (request,response, next) => {
    console.log("Delete Users dựa vào usersID");
    next()
}
module.exports = {
    getAllusers,
    getDetailusers,
    createAllusers,
    updatetAllusers,
    deleteAllusers
}