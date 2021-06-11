"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorsOptions = void 0;
const content_1 = require("../content");
const get_env_1 = __importDefault(require("./get-env"));
function getCorsOptions() {
    const localhost = get_env_1.default('NODE_ENV') !== 'production';
    const handleCrossSite = (isAllowed) => {
        return isAllowed ? null : new Error('Not allowed.');
    };
    return (req, callback) => {
        const TARGET = content_1.CUSTOMERS_DATA[req.params.store];
        if (!TARGET) {
            return callback(new Error('Customer was not found in our database.'));
        }
        const WHITELIST = [TARGET.STORE_SITE];
        // allow localhost requests
        if (localhost)
            WHITELIST.unshift(undefined);
        const isOriginEnabled = WHITELIST.indexOf(req.header('Origin')) !== -1;
        return callback(handleCrossSite(isOriginEnabled), {
            origin: isOriginEnabled,
        });
    };
}
exports.getCorsOptions = getCorsOptions;
