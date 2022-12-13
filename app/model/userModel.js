//Import thư viện mongoose
const mongoose = require("mongoose");

//Class Schema từ thư viện mongoose
const Schema = mongoose.Schema;

//Khởi tạo user Schema từ Class Schema
const UsersSchema = new Schema ({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    address: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    // 1 user có thể có nhiều order
    order: [{
        type: mongoose.Types.ObjectId,
        ref: "order"
    }]
},{
    // Ghi dấu bản ghi được tạo hay cập nhật vào thời gian nào
    timestamps: true
})
module.exports = mongoose.model("user",UsersSchema)