const multer = require('multer');

// Sử dụng memoryStorage để lưu file trong bộ nhớ
const storage = multer.memoryStorage();

const upload = multer({ storage });

// Middleware để xử lý 1 file upload
exports.singleUpload = upload.single('image');
