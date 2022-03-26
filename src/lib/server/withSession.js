import { getSession } from '../session.module';

export const withSession = (handler) => {
	return async function (ctx) {
		const { req, res } = ctx;
		await getSession(req, res);
		return handler(ctx);
	};
};
