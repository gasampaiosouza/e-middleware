import type { NextFunction, Request, Response } from 'express';

type IActions = Record<
	string,
	(req: Request, res: Response, next: NextFunction) => Promise<void>
>;

export function catchAsyncErrors(actions: IActions) {
	const protectedActions: IActions = {};

	Object.keys(actions).forEach((property) => {
		protectedActions[property] = async function (
			req: Request,
			res: Response,
			next: NextFunction
		) {
			try {
				await actions[property](req, res, next);
			} catch (error) {
				if (error.hasOwnProperty('toJSON')) {
					console.log(error.toJSON());
				} else {
					console.log(error);
				}

				next(error);
			}
		};
	});

	return protectedActions;
}
