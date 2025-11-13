"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const auth_route_1 = __importDefault(require("./route/auth.route"));
const error_middleware_1 = require("middleware/error.middleware");
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again later."
    }
});
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        useDefaults: true,
    },
}));
if (process.env.MODE !== "test") {
    app.set('trust proxy', 1);
}
app.use((0, cors_1.default)({
    methods: ['POST'],
    credentials: true,
    origin: "https://market.aubertdev.com.br"
}));
app.use((0, cookie_parser_1.default)());
app.use(globalLimiter);
app.use(auth_route_1.default);
app.use((error, req, res, next) => (0, error_middleware_1.ErrorMiddleware)(error, req, res, next));
const startServer = async () => {
    try {
        if (process.env.MODE !== "test") {
            app.listen(process.env.PORT, () => { console.log('server running' + process.env.PORT); });
        }
    }
    catch (err) {
        console.error('Erro ao iniciar servidor:', err);
        process.exit(1);
    }
};
startServer();
exports.default = app;
