<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { webcontainer } from '$lib/webcontainer';
	import { is_repl_to_save, repl_id, repl_name, old_repl_name } from '$lib/store/repl_id_store';
	import MainLayout from '$lib/layouts/MainLayout.svelte';

	export let data;

	// keep the repl store up to date in case data changes
	$: repl_id.set(data?.id);
	$: repl_name.set(data?.repl_name);
	$: old_repl_name.set(data?.repl_name);
	$: webcontainer.set_file_system(data?.repl!);

	let fix_for_double_after = false;
	let url_to_navigate_to = null as null | string;


	afterNavigate(async () => {
		if (fix_for_double_after) return;
		fix_for_double_after = true;
		// await handle_load_files(data, (value) => {
		// 	loading_github_repo = value;
		// });
		webcontainer.init().then(() => webcontainer.mount_files());
		// for debugging
		(window as any).wc = webcontainer;
	});

	beforeNavigate(({ cancel, type, to }) => {
		if ($is_repl_to_save && !url_to_navigate_to) {
			// if the repl is to save we call cancel
			cancel();
			// if the type is leave the browser will handle it, otherwise we
			// show custom UI to ask confirmation to the user.
			if (type !== 'leave') {
				url_to_navigate_to = to?.url.href ?? null;
			}
			return;
		}
		url_to_navigate_to = null;
		fix_for_double_after = false;
		$webcontainer.running_process?.kill?.();
	});

</script>

<svelte:head>
	<title>{$repl_name}</title>
</svelte:head>

<h2 class="screen-reader-only">{repl_name}</h2>

<MainLayout>
	<slot />
</MainLayout>
