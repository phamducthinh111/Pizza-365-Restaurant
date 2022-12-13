// Import thư viện Mongoose
const { request, response } = require("express");
const mongoose = require("mongoose");


// import module  Users Model
const usersModel = require("../model/userModel");

// create Users
const createUsers = (request,response) => {
    // bước 1: Thu thập dữ liệu
    const body = request.body;
    //console.log(body)
    // bước 2: validater dữ liệu
    if(!body.fullName) {
        return response.status(400).json({
            status: "Bad Request",
            message: "fullName không hợp lệ"
        })
    }
    if(!body.email) {
        return response.status(400).json({
            status: "Bad Request",
            message: "email không hợp lệ"
        })
    }
    if(!body.address ) {
        return response.status(400).json({
            status: "Bad Request",
            message: "address không hợp lệ"
        })
    }
    // kiểm tra sdt có phải là số hay không
    if(isNaN(body.phone)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Số điện thoại không hợp lệ"
        })
    }
    // bước 3: gọi Model tạo dữ liệu
    const newUsers = {
        _id: mongoose.Types.ObjectId(),
        fullName : body.fullName,
        email: body.email,
        address: body.address,
        phone: body.phone
    }
    usersModel.create(newUsers, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })   
        }
        return response.status(201).json({
            status: "Create Users successfully",
            data: data
        })
    })
}
// get All Users
const getAllUsers = (request,response) => {
    // B1: Thu thập dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    usersModel.find((error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Get all User successfully",
            data: data
        })
    })
}
// get User by Id 

const getDentalUserById = (request,response) => {
    // bước 1: thu thập dữ liệu
    const usersid = request.params.usersid;
    // bước 2: validate dữ liệu
        // kiểm tra Id drink có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(usersid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "drinkId không hợp lệ"
        })
    }
    // bước 3: gọi Model tạo dữ liệu
    usersModel.findById(usersid, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(201).json({
            status: "Get dentail User  successfully",
            data: data
        })
    })
}

// update User by Id
const updateUsers = (request,response) => {
    // bước 1 thu thập dữ liệu
    const usersid = request.params.usersid;
    body = request.body
    //console.log(body.fullName)
    // B2: validate dữ liệu
        // kiểm tra Id drink có hợp lệ không
    if(!mongoose.Types.ObjectId.isValid(usersid)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "drinkId không hợp lệ"
        })
    }
        // kiểm tra obj body
    if(body.fullName !== undefined && body.fullName.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "fullName không hợp lệ"
        })
    }

    if(body.email !== undefined && body.email.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "Email không hợp lệ"
        })
    }

    if(body.address !== undefined && body.address.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "Address không hợp lệ"
        })
    }
    if(body.phone !== undefined && isNaN(body.phone)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Số điện thoại không hợp lệ"
        })
    }
    // bước 3: gọi model tạo dữ liệu
    updateUser = {};
    if(body.fullName !== undefined) {
        updateUser.fullName = body.fullName
    }

    if(body.email !== undefined) {
        updateUser.email = body.email 
    }

    if(body.address !== undefined) {
        updateUser.address = body.address 
    }

    if(body.phone !== undefined) {
        updateUser.phone = body.phone
    }
    usersModel.findByIdAndUpdate(usersid, updateUser, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(201).json({
            status: "Update User successfully",
            data: data
        })
    })
}

// delete User by Id
const deleteUsers = (request,response) => {
    // B1: thu thập dữ liệu
    const usersid = request.params.usersid;
    // B2: validate dữ liệu
        // kiểm tra Id drink có hợp lệ không
        if(!mongoose.Types.ObjectId.isValid(usersid)) {
            return response.status(400).json({
                status: "Bad Request",
                message: "drinkId không hợp lệ"
            })
        }
    // B3: gọi Model tạo dữ liệu
    usersModel.findByIdAndDelete(usersid, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(201).json({
            status: "Deleted User  successfully",
        })
    })
}

