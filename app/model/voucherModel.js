//Import thư viện mongoose
const mongoose = require("mongoose");

//Class Schema từ thư viện mongoose
const Schema = mongoose.Schema;

//Khởi tạo Voucher Schema từ Class Schema
const VoucherSchema = new Schema ({
    maVoucher: {
        type: String,
        unique: true,
        required: true,
    },
    phanTramGiamGia: {
        type: Number,
        required: true
    },
    ghiChu: {
        type: String,
        required: false
    }
},{
    // Ghi dấu bản ghi được tạo hay cập nhật vào thời gian nào
    timestamps: true
})
module.exports = mongoose.model("voucher",VoucherSchema)