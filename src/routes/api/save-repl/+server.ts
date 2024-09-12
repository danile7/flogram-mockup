import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteFileOrFolder, uploadProjects } from '$lib/util/s3Client';

export const POST: RequestHandler = async ({ locals, request }) => {

	const user = locals.user;
	let { files, delete_path, repositoryName } = await request.json();

	console.log('files on server:::', files['index.flo'])

	if (user && user.username) {
		const prefix = `flogram-repositories/${user.username}/${repositoryName}/v.latest`;

		// delete files and folders
		try {
			if (delete_path && delete_path.length) {
				for (const path of delete_path) {
					await deleteFileOrFolder(path, prefix);
				}
			}
		} catch (e) {
			console.error('Error uploading files:', e);
			return new Response((e as Error).message, {
				status: 500
			});
		}

		try {
			await uploadProjects(files, '', prefix);

		} catch (e) {
			console.error('Error uploading files:', e);
			return new Response((e as Error).message, {
				status: 500
			});
		}

	} else {
		return json({
			ok : false,
			message: 'Unauthorized'
		});
	}

	return json({
		ok: true,
		message: 'Files uploaded successfully'
	});
};