// get limit user
const getAllUsersLimit = (request,response) => {
    // B1: thu thập dữ liệu
    limitUser = request.query.limit
    // B2; validate dữ liệu
    if(isNaN(limitUser)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "limit truyền vào không hợp lệ"
        })
    }
    // b3: gọi model truyền dữ liệu

    // nếu limit không có giá trị thì response sẽ trả về toàn bộ user
    if(limitUser == "") {
        usersModel.find((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
    
            return response.status(201).json({
                status: "Get all User successfully",
                data: data
            })
        })
    }
    else {
        usersModel.find()
        .limit(limitUser)
        .exec((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
    
            return response.status(201).json({
                status: "Get all User limit successfully",
                data: data
            })
        })
    }

}

// get skip user
const getAllUserSkip = (request,response) => {
    // B1: thu thập dữ liệu
    skipUser = request.query.skip
    // B2: validate dữ liệu
    if(isNaN(skipUser)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "skip truyền vào không hợp lệ"
        })
    }
    // b3: gọi model truyền dữ liệu

    // nếu skip không có giá trị thì response sẽ trả về toàn bộ user
    if(skipUser == "") {
        usersModel.find((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
    
            return response.status(201).json({
                status: "Get all User successfully",
                data: data
            })
        })
    }
    else {
        usersModel.find()
        .skip(skipUser)
        .exec((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
    
            return response.status(201).json({
                status: "Get all User skip successfully",
                data: data
            })
        })
    }
}

// get skip limit user
const getAllUserSkipLimit = (request,response) => {
    // B1: thu thập dữ liệu
    limitUser = request.query.limit;
    skipUser = request.query.skip
    // B2; validate dữ liệu
    if(isNaN(limitUser)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "limit truyền vào không hợp lệ"
        })
    }

    if(isNaN(skipUser)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "skip truyền vào không hợp lệ"
        })
    }
    // B3; Goi model lấy dữ liệu
    if(limitUser == "" && skipUser == "" ) {
        usersModel.find((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
    
            return response.status(201).json({
                status: "Get all User successfully",
                data: data
            })
        })
    }
    else {
        usersModel.find()
        .skip(skipUser)
        .limit(limitUser)
        .exec((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
    
            return response.status(201).json({
                status: "Get all User skip successfully",
                data: data
            })
        })
    }
}

// get user được sắp xếp fullname theo thứ tự Alphabet
const getAllUsersSort = (request,response) => {
    usersModel.find()
        .sort({fullName: "asc"})
        .exec((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
    
            return response.status(201).json({
                status: "Get all User skip successfully",
                data: data
            })
        })
}

// get response sẽ trả về toàn bộ user được sắp xếp fullname theo thứ tự Alphabet. Kết quả tìm được lấy limit phần tử đầu tiên tính từ vị trí skip
const getAllSortUserSkipLimit = (request, response) => {
    // B1: thu thập dữ liệu
    limitUser = request.query.limit;
    skipUser = request.query.skip
    // B2; validate dữ liệu
    if(isNaN(limitUser)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "limit truyền vào không hợp lệ"
        })
    }

    if(isNaN(skipUser)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "skip truyền vào không hợp lệ"
        })
    }
    // B3; Goi model lấy dữ liệu
    if(limitUser == "" && skipUser == "" ) {
        usersModel.find((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
    
            return response.status(201).json({
                status: "Get all User successfully",
                data: data
            })
        })
    }
    else {
        usersModel.find()
        .sort({ fullName : "asc"})
        .skip(skipUser)
        .limit(limitUser)
        .exec((error, data) => {
            if(error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
    
            return response.status(201).json({
                status: "Get all User skip successfully",
                data: data
            })
        })
    }
}





module.exports = {
    createUsers,
    getAllUsers,
    getDentalUserById,
    updateUsers,
    deleteUsers,
    getAllUsersLimit,
    getAllUserSkip,
    getAllUserSkipLimit,
    getAllUsersSort,
    getAllSortUserSkipLimit
}
