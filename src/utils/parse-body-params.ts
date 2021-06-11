import { IBodyType } from '../../interfaces';

export function parseBodyParams(params: IBodyType) {
	const PARSED_BODY = Object.entries(params).map(([key, value]) => {
		const handleReturning = (val: unknown) => ({ [key]: val });

		if (Array.isArray(value)) return handleReturning(value.join(','));

		if (typeof value === 'object') {
			const ENTRIES = Object.entries(value);
			const PARSED_OBJECT = ENTRIES.map(
				([key, value]) => `${key}=${value}`
			).join('&');

			return handleReturning(PARSED_OBJECT);
		}

		return handleReturning(value);
	});

	return Object.assign({}, ...PARSED_BODY);
}
