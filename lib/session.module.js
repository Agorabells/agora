import nextSession from 'next-session';
import { expressSession, promisifyStore } from 'next-session/lib/compat';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const redisStore = RedisStore(expressSession);

const redisOpt = {
	host: 'localhost',
	port: 6379,
	db: 5,
}

const redis = new Redis(redisOpt);

const nextSessionOpt = {
	store: promisifyStore(new redisStore({ client: redis })),
	autoCommit: false,
	cookie: {
		secure: true,
		httpOnly: true,
		path: '/',
		domain: 'localhost',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 30
	}
}

export const getSession = nextSession(nextSessionOpt);

export default async function sessionMiddleware(req, res, next) {
	await getSession(req, res);
	next();
}
