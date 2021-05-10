import { Request } from 'express';
import { CUSTOMERS_DATA } from '@src/content';
import getEnv from './get-env';

export function getCorsOptions() {
	const localhost = getEnv('NODE_ENV') !== 'production';

	const handleCrossSite = (isAllowed: boolean) => {
		return isAllowed ? null : new Error('Not allowed.');
	};

	return (req: Request, callback: Function) => {
		const TARGET = CUSTOMERS_DATA[req.params.store];

		if (!TARGET) {
			return callback(new Error('Customer was not found in our database.'));
		}

		const WHITELIST: (string | undefined)[] = [TARGET.STORE_SITE];

		// allow localhost requests
		if (localhost) WHITELIST.unshift(undefined);

		const isOriginEnabled = WHITELIST.indexOf(req.header('Origin')!) !== -1;

		return callback(handleCrossSite(isOriginEnabled), {
			origin: isOriginEnabled,
		});
	};
}
