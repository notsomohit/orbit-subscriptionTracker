export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || (err.status ? Number(err.status) : 500);
    let message = err.message || "Internal Server Error";

    // Handle JWT authentication errors
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    } else if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token has expired";
    }

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(", ");
    } else if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue || {})[0] || "field";
        message = `A user with that ${field} already exists`;
    }

    res.status(statusCode).json({
        statusCode,
        success: false,
        message,
        errors: err.errors || [],
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
    });
};
