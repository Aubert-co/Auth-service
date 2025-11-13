"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
class ErrorMessage extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ErrorMessage';
        this.status = status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorMessage);
        }
    }
}
exports.ErrorMessage = ErrorMessage;
