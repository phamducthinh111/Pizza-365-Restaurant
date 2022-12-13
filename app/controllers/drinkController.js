// Import thư viện Mongoose
const mongoose = require("mongoose");

// import module  Drink Model
const drinkModel = require("../model/drinkModel");

// import module  Order Model
const orderModel = require("../model/orderModel");


// get all drink
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

// create drink
const createDrink = (request,response) => {
    //b1: Thu thập dữ liệu
    const body = request.body;
    // b2: validate dữ liệu
    // kiểm tra maNuocUong có hợp lệ không
    if(!body.maNuocUong) {
        return response.status(400).json({
            status: "Bad Request",
            message: "maNuocUong không hợp lệ"
        })
    }

    // kiểm tra tenNuocUong có hợp lệ không
    if(!body.tenNuocUong) {
        return response.status(400).json({
            status: "Bad Request",
            message: "tenNuocUong không hợp lệ"
        })
    }

    // kiểm tra dongia có phải là số hay không
    if(isNaN(body.donGia) || body.donGia < 0 ) {
        return response.status(400).json({
            status: "Bad Request",
            message: "donGia không hợp lệ"
        })
    }
    // bước 3:  gọi Model tạo dữ liệu
    const newDrink = {
        _id: mongoose.Types.ObjectId(),
        maNuocUong: body.maNuocUong,
        tenNuocUong: body.tenNuocUong,
        donGia: body.donGia
    }

    drinkModel.create(newDrink, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(201).json({
            status: "Create Drink successfully",
            data: data
        })
    })
   
}


// Get detail by Id Drink
const getDrinkById = (request,response) => {
    // bước 1 : Thu thập dữ liệu
    const drinkId = request.params.drinkId;
    // bước 2: validate dữ liệu
        // kiểm tra Id drink có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(drinkId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "drinkId không hợp lệ"
        })
    }
    // bước 3: Gọi Model tạo dữ liệu
    drinkModel.findById(drinkId, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Get detail Drink successfully",
            data: data
        })
    })
}

// update drink
const updateDrinkById = (request,response) => {
    // B1: Thu thập dữ liệu
    const drinkId = request.params.drinkId;
    const body = request.body;
    
    // B2 : validate dữ liệu
    // kiểm tra Id drink có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(drinkId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "drinkId không hợp lệ"
        })
    }
    console.log(body.maNuocUong)
    // kiểm tra body truyền vào
    if(body.maNuocUong !== undefined && body.maNuocUong.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "maNuocUong không hợp lệ"
        })
    }
    if(body.tenNuocUong !== undefined && body.tenNuocUong.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "tenNuocUong không hợp lệ"
        })
    }

    if(body.donGia !== undefined && (isNaN(body.donGia) || body.donGia < 0 )) {
        return response.status(400).json({
            status: "Bad Request",
            message: "donGia không hợp lệ"
        })
    }

    // bước 3: Gọi model tạo dữ liệu
    // tạo biến chứa data Update
    const updateDrink = {};
    if(body.maNuocUong !== undefined) {
        updateDrink.maNuocUong = body.maNuocUong
    }
    if(body.tenNuocUong !== undefined) {
        updateDrink.tenNuocUong = body.tenNuocUong
    }
    if(body.donGia !== undefined) {
        updateDrink.donGia = body.donGia
    }
    drinkModel.findByIdAndUpdate(drinkId,updateDrink ,(error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Update Drink successfully",
            data: data
        })
    })
}

// deleted Dink
const deletedDrinkOfOrderById = (request,response) => {

    // B1: Thu thập dữ liệu
    const drinkId = request.params.drinkId;
    // B2: Validate dữ liệu
    // kiểm tra Id drink có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(drinkId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "drinkId không hợp lệ"
        })
    }
    // B3: Gọi model hiển thị dữ liệu
    drinkModel.findByIdAndDelete(drinkId,(error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Deleted Drink successfully",
        })
    })
        
}

module.exports = {
    getAllDrink,
    createDrink,
    getDrinkById,
    updateDrinkById,
    deletedDrinkOfOrderById,
}