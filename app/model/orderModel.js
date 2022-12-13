//Import thư viện mongoose
const mongoose = require("mongoose");

//Class Schema từ thư viện mongoose
const Schema = mongoose.Schema;

// Import rand-token
var randtoken = require("rand-token");

// khởi tạo order Schema từ Class Schema
const OrderSchema = new Schema ({
    orderCode: {
        type: String,
        unique: true,
        default: function () {
           return randtoken.generate(8)
        }
    },
    pizzaSize: {
        type: String,
        require: true
    },
    pizzaType: {
        type: String,
        require: true
    },
    // Mỗi 1 order có 1 voucher
    voucher: {
        type: mongoose.Types.ObjectId,
        ref: "voucher"
    },
    // Mỗi 1 order 1 loại drink 
    drink: {
        type: mongoose.Types.ObjectId,
        ref: "drink"
    },
    status: {
        type: String,
        required: true
    }
},{
    // Ghi dấu bản ghi được tạo hay cập nhật vào thời gian nào
    timestamps: true
})
module.exports = mongoose.model("order",OrderSchema)