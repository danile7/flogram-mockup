import { getLibraryInfoByName } from '$lib/services/repo.service';

export async function load({ params }: { params: any }) {

	const { repositoryName } = params;

	const result = {
		name: repositoryName
	};

	try {
		const library = await getLibraryInfoByName({ libraryName: repositoryName });

		if (library) {
			return {
				...result,
				library: library
			};
		}

	} catch (e) {
		console.log('fetch library info error', e);
	}

	return result;
}
