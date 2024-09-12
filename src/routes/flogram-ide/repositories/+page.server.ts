import { fetchRepositoryLists } from '$lib/services/ide.service';

export const load = async ({ fetch, locals }) => {

	let repositories = [];

	if(locals.user && locals.user.username){

		try{
			repositories = await fetchRepositoryLists({ownerName : locals.user.username, fetch })
		}
		catch(e){
			console.log('fetch repository list error', e)
		}
	}

	return {
		repositories
	};
};