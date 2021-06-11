"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('request to all store routes should work as expected', () => {
    const defaultRoute = '/md/imaginarium/CP';
    beforeAll(() => {
        const server = http_1.createServer(app_1.default);
        server.close();
    });
    const handleBodyValidation = (res, dataFields) => {
        const expectedFields = ['success', 'data'];
        const containsFields = expectedFields.every((key) => key in res.body);
        if (typeof dataFields == 'string') {
            return containsFields && dataFields === res.body.data;
        }
        const checkKeysBasedOnFields = dataFields.every((key) => key in res.body.data);
        return containsFields && checkKeysBasedOnFields;
    };
    // POST
    it('should create a new user', (done) => {
        supertest_1.default(app_1.default)
            .post(defaultRoute)
            .send({ nome: 'middleware testing', email: 'middleware.testing@gmail.com' })
            .expect(201)
            .expect((res) => handleBodyValidation(res, ['Id', 'Href', 'DocumentId']))
            .end(done);
    });
    // GET
    it('should return the selected "_field" value ', (done) => {
        supertest_1.default(app_1.default)
            .get(defaultRoute)
            .send({ _where: { email: 'middleware.testing@gmail.com' }, _fields: 'nome' })
            .expect(200)
            .expect((res) => handleBodyValidation(res, ['nome']))
            .end(done);
    });
    // PATCH
    it('should update the created user', (done) => {
        supertest_1.default(app_1.default)
            .patch(defaultRoute)
            .send({
            _where: { email: 'middleware.testing@gmail.com' },
            data: { nome: 'middleware' },
        })
            .expect(204)
            .expect((res) => handleBodyValidation(res, 'Resource updated successfully'))
            .end(done);
    });
    // DELETE
    // it('should delete the specified user', (done) => {
    // 	request(app)
    // 		.patch(defaultRoute)
    // 		.send({
    // 			_where: { email: 'middleware@econverse.com' },
    // 		})
    // 		.expect(204)
    // 		.expect((res) => handleBodyValidation(res, 'Resource updated successfully'))
    // 		.end(done);
    // });
});
