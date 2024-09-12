import { redirect } from '@sveltejs/kit';
import type { DirectoryNode, FileSystemTree } from '@webcontainer/api';
import { handleDownloadProjectData } from '$lib/util/s3Client';
import { default_project_files } from '$lib/default_project_files';
import { PUBLIC_TEMPLATE_COOKIE_NAME } from '$lib/constants';
import { DEFAULT_REPOSITORY_NAME } from '$lib/util/enums';
import { downloadProjectFilesByName } from '../../../lib/services/ide.service';

export const ssr = false;

export const load = async ({
																							 params,
																							 locals,
																							 url: { searchParams: search_params },
																							 cookies,
																							 fetch
																						 }) => {
	// const owner = search_params.get('owner');
	// const branch = search_params.get('branch');

	const owner = locals.user;
	let { repositoryName } = params;
	let default_files;

	if (owner && repositoryName) {
		/**
		 * If user login, and there is a repository, get repo from cloud storage
		 * */
		/**==============*/
		const files = await downloadProjectFilesByName({ownerName : owner.username, projectName : repositoryName, fetch});

		const projectData = handleDownloadProjectData({
			files,
			user: owner.username,
			project: repositoryName
		});
		default_files = projectData?.project_files;
		/**==============*/
	} else {
		/**
		 * Test repository template for test.
		 */
		// console.log('template for test users');
		const saved_default_template = cookies.get(PUBLIC_TEMPLATE_COOKIE_NAME) ?? 'basic';
		const template = search_params.get('t') ?? saved_default_template;
		default_files = default_project_files[template] ?? default_project_files[saved_default_template];
		repositoryName = DEFAULT_REPOSITORY_NAME
	}

	let files: FileSystemTree = (default_files as DirectoryNode).directory;

	if (!files) {
		redirect(300, '/');
	}

	return {
		repl: files,
		repl_name: repositoryName,
	};
};
