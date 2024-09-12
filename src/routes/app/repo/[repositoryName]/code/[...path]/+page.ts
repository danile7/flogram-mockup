import type { Repository } from '$lib/services/repo.service';
import { getLibraryByName } from '$lib/services/repo.service';

export async function load({ params }: { params: any }) {
	const { repositoryName, path } = params;

	const res = { repositoryName, path };

	try {
		const library: Repository | null = await getLibraryByName({ name: repositoryName });

		if (library) {
			return {
				...res,
				directoryStructure: library.directoryStructure
			};
		}
	} catch (e) {
		console.error('Error fetching library:', e);
	}

	return {
		...res,
		directoryStructure: []
	};
}
