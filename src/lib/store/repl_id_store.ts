import { derived, get, writable } from 'svelte/store';
import { pushState } from '$app/navigation';
import { error, success } from '$lib/toast';
import { webcontainer } from '$lib/webcontainer';
import file_updating_store from '$lib/store/file_updating_store';
import authStore from '$lib/store/auth';
import { DEFAULT_REPOSITORY_NAME } from '$lib/util/enums';
import { updateLibraryName } from '$lib/services/repo.service';
import { saveProject } from '../services/ide.service';

export const repl_id = writable<string | undefined>();
export const repl_name = writable<string>('Hello World');
export const old_repl_name = writable<string>('Old Repl');
export const is_repl_saving = writable(false);
export const is_repl_to_save = writable(false);

function create_file_status_store() {
	const file_status = writable<Record<string, boolean>>({});

	const set_file_edited_status = (path: string, status: boolean) => {
		file_status.update((file_status) => ({
			...file_status,
			[path]: status
		}));
	};

	const reset_all_file_status = () => {
		file_status.set({});
	};

	const is_file_edited = (path: string) => {
		return derived(file_status, ($file_status) => {
			return $file_status[path] || false;
		});
	};

	const save_repl = async (is_forking = false) => {

		const { delete_path } = get(file_updating_store);
		const id = get(repl_id);
		const repositoryName: string = get(repl_name);
		const oldRepositoryName: string = get(old_repl_name);
		const authStoreData = get(authStore);

		const ownerName = authStoreData.user.username;
		const authHeader = authStoreData.authHeader;

		if (repositoryName === DEFAULT_REPOSITORY_NAME) {
			error('You need to create your repository');
			pushState(`/${'first-repository-create'}`, {});
		} else {

			success('Saving...')
			if (repositoryName !== oldRepositoryName) {
				await updateLibraryName({ newName: repositoryName, oldName: oldRepositoryName, authHeader });
			}

			const files = await webcontainer.get_tree_from_container(false);

			is_repl_saving.set(!is_forking);

			try {
				const res = await saveProject({ ownerName, projectName: repositoryName, delete_path, files });

				if (res.ok) {
					success('Saved');
					is_repl_to_save.set(false);
					reset_all_file_status();

					// if (res.id && (!id || is_forking)) {
					// 	// if there wasn't an id (or there was one but we are forking)
					// 	// means it's the first time the user saves this project,
					// 	// we push with the history api because we just want the url
					// 	// to change there's no need to run the load function again
					// 	pushState(`/${res.id}`, {});
					// 	repl_id.set(res.id);
					// }
				} else {
					error('Can\'t save the project');
				}
			} catch (error) {
				console.log('error during saving project', error);
			} finally {
				is_repl_saving.set(false);
			}
		}
	};

	return {
		subscribe: file_status.subscribe,
		set: file_status.set,
		update: file_status.update,
		set_file_edited_status,
		reset_all_file_status,
		is_file_edited,
		save_repl
	};
}

export const file_status = create_file_status_store();
