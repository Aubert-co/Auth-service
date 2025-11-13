"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const helpers_1 = require("../helpers");
const isProduction = process.env.NODE_ENV === 'production';
class AuthUserController {
    constructor(user) {
        this.user = user;
    }
    async Login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.user.loginUser(email, password);
            res.cookie('token', accessToken, {
                httpOnly: true,
                secure: isProduction,
                maxAge: 15 * 60 * 1000,
                path: '/',
                domain: '.aubertdev.com.br',
                sameSite: 'none'
            })
                .cookie('refresh', refreshToken, {
                httpOnly: true,
                secure: isProduction,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/',
                domain: '.aubertdev.com.br',
                sameSite: 'none'
            });
            res.status(201).json({ message: "Login successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    async Register(req, res, next) {
        try {
            if (!(0, helpers_1.isAValidString)(req.body.name)) {
                return res.status(422).send({ message: "Invalid name. Please check and try again." });
            }
            const { email, name, password } = req.body;
            await this.user.createUserAccount({ name, email, password });
            res.status(201).json({ message: "User created successfully" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthUserController = AuthUserController;
