// Thư viện
const express = require('express');
const cors = require('cors'); // Truy cập miền khác 1 cách an toàn
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')


// Xử lí lỗi
const ApiError = require('./app/utils/api-error.util');

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Undefined routes
app.use('*', (req, res, next) => {
    return next(
      new ApiError(
        404,
        routeMessage.notFound.replace('{{originalUrl}}', req.originalUrl),
      ),
    );
  });

app.use((err, req, res, next) =>{
    return res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error",});
});

