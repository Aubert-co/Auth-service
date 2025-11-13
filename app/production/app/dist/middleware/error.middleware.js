"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = ErrorMiddleware;
const ErrorMessage_1 = require("../helpers/ErrorMessage");
function ErrorMiddleware(error, req, res, next) {
    console.log(error.message);
    if (error instanceof ErrorMessage_1.ErrorMessage) {
        res.status(error.status).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
}
