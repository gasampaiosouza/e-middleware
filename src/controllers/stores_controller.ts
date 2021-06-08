import axios from 'axios';
import { IBodyType } from 'interfaces';
import { CUSTOMERS_DATA } from '@src/content';
import { parseBodyParams } from '@utils/parse-body-params';
import { catchAsyncErrors } from '@utils/catch-async-errors';

import type { Request } from 'express';

interface IUpdateType extends IBodyType {
	data?: { [key: string]: string };
}

const getRequestConfig = (currentStore: typeof CUSTOMERS_DATA[0]) => ({
	baseURL: currentStore.STORE_SITE,
	headers: {
		accept: 'application/vnd.vtex.ds.v10+json',
		'content-type': 'application/json',
		'X-VTEX-API-AppKey': currentStore.APP_KEY,
		'X-VTEX-API-AppToken': currentStore.APP_TOKEN,
	},
});

export default catchAsyncErrors({
	async find(req, res, next) {
		/*
		REQ PARAMS:
		- _where
		- _fields
		*/

		const { acronym, store } = req.params;
		const body: any = req.query;

		const currentStore = CUSTOMERS_DATA[store];

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

		const response = await axios.get(`/api/dataentities/${acronym}/search`, {
			...getRequestConfig(currentStore),
			params: parseBodyParams(body),
		});

		res.status(200).json({ success: true, data: response.data });
	},

	async create(req, res, next) {
		const { acronym, store } = req.params;
		const body: Record<string, unknown> = req.body;

		const currentStore = CUSTOMERS_DATA[store];

		if (!Object.keys(body).length) {
			const message = 'Request body is required.';

			res.status(400).send({ success: false, message });
			return;
		}

		const response = await axios.post(
			`/api/dataentities/${acronym}/documents`,
			body,
			getRequestConfig(currentStore)
		);

		res.status(201).json({ success: true, data: response.data });
	},

	async update(req, res, next) {
		const { acronym, store } = req.params;
		const body: IUpdateType = req.body;

		const currentStore = CUSTOMERS_DATA[store];

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

		const document = await axios.get(`/api/dataentities/${acronym}/search`, {
			params: {
				...parseBodyParams(body),
				_fields: 'id',
			},
			...getRequestConfig(currentStore),
		});

		const [TARGET_DOCUMENT] = document.data;

		const response = await axios.patch(
			`/api/dataentities/${acronym}/documents/${TARGET_DOCUMENT.id}`,
			DOCUMENT_DATA,
			getRequestConfig(currentStore)
		);

		res.status(204).json({ success: true, message: 'Resource updated successfully' });
	},

	async delete(req, res, next) {
		const { acronym, store } = req.params;
		const body: IUpdateType = req.body;

		const currentStore = CUSTOMERS_DATA[store];

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

		const document = await axios.get(`/api/dataentities/${acronym}/search`, {
			params: {
				...parseBodyParams(body),
				_fields: 'id',
			},
			...getRequestConfig(currentStore),
		});

		const [TARGET_DOCUMENT] = document.data;

		const response = await axios.delete(
			`/api/dataentities/${acronym}/documents/${TARGET_DOCUMENT.id}`,
			getRequestConfig(currentStore)
		);

		// 'Resource deleted successfully'
		res.status(204).json({ success: true, message: response });
	},
});
