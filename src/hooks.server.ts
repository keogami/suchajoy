import type { Handle, ServerInit } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';
import { db } from '$lib/server/db';
import { counter } from '$lib/server/db/schema';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

export const handle: Handle = handleAuth;

export const init: ServerInit = async () => {
	console.log("Checking whether to create counter");
	await db.transaction(async () => {
		let res = await db.select({}).from(counter);
		if (res.length >= 1) {
			return;
		}
		console.log("Creating counter");
		await db.insert(counter).values({
			id: 0,
			value: 0,
		});
	})
}
