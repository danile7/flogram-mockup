/** @type {import('./$types').PageLoad} */

import posts from '$lib/docs/posts';

export async function load() {
	const published = await posts();
	return {
		props: {
			blogs: published
		}
	};
}
