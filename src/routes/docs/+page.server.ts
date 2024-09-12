import posts from '$lib/docs/posts';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const data = await posts();
	if (data.length > 0) {
		throw redirect(301, `/docs/${data[0].path.split('/')[data[0].path.split('/').length - 2]}`);
	} else {
		throw redirect(301, `/`);
	}
}
