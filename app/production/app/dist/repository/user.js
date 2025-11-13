"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const ErrorMessage_1 = require("../helpers/ErrorMessage");
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        try {
            return await this.prisma.user.findUnique({
                where: { email }
            });
        }
        catch (err) {
            throw new ErrorMessage_1.ErrorMessage('Failed to find an user', 404);
        }
    }
    async createUserAccount(data) {
        try {
            await this.prisma.user.create({ data });
        }
        catch (err) {
            throw new ErrorMessage_1.ErrorMessage('Failed to create a new user', 409);
        }
    }
    async findUserById(userId) {
        try {
            return await this.prisma.user.findUnique({
                where: { id: userId }
            });
        }
        catch (err) {
            throw new ErrorMessage_1.ErrorMessage("Failed to find an user", 404);
        }
    }
}
exports.UserRepository = UserRepository;
