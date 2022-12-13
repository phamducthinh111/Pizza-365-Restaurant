// Import thư viện Mongoose
const mongoose = require("mongoose");

// import module  Order Model
const orderModel = require("../model/orderModel");

// import module User model
const usersModel = require("../model/userModel");

// import module drink model
const drinkModel = require("../model/drinkModel");

// import module Voucher Model
const voucherModel = require("../model/voucherModel");


// create Order of User
const createOrderOfUser = (request,response) => {
    // b1: Cb dữ liệu
    const usersid = request.params.usersid;
    const body = request.body
    //console.log(body)
    // b2: validate dữ liệu
        // kiểm tra Id users có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(usersid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Users Id không hợp lệ"
        })
    }
        // kiểm tra obj body
    if(!body.pizzaSize) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Size Pizza không hợp lệ"
        })
    }

    if(!body.pizzaType) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Type Pizza không hợp lệ"
        })
    }
    // B3: gọi Model tạo dữ liệu
    const newOrder = {
        _id: mongoose.Types.ObjectId(),
        pizzaSize: body.pizzaSize,
        pizzaType: body.pizzaType,
        status: "open"
    }
    orderModel.create(newOrder, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        // Thêm ID của order mới vào mảng order của Users đã chọn
        usersModel.findByIdAndUpdate(usersid, {
            $push: {
                order: data._id
            }
        }, (err, updateUser) =>{
            if (err) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: err.message
                })
            }
            return response.status(201).json({
                status: "Create Order Successfully",
                data: data
            })
        })
    })
}
// Get all Order
const getAllOrder = (request,response) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    orderModel.find((error,data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(200).json({
            status: "Get all Order successfully",
            data: data
        })
    })
}
// Get Order by Id
const getOderById = (request,response) => {
    // B1: Chuẩn bị dữ liệu
    const orderid = request.params.orderid;
    // B2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "OrderID không hợp lệ"
        })
    }
    //B3: gọi model tạo dữu liệu
    orderModel.findById(orderid, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(200).json({
            status: "Get Order dentail By ID successfully",
            data: data
        })
    })
}
// Get all Order of User
const getAllOrderOfUser = (request,response) => {
    // b1: thu thập dữ liệu
    const usersid = request.params.usersid;
    // b2: validate dữ liệu
        // kiểm tra Id users có hợp lệ không
        if(!mongoose.Types.ObjectId.isValid(usersid)) {
            return response.status(400).json({
                status: "Bad Request",
                message: "Users Id không hợp lệ"
            })
        }
    // b3: gọi model tạo dữ liệu
    usersModel.findById(usersid)
        .populate("order")
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
            
            return response.status(200).json({
                status: "Get all Orders of User successfully",
                data: data
            })
        })
}
// Update Order by Id
const updateOrderById = (request,response) => {
    // B1: Chuẩn bị dữ liệu
    const orderid = request.params.orderid;
    const body = request.body
    // B2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "OrderID không hợp lệ"
        })
    }
    // validate obj body
    if(body.pizzaSize !== undefined && body.pizzaSize.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "Size Pizza không hợp lệ"
        })
    }

    if(body.pizzaType !== undefined && body.pizzaType.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "Type Pizza không hợp lệ"
        })
    }
    // B3: Gọi model tạo dữ liệu
    const updateOrder = {};

    if(body.pizzaSize !== undefined) {
        updateOrder.pizzaSize = body.pizzaSize
    }
    if(body.pizzaType !== undefined) {
        updateOrder.pizzaType = body.pizzaType
    }
    orderModel.findByIdAndUpdate(orderid,updateOrder ,( error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        return response.status(200).json({
            status: "Update orders successfully",
            data: data
        })
    })
}
// Delete Order of User by Id
const deletedOrderOfUserById = (request,response) =>  {
    //B1: thu thập dữu liệu
    const orderid = request.params.orderid;
    const usersid = request.params.usersid;
    // B2: validate dữ liệu
    // kiểm tra Id users có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(usersid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Users Id không hợp lệ"
        })
    }
    // kiểm tra Id Order có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(orderid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "OrderID không hợp lệ"
        })
    }
    // B3: thao tác với dữu liệu
    orderModel.findByIdAndDelete(orderid, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        // Sau khi xóa xong 1 Order khỏi collection cần xóa thêm OrderID trong Users đang chứa nó
        usersModel.findByIdAndUpdate(usersid, {
            $pull: { order : orderid}
        }, (err, updateUser) => {
            if (err) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: err.message
                })
            }

            return response.status(204).json({
                status: "Delete Order of User successfully"
            })
        })
    })
}
// deleted order by id
const deleteOrderById = (request,response) => {
    //B1: thu thập dữu liệu
    const orderid = request.params.orderid;
    // B2: validate dữ liệu
    // kiểm tra Id Order có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(orderid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "OrderID không hợp lệ"
        })
    }
    // B3: thao tác với dữu liệu
    orderModel.findByIdAndDelete(orderid, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Deleted orders successfully",
        })
    })
}


module.exports = {
    createOrderOfUser,
    getAllOrder,
    getOderById,
    getAllOrderOfUser,
    updateOrderById,
    deletedOrderOfUserById,
    deleteOrderById
}
