"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const get_cors_options_1 = require("@utils/get-cors-options");
const stores_controller_1 = __importDefault(require("@controllers/stores_controller"));
const ROUTER = express_1.default.Router();
var CORS_OPTIONS = get_cors_options_1.getCorsOptions();
ROUTER.get('/md/:store/:acronym', cors_1.default(CORS_OPTIONS), stores_controller_1.default.find);
ROUTER.post('/md/:store/:acronym', cors_1.default(CORS_OPTIONS), stores_controller_1.default.create);
ROUTER.patch('/md/:store/:acronym', cors_1.default(CORS_OPTIONS), stores_controller_1.default.update);
ROUTER.delete('/md/:store/:acronym', cors_1.default(CORS_OPTIONS), stores_controller_1.default.delete);
exports.default = ROUTER;
