import { createServer } from 'http';
import request from 'supertest';
import app from '../src/app';

describe('request to all store routes should work as expected', () => {
	const defaultRoute = '/md/imaginarium/CP';

	beforeAll(() => {
		const server = createServer(app);

		server.close();
	});

	const handleBodyValidation = (res: request.Response, dataFields: string[] | string) => {
		const expectedFields = ['success', 'data'];
		const containsFields = expectedFields.every((key) => key in res.body);

		if (typeof dataFields == 'string') {
			return containsFields && dataFields === res.body.data;
		}

		const checkKeysBasedOnFields = dataFields.every((key) => key in res.body.data);

		return containsFields && checkKeysBasedOnFields;
	};

	it('should return the selected "_field" value ', (done) => {
		request(app)
			.get(defaultRoute)
			.send({ _where: { email: 'deboracabralfarias@gmail.com' }, _fields: 'nome' })
			.expect(200)
			.expect((res) => handleBodyValidation(res, ['nome']))
			.end(done);
	});

	it('should create a new user', (done) => {
		request(app)
			.post(defaultRoute)
			.send({ nome: 'middleware testing', email: 'middleware.testing@gmail.com' })
			.expect(201)
			.expect((res) => handleBodyValidation(res, ['Id', 'Href', 'DocumentId']))
			.end(done);
	});

	it('should update the created user', (done) => {
		request(app)
			.patch(defaultRoute)
			.send({
				_where: { email: 'middleware.testing@gmail.com' },
				data: { nome: 'middleware' },
			})
			.expect(204)
			.expect((res) => handleBodyValidation(res, 'Resource updated successfully'))
			.end(done);
	});

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
