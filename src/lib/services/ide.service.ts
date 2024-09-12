import fetchAPI from './fetchAPI';
import { stringify } from '$lib/components/parsers';

export const fetchRepositoryLists = async ({ ownerName, fetch }: { ownerName: string, fetch }) => {
	let res = await fetchAPI.get(`/api/list-projects/${ownerName}`, {}, fetch);
	return res.body.projects;
};

export const downloadProjectFilesByName = async ({
																									 ownerName,
																									 projectName,
																									 fetch
																								 }: { ownerName: string, projectName: string, fetch }) => {
	let res = await fetchAPI.get(`/api/download-files/flogram-repositories?user=${encodeURIComponent(ownerName)}&project=${projectName}`, {}, fetch);
	return res.body.files;
};

export const saveProject = async ({
																		ownerName,
																		projectName,
																		delete_path,
																		files
																	}: { ownerName: string, projectName: string, delete_path: string[] }) => {

	return await fetch('/api/save-repl', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: stringify({
			user: ownerName,
			repositoryName: projectName,
			delete_path,
			files
		})
	});
}