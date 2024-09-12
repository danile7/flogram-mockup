<script lang='ts'>
	import { onMount } from 'svelte';
	import find from 'lodash/find';
	import { goto } from '$app/navigation';
	import { Mule, SORTERS } from '$lib/components/pages/repo/Struct.svelte';
	import FileManager from '$lib/components/pages/repo/FileManager/FileManager.svelte';
	import { getCookie, setCookie } from '$lib/util';
	import { REPOSITORY_FILE_LAYOUT } from '$lib/util/enums';
	import type { LayoutMode } from '$lib/store/repository';
	import repositoryStore from '$lib/store/repository';

	export let data;

	let repositoryName = '';
	let path;
	let directoryStructure = [];
	const layoutViewId = 'repository_view_mode';


	const loadPath = async (path) => {
		let directory;

		if (directoryStructure.length) {
			directory = find(directoryStructure, { path });
		}

		if (directory) {
			mule = Mule.fromAny(directory, directory.path).sort(sorter);
			path = directory.path;
		}
	};

	$:{
		let { repositoryName: newRepositoryName, path: newPath, directoryStructure: newDirectoryStructure } = data;

		repositoryName = newRepositoryName;
		path = newPath;
		directoryStructure = newDirectoryStructure;

		if (typeof path === 'string') {
			path = path.trim().length === 0 ? [] : path.split('/');
		}

		loadPath(path);
	}

	$: mule = Mule.empty();
	$: sorter = SORTERS.ABC;

	$: {
		mule = mule.sort(sorter);
	}

	const handlePath = async (param) => {
		// console.log('path event...', param);
		const { detail: { path } } = param;
		const newURL = '/app/repo/' + repositoryName + '/code/' + path.join('/');
		await goto(newURL);
	};

	const openItem = (param) => {
		// console.log('openItem function is called', param);
	};

	const reload = () => {
		// console.log('Reload function is called');
	};

	onMount(() => {

		let viewMode: LayoutMode = REPOSITORY_FILE_LAYOUT.LIST;

		let cookieSubscribed = getCookie('COOKIE_SUBSCRIBED') === 'true';

		if (cookieSubscribed && getCookie(layoutViewId) !== undefined) {
			viewMode = getCookie(layoutViewId) as LayoutMode;
			setCookie(layoutViewId, viewMode);
		}

		repositoryStore.setLayoutMode(viewMode);
	});

</script>


<FileManager
	bind:path
	bind:mule
	bind:sorter
	on:reload={reload}
	on:pathEvent={handlePath}
	on:openItem={openItem}
/>