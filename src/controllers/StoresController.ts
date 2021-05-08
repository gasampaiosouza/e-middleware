import { Request, Response } from 'express';
import { CUSTOMERS_DATA } from 'src/content';

export default class StoresController {
	async index(req: Request, res: Response) {
		const ACRONYM = req.params.acronym;
		const STORE = req.params.store;

		const currentStore = CUSTOMERS_DATA[STORE];

		if (!currentStore) {
			const message = 'Customer was not found in our database';

			return res.json({ message }).status(404);
		}

		return res.json({ data: currentStore });
	}
}
