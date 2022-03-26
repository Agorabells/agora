import nextSession from 'next-session';
import { expressSession, promisifyStore } from 'next-session/lib/compat';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const RedisStores = RedisStore(expressSession);

const redis = new Redis(process.env.REDIS_URL);

const nextSessionOpt = {
	store: promisifyStore(new RedisStores({ client: redis })),
	autoCommit: false,
	cookie: {
		secure: true,
		httpOnly: true,
		path: '/',
		domain: process.env.COOKIE_DOMAIN,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 30,
	},
};

export const getSession = nextSession(nextSessionOpt);

export default async function sessionMiddleware(req, res, next) {
	await getSession(req, res);
	next();
}
