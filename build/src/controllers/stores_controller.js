"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const content_1 = require("../content");
const parse_body_params_1 = require("../utils/parse-body-params");
const catch_async_errors_1 = require("../utils/catch-async-errors");
const getRequestConfig = (currentStore) => ({
    baseURL: currentStore.STORE_SITE,
    headers: {
        accept: 'application/vnd.vtex.ds.v10+json',
        'content-type': 'application/json',
        'X-VTEX-API-AppKey': currentStore.APP_KEY,
        'X-VTEX-API-AppToken': currentStore.APP_TOKEN,
    },
});
exports.default = catch_async_errors_1.catchAsyncErrors({
    find(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { acronym, store } = req.params;
            const body = req.body;
            const currentStore = content_1.CUSTOMERS_DATA[store];
            if (!Object.keys(body).length) {
                const message = 'Request body is required.';
                res.status(400).send({ success: false, message });
                return;
            }
            if (body._where && !body._fields) {
                const message = `_where must be followed by the _fields parameter`;
                res.status(400).send({ success: false, message });
                return;
            }
            const response = yield axios_1.default.get(`/api/dataentities/${acronym}/search`, Object.assign(Object.assign({}, getRequestConfig(currentStore)), { params: parse_body_params_1.parseBodyParams(body) }));
            res.status(200).json({ success: true, data: response.data });
        });
    },
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { acronym, store } = req.params;
            const body = req.body;
            const currentStore = content_1.CUSTOMERS_DATA[store];
            if (!Object.keys(body).length) {
                const message = 'Request body is required.';
                res.status(400).send({ success: false, message });
                return;
            }
            const response = yield axios_1.default.post(`/api/dataentities/${acronym}/documents`, body, getRequestConfig(currentStore));
            res.status(201).json({ success: true, data: response.data });
        });
    },
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { acronym, store } = req.params;
            const body = req.body;
            const currentStore = content_1.CUSTOMERS_DATA[store];
            if (!Object.keys(body).length) {
                const message = 'Request body is required.';
                res.status(400).send({ success: false, message });
                return;
            }
            if (!body._where) {
                const message = '_where parameter is required when updating MD data.';
                res.status(400).send({ success: false, message });
                return;
            }
            // keep body data to use later on
            const DOCUMENT_DATA = body.data;
            delete body.data;
            const document = yield axios_1.default.get(`/api/dataentities/${acronym}/search`, Object.assign({ params: Object.assign(Object.assign({}, parse_body_params_1.parseBodyParams(body)), { _fields: 'id' }) }, getRequestConfig(currentStore)));
            const [TARGET_DOCUMENT] = document.data;
            const response = yield axios_1.default.patch(`/api/dataentities/${acronym}/documents/${TARGET_DOCUMENT.id}`, DOCUMENT_DATA, getRequestConfig(currentStore));
            res.status(204).json({ success: true, message: 'Resource updated successfully' });
        });
    },
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { acronym, store } = req.params;
            const body = req.body;
            const currentStore = content_1.CUSTOMERS_DATA[store];
            if (!Object.keys(body).length) {
                const message = 'Request body is required.';
                res.status(400).send({ success: false, message });
                return;
            }
            if (!body._where) {
                const message = '_where parameter is required when updating MD data.';
                res.status(400).send({ success: false, message });
                return;
            }
            const document = yield axios_1.default.get(`/api/dataentities/${acronym}/search`, Object.assign({ params: Object.assign(Object.assign({}, parse_body_params_1.parseBodyParams(body)), { _fields: 'id' }) }, getRequestConfig(currentStore)));
            const [TARGET_DOCUMENT] = document.data;
            const response = yield axios_1.default.delete(`/api/dataentities/${acronym}/documents/${TARGET_DOCUMENT.id}`, getRequestConfig(currentStore));
            // 'Resource deleted successfully'
            res.status(204).json({ success: true, message: response });
        });
    },
});
