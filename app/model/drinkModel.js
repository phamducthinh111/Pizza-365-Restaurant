//Import thư viện mongoose
const mongoose = require("mongoose");

//Class Schema từ thư viện mongoose
const Schema = mongoose.Schema;

//Khởi tạo Drink Schema từ Class Schema
const DrinkSchema = new Schema ({
    maNuocUong: {
        type: String,
        unique: true,
        required: true,
    },
    tenNuocUong: {
        type: String,
        required: true
    },
    donGia: {
        type: Number,
        required: true
    }
},{
    // Ghi dấu bản ghi được tạo hay cập nhật vào thời gian nào
    timestamps: true
})
module.exports = mongoose.model("drink",DrinkSchema)