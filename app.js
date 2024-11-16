// Thư viện
const express = require('express');
const cors = require('cors'); // Truy cập miền khác 1 cách an toàn
//const cookieParser = require('cookie-parser')
//const dotenv = require('dotenv');
//const bodyParser = require('body-parser')
const routes = require('./app/routes/index.route.js');

// Xử lí lỗi
const ApiError = require('./app/utils/api.error.util');

const app = express();


//app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to libary application." });
}); 

app.use('/api/bookBorrowRegistrations', routes.BookBorrowRegistration);
app.use('/api/bookBorrowTrackings', routes.BookBorrowTracking);
app.use('/api/bookPurchaseRegistrations', routes.BookPurchaseRegistration);
app.use('/api/comments', routes.Comment);

app.use('/api/authors', routes.Author);
app.use('/api/books', routes.Book);
app.use('/api/bookFields', routes.BookField);
app.use('/api/bookPrints', routes.BookPrint);
app.use('/api/publishers', routes.Publisher);

app.use('/api/readers', routes.Reader);
app.use('/api/staffs', routes.Staff);

// Undefined routes
app.use((req, res, next) =>{
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) =>{
  return res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error",});
});
module.exports = app;
