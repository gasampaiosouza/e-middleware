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
				console.log(error.toJSON());

				// if (error.response) {
				// 	res.status(error?.response?.status).send(error?.response?.data);
				// }

				// res.status(403).send({ message: 'Unknown error happened' });
				next(error);
			}
		};
	});

	return protectedActions;
}
