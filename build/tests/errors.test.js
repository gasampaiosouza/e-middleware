"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('requests all methods with no body', () => {
    const defaultRoute = '/md/imaginarium/CP';
    const defaultNoBodyResponse = { success: false, message: 'Request body is required.' };
    beforeAll(() => {
        const server = http_1.createServer(app_1.default);
        server.close();
    });
    it('GET should not allow the request', (done) => {
        supertest_1.default(app_1.default).get(defaultRoute).expect(400, defaultNoBodyResponse).end(done);
    });
    it('POST should not allow the request', (done) => {
        supertest_1.default(app_1.default).post(defaultRoute).expect(400, defaultNoBodyResponse).end(done);
    });
    it('PATCH should not allow the request', (done) => {
        supertest_1.default(app_1.default).patch(defaultRoute).expect(400, defaultNoBodyResponse).end(done);
    });
});
