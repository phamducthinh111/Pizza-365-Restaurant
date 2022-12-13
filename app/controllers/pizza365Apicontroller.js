// Import thư viện Mongoose
const { request, response } = require("express");
const mongoose = require("mongoose");

// import module  Drink Model
const drinkModel = require("../model/drinkModel");
// import module  Order Model
const orderModel = require("../model/orderModel");
// import module  Users Model
const usersModel = require("../model/userModel");
// import module Voucher Model
const voucherModel = require("../model/voucherModel");


const createOrdersPizza = (request,response) => {
    // B1: Chuẩn bị dữ liệu
    const body = request.body;
    //console.log(body)
    // bước 2: validater dữ liệu
    
    /*if(!body.kichCo) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Kích cỡ không hợp lệ"
        })
    } */
    if(!body.loaiPizza) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Loại pizza không hợp lệ"
        })
    }

    if(!body.loaiNuocUong ) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Loại nước uống không hợp lệ"
        })
    }
    
    if(!body.hoVaTen ) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Họ và tên không hợp lệ"
        })
    }
    if(!body.email ) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Email không hợp lệ"
        })
    }
    // kiểm tra sdt có phải là số hay không
    if(isNaN(body.dienThoai) || !body.dienThoai) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Số điện thoại không hợp lệ"
        })
    }
    if(!body.diaChi ) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Địa chỉ không hợp lệ"
        })
    }

    // tìm  mã nước uống phù hơp
    let idDrink = "";
    drinkModel.findOne({
        maNuocUong: body.loaiNuocUong
    },(errorDrink, dataDrink) => {
        if(dataDrink) {
            idDrink = dataDrink._id
        }
    })
    
    // tìm mã voucher phù hợp
    let idVoucher = "";
    voucherModel.findOne({
            maVoucher: body.voucher
        },(errorVoucher, dataVoucher) => {
            if(dataVoucher) {
                idVoucher = dataVoucher._id
            }
        })
  
    usersModel.findOne({
        email: body.email
    })
        .exec((errorFindUser, userExist) => {
            if (errorFindUser) {
                return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: errorFindUser.message
                })
            }
            else {
                if(!userExist) {
                    // Nếu user không tồn tại trong hệ thống
                    // Tạo user mới
                    usersModel.create({
                        _id: mongoose.Types.ObjectId(),
                        fullName : body.hoVaTen,
                        email: body.email,
                        address: body.diaChi,
                        phone: body.dienThoai
                    },(errCreateUser, userCreated) => {
                        if(errCreateUser) {
                            return response.status(500).json({
                                status: "Error 500: Internal server error",
                                message: errCreateUser.message
                            })
                        }
                                   
                        else {
                            // tạo 1 order mới
                            
                            const newOrder = {
                                pizzaSize: body.kichCo,
                                pizzaType: body.loaiPizza,
                                status: "open"
                            }
                            if(idVoucher) {
                                newOrder.voucher = idVoucher
                            }
                            if(idDrink) {
                                newOrder.drink = idDrink
                            }
                            orderModel.create(newOrder,
                                (errorCreateOrder,dataCreateOrder) => {
                                    if(errorCreateOrder) {
                                        if (errorCreateOrder) {
                                            return response.status(500).json({
                                                status: "Error 500: Internal server error",
                                                message: errorCreateOrder.message
                                            })
                                        }                                        
                                    }
                                     // Thêm ID của order mới vào mảng order của Users đã chọn
                                    usersModel.findByIdAndUpdate(userCreated._id, {
                                        $push: {
                                            order: dataCreateOrder._id
                                        },
                                    }, (errUpdateUser, dataUpdateUser) => {
                                        if (errUpdateUser) {
                                            return response.status(500).json({
                                                status: "Internal server error",
                                                message: errUpdateUser.message
                                            })
                                        }
                                    })
                                    return response.status(201).json({
                                        status: "Create Order of User Successfully",
                                        order: dataCreateOrder,
                                    })                         
                                })
                        }   
                     
                    })
                }
                else {
                    //Nếu user đã tồn tại trong hệ thống, lấy id của user đó để tạo Order
                    // tạo 1 order mới                   
                    const newOrder = {
                        pizzaSize: body.kichCo,
                        pizzaType: body.loaiPizza,
                        status: "open"
                    }
                    if(idVoucher) {
                        newOrder.voucher = idVoucher
                    }
                    if(idDrink) {
                        newOrder.drink = idDrink
                    }
                    orderModel.create(newOrder,
                        (errorCreateOrder,dataCreateOrder) => {
                            if(errorCreateOrder) {
                                if (errorCreateOrder) {
                                    return response.status(500).json({
                                        status: "Error 500: Internal server error",
                                        message: errorCreateOrder.message
                                    })
                                }                                         
                            }
                            // Thêm ID của order mới vào mảng order của Users đã chọn
                            usersModel.findByIdAndUpdate(userExist._id, {
                                $push: {
                                    order: dataCreateOrder._id
                                },
                            }, (errUpdateUser, dataUpdateUser) => {
                                if (errUpdateUser) {
                                    return response.status(500).json({
                                        status: "Internal server error",
                                        message: errUpdateUser.message
                                    })
                                }
                            })      
                            return response.status(201).json({
                                status: "Create Order of User Successfully",
                                order: dataCreateOrder,
                            })                         
                        })
                }
            }
        })
}

const getAllDrink = (request,response) => {
    // B1: Thu thập dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    drinkModel.find((error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Get all Drink successfully",
            data: data
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
    if(body.pizzaType !== undefined && body.pizzaType.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "Type Pizza không hợp lệ"
        })
    }
    if(body.status !== undefined && body.status.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "status không hợp lệ"
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
    if(body.status !== undefined) {
        updateOrder.status = body.status
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

// Get detail by maVoucher Voucher
const getVoucherByMaVoucher = (request,response) => {
    // bước 1 : Thu thập dữ liệu
    const maVoucher = request.params.maVoucher;
    // bước 2: validate dữ liệu
        // kiểm tra Id Voucher có hợp lệ không

    // bước 3: Gọi Model tạo dữ liệu
    voucherModel.findOne(
        {maVoucher: maVoucher}, 
        (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Get detail Voucher successfully",
            data: data
        })
    })
}


module.exports = {
    createOrdersPizza,
    getAllDrink,
    getAllOrder,
    updateOrderById,
    getOderById,
    getVoucherByMaVoucher
}
