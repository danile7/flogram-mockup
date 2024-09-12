import {redirect} from '@sveltejs/kit'

export const load = async ({ url }) => {
	const pathname = url.pathname;

	if (pathname === '/flogram-ide') {
		throw redirect(302, '/flogram-ide/code');
	}

	return {
		props: {}
	};
};
