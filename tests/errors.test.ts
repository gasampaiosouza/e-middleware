import { createServer } from 'http';
import request from 'supertest';
import app from '../src/app';

describe('requests all methods with no body', () => {
	const defaultRoute = '/md/imaginarium/CP';
	const defaultNoBodyResponse = { success: false, message: 'Request body is required.' };

	beforeAll(() => {
		const server = createServer(app);

		server.close();
	});

	it('GET should not allow the request', (done) => {
		request(app).get(defaultRoute).expect(400, defaultNoBodyResponse).end(done);
	});

	it('POST should not allow the request', (done) => {
		request(app).post(defaultRoute).expect(400, defaultNoBodyResponse).end(done);
	});

	it('PATCH should not allow the request', (done) => {
		request(app).patch(defaultRoute).expect(400, defaultNoBodyResponse).end(done);
	});
});
