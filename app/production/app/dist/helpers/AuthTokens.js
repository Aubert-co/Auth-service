"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN = process.env?.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env?.REFRESH_TOKEN;
if (!ACCESS_TOKEN || !REFRESH_TOKEN) {
    throw new Error("Falha no .env");
}
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, ACCESS_TOKEN, { expiresIn: '2h' });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, REFRESH_TOKEN, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
