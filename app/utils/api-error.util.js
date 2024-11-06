class ApiError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith('4') ? 'Error Client' : 'Error Server';
    }
  }
  
  module.exports = ApiError;
  