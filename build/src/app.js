"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const get_env_1 = __importDefault(require("./utils/get-env"));
const APP = express_1.default();
const PORT = get_env_1.default('PORT') || 8080;
APP.use(express_1.default.json());
APP.use(cors_1.default());
APP.use(routes_1.default);
// prevent test to listen to a existing port
if (process.env.NODE_ENV !== 'test') {
    APP.listen(PORT, () => {
        console.log(`⚡️ Server is running at https://localhost:${PORT}`);
    });
}
exports.default = APP;
