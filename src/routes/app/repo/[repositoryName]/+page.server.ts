import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { repositoryName } = params;
	throw redirect(302, `/app/repo/${repositoryName}/code`);
};