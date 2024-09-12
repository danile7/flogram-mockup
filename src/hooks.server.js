import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { getUserByToken } from '$lib/services/auth.service';

const protectedRoutes = ['/app/repo', '/upgrade', '/payment', '/profile'];

const handle_headers = async ({ event, resolve }) => {
	event.setHeaders({
		'Cross-Origin-Embedder-Policy': 'require-corp',
		'Cross-Origin-Opener-Policy': 'same-origin',
	});
	return resolve(event, {
		transformPageChunk(input) {
			return input.html;
		},
	});
};

export async function handleCSP({ event, resolve }) {
	const response = await resolve(event);

	// Add CSP headers for YouTube embedding
	response.headers.set('Content-Security-Policy', "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com");

	return response;
}

const handleAuth = async ({ event, request, resolve, reject }) => {

	const token = event.cookies.get('access_token');

	if (token) {
		try {
			const currentUser = await getUserByToken({ token });

			if (currentUser) {
				event.locals.user = { ...currentUser };
				event.locals.authHeader = { 'Authorization': `Bearer ${token}` };

			}
		} catch (err) {

			event.locals.user = null;
			event.locals.authHeader = null;
			await event.cookies.delete('access_token', { path: '/' });
		}
	} else {
		event.locals.user = null;
		event.locals.authHeader = null;

		let isProtectedRoute = protectedRoutes.some(route => event.url.pathname.startsWith(route));
		if (isProtectedRoute) {
			throw redirect(303, '/');
		}
	}

	let singOut = event.url.pathname.startsWith('/sign-out');

	if (singOut) {
		event.locals.user = null;
		event.locals.authHeader = null;
		await event.cookies.delete('access_token', { path: '/' });
		throw redirect(303, '/');
	}

	return await resolve(event);

};

export const handle = sequence(handle_headers, handleCSP, handleAuth);
