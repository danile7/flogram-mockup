import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { listProjects } from '$lib/util/s3Client';

export const GET: RequestHandler = async ({ params }) => {

	const user = params.user;

	try {
		const projects = await listProjects(user);

		return json({
			status: 200,
			body: { projects }
		});
	} catch (error) {
		return json({
			status: 500,
			body: { error: 'Failed to download files' }
		});
	}
};