"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const AuthTokens_1 = require("../helpers/AuthTokens");
const ErrorMessage_1 = require("../helpers/ErrorMessage");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor(user) {
        this.user = user;
    }
    async loginUser(email, password) {
        const user = await this.user.findByEmail(email);
        if (!user)
            throw new ErrorMessage_1.ErrorMessage("Invalid email or password", 400);
        const hashedPassword = user.password;
        const compare = await bcrypt_1.default.compare(password, hashedPassword);
        if (!compare)
            throw new ErrorMessage_1.ErrorMessage("Invalid email or password", 400);
        const accessToken = (0, AuthTokens_1.generateAccessToken)(user.id);
        const refreshToken = (0, AuthTokens_1.generateRefreshToken)(user.id);
        return {
            userId: user.id,
            accessToken,
            refreshToken
        };
    }
    async createUserAccount({ email, password, name }) {
        const findUser = await this.user.findByEmail(email);
        if (findUser) {
            throw new ErrorMessage_1.ErrorMessage("User already exists", 409);
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await this.user.createUserAccount({ email, password: hashedPassword, name });
    }
}
exports.UserService = UserService;
