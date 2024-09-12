import posts from '$lib/tutorials/posts';
import { redirect } from '@sveltejs/kit';

export async function load(param) {
	const data = await posts();

	if (data.length > 0) {
		throw redirect(
			301,
			`/tutorials/${data[0].path.split('/')[data[0].path.split('/').length - 2]}`
		);
	} else {
		throw redirect(301, `/`);
	}
}
