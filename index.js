// Khai báo thư viên Express
const express = require("express");
// Khai báo thư viện Mongoose
const mongoose = require("mongoose");


const path = require("path")

// Khởi tạo Express App
const app = express();

// Khai báo cổng chạy app 
const port = 8000;

app.use(express.static(__dirname + "/views"))

// Khai báo router app
const drinkRouter = require("./app/routes/drinkRouter");
const voucherRouter = require("./app/routes/voucherRouter");
const usersRouter = require("./app/routes/userRouter");
const orderRouter = require("./app/routes/orderRouter");
const pizza365Router = require("./app/routes/pizza365routes");

// Cấu hình request đọc được body json
app.use(express.json());



app.get("/",(request,response) => {
    console.log(__dirname);
    response.sendFile(path.join(__dirname + "/views/Task42.10.html"))
})

mongoose.connect("mongodb://127.0.0.1:27017/CRUD_Pizza365", function(error) {
    if (error) throw error;
    console.log('Successfully connected');
   })


app.use((request, response, next) => {
    console.log("Request method: ", request.method);
    next();
})

// App sử dụng router
app.use("/", drinkRouter);
app.use("/", voucherRouter);
app.use("/", usersRouter);
app.use("/", orderRouter);

app.use("/", pizza365Router);


// Chạy app trên cổng
app.listen(port, () => {
    console.log(`App Listening on port ${port}`);
})