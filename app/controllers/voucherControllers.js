// Import thư viện Mongoose
const mongoose = require("mongoose");

// import module Voucher Model
const voucherModel = require("../model/voucherModel");

// import module  Order Model
const orderModel = require("../model/orderModel");

// get all voucher
const getAllVoucher = (request,response) => {
    // B1: Thu thập dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    voucherModel.find((error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Create Voucher successfully",
            data: data
        })
    })
    
}

// create voucher
const createVoucher = (request,response) => {
    //b1: Thu thập dữ liệu
    const body = request.body;
    const orderid = request.params.orderid;
    //console.log(body);
    // b2: validate dữ liệu
    // kiểm tra phanTramGiamGia có hợp lệ không
    if(!body.maVoucher) {
        return response.status(400).json({
            status: "Bad Request",
            message: "maVoucher không hợp lệ"
        })
    }

    // kiểm tra phanTramGiamGia có hợp lệ không
    if(!body.phanTramGiamGia) {
        return response.status(400).json({
            status: "Bad Request",
            message: "phanTramGiamGia không hợp lệ"
        })
    }

   
    // bước 3:  gọi Model tạo dữ liệu
    const newVoucher = {
        _id: mongoose.Types.ObjectId(),
        maVoucher: body.maVoucher,
        phanTramGiamGia: body.phanTramGiamGia,
        ghiChu: body.ghiChu
    }

    voucherModel.create(newVoucher, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        // Thêm ID của voucher mới vào đối tượng voucher của Users đã chọn
        orderModel.findByIdAndUpdate(orderid, {
            $push: {
                voucher: data._id
            }
        }, (err,updateOrder) => {
            if (err) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: err.message
                })
            }

            return response.status(201).json({
                status: "Create Voucher successfully",
                data: data
            })
        })    
    }) 
}
// Get Voucher of Order
const getVoucherDentailOfOrder = (request,response) => {
    // b1: thu thập dữ liệu
    const orderid = request.params.orderid;
    // b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "OrderID không hợp lệ"
        })
    }
    // bước 3:  gọi Model tạo dữ liệu
    orderModel.findById(orderid)
        .populate("voucher")
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }

            return response.status(200).json({
                status: "Get Voucher of Order successfully",
                data: data
            })
        })
}


// Get detail by Id Voucher
const getVoucherById = (request,response) => {
    // bước 1 : Thu thập dữ liệu
    const voucherId = request.params.voucherId;
    // bước 2: validate dữ liệu
        // kiểm tra Id Voucher có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherId không hợp lệ"
        })
    }
    // bước 3: Gọi Model tạo dữ liệu
    voucherModel.findById(voucherId, (error, data) => {
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

// update Voucher
const updateVoucherById = (request,response) => {
    // B1: Thu thập dữ liệu
    const voucherId = request.params.voucherId;
    const body = request.body;
    
    // B2 : validate dữ liệu
    // kiểm tra Id Voucher có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherId không hợp lệ"
        })
    }
    // kiểm tra body truyền vào
    if(body.maVoucher !== undefined && body.maVoucher.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "maVoucher không hợp lệ"
        })
    }
    if(body.phanTramGiamGia !== undefined && body.phanTramGiamGia.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "phanTramGiamGia không hợp lệ"
        })
    }


    // bước 3: Gọi model tạo dữ liệu
    // tạo biến chứa data Update
    const updateVoucher = {};
    if(body.maVoucher !== undefined) {
        updateVoucher.maVoucher = body.maVoucher
    }
    if(body.phanTramGiamGia !== undefined) {
        updateVoucher.phanTramGiamGia = body.phanTramGiamGia
    }
    voucherModel.findByIdAndUpdate(voucherId,updateVoucher ,(error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Update Voucher successfully",
            data: data
        })
    })
}

// deleted Voucher
const deletedVoucherById = (request,response) => {
    // B1: Thu thập dữ liệu
    const voucherId = request.params.voucherId;
    const orderid = request.params.orderid;
    // B2: Validate dữ liệu
    // kiểm tra Id drink có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherId không hợp lệ"
        })
    }
    // kiểm tra Id order có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(orderid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "OrderID không hợp lệ"
        })
    }
    // B3: Gọi model hiển thị dữ liệu
    voucherModel.findByIdAndDelete(voucherId,(error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        // Sau khi xóa xong 1 Drink khỏi collection cần xóa thêm drinkId trong Order đang chứa nó
        orderModel.findByIdAndUpdate(orderid, {
            $pull: { voucher : voucherId}
        }, (err,updateOrder) => {
            if (err) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: err.message
                })
            }

            return response.status(201).json({
                status: "Deleted Voucher successfully",
            })
        })
        
    })
}


module.exports = {
    getAllVoucher,
    createVoucher,
    getVoucherById,
    updateVoucherById,
    deletedVoucherById,
    getVoucherDentailOfOrder
}