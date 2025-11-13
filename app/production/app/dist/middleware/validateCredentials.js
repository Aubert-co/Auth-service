"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCredentials = void 0;
const helpers_1 = require("../helpers");
class ValidateCredentials {
    handler(req, res, next) {
        if (!(0, helpers_1.isAValidString)(req.body.password)) {
            res.status(422).send({ message: "Invalid password. Please check and try again." });
            return;
        }
        if (!(0, helpers_1.isValidEmail)(req.body.email)) {
            res.status(422).send({ message: "Invalid email. Please check and try again." });
            return;
        }
        next();
    }
}
exports.ValidateCredentials = ValidateCredentials;
