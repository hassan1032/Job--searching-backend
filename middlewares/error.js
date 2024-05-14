class ErrorHandler extends Error {
    constructor(message, status, errors) {
      super(message);
      this.status = status; 
      this.errors = errors;
    }
  }
  
  export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.status = err.status || 500;
    if (err.name === "CaseError") {
      const message = `Resource not Found. Invalid ${err.path} `;
      err = new ErrorHandler(message, 400);
    }
    if (err.code === "11000") {
      const message = `  Duplicate ${Object.keys(err.keyValue)}  Entered`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
      const message = ` Json web Token Is invalid Try Again `;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
      const message = `Json Web Token Is Expired. Try Again`;
      err = new ErrorHandler(message, 400);
    }
    return res.status(err.status).json({ 
      success: false,
      message: err.message,
    });
  };
  
  export default ErrorHandler;
  