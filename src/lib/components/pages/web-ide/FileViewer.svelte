<script lang="ts">
	import { ListType } from '$lib/types/List';
	import type { List } from '$lib/types/List';
	import { env } from '$env/dynamic/public';
	import { getObjectTypeFromURL, removeFileTypeFromURL, replaceSlashfromURL } from '$lib/util';
	import type { File } from '../../../types/Library';
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import themeStore from '$lib/store/theme';
	import fetchAPI from '$lib/services/fetchAPI';

	let open_folders: string[] = [];
	let lists: List[] = [];
	let isLoading = true;
	let isFile = false;
	let source: string = '';
	let isProjectFindList = false;
	let fileList: string[] = [];
	export let content: string = '',
		currentFile = '';
	export let browserSave = () => {},
		runner = () => {};
	let intervalId,
		lastCheck = Date.now();

	const changeFolderStatus = (folder_name: string) => {
		if (open_folders.includes(folder_name)) {
			open_folders = open_folders.filter((folder) => folder != folder_name);
		} else {
			open_folders = [...open_folders, folder_name];
		}
	};
	const changeCurrentFile = (file: File) => {
		currentFile = file.path;
		content = file.data;
		lastCheck = Date.now();
		browserSave();
	};
	const createFile = () => {
		isCreatingFile = true;
		fileInput && fileInput.focus();
	};
	const submitFile = (e) => {
		e.preventDefault();
		let file = {
			path: fileInput.value,
			type: 'create',
			data: `# ${fileInput.value} -- Inside Flogram`
		};
		files = [...files, file];
		changeCurrentFile(file);
		isCreatingFile = false;
		fileInput.value = '';
	};
	let fileInput;
	let isCreatingFile = false;
	export let files: File[] = [];
	export let initialFiles: File[] = [];
	export let data: any = {};

	$: {
		files.forEach((file) => {
			if (file.path == currentFile) {
				file.data = content;
			}
		});
	}

	const fetchList = async () => {
		try {
			isLoading = true;
			isFile = false;
			source = '';
			let type = '';
			if (!data.path) type = ListType.FOLDER;
			else type = getObjectTypeFromURL(data);
			const response = await fetchAPI.get(
				`${env.PUBLIC_FLOGRAM_API_URL}/libraries/list/${data.name}/${
					data.path === '' ? 'root' : replaceSlashfromURL(removeFileTypeFromURL(data, type))
				}`,
				{
					params: { type }
				}
			);
			if (typeof response === 'object' && response.type === 'file') {
				isFile = true;
				source = response.data.content;
				isLoading = false;
				return;
			}
			if (Array.isArray(response) && !response.length) {
				lists = [];
			} else lists = response;
			isLoading = false;
		} catch (error) {
			isLoading = false;
		}
	};
	const goToFile = async () => {
		try {
			isLoading = true;
			const response = await fetchAPI.get(
				`${env.PUBLIC_FLOGRAM_API_URL}/libraries/get-file-list/${data.name}`
			);
			if (response.status == 200 && response.data && response.data.length) {
				fileList = response.data;
				isProjectFindList = true;
			} else fileList = [];
			isLoading = false;
		} catch (error: any) {
			if (error.response.status == 401) {
				goto('/app/auth/signin');
			}
			console.log(error);
		}

		if (fileList.length > 0) {
			files = [];
			try {
				fileList.forEach(async (element) => {
					const data = await fetchAPI.get(
						`${env.PUBLIC_FLOGRAM_API_URL}/libraries/file/${element}`
					);
					files = [...files, { path: element.split('/')[4], type: 'change', data }];
					initialFiles = files;
				});
			} catch {
				console.log('Error Occurring');
			}
		}
	};

	const goToCommit = async () => {
		try {
			isLoading = true;
			const responsefiles = await fetchAPI.get(
				`${env.PUBLIC_FLOGRAM_API_URL}/commits/get-commit-files/${data.commit.split('/')[1]}`
			);
			if (responsefiles && responsefiles.length) {
				files = [];
				files = responsefiles;
				files = [];
				files = responsefiles;
				initialFiles = files;

				isProjectFindList = true;
			} else fileList = [];
			isLoading = false;
		} catch (error: any) {
			console.log(error);
			toast.error(error.response.data.message);
			setTimeout(() => goto(`/ide/${data.name}`), 2000);
		}
	};
	onMount(async () => {
		try {
			if (data.commit) {
				if (data.commit.split('/').length == 2 || !data.commit.includes('commit/')) {
					await goToCommit();
				} else {
					toast.error('Specified commit not found. Taking you back to last push!');
					setTimeout(() => goto(`/ide/${data.name}`), 2000);
				}
			} else {
				await goToFile();
			}
		} catch {
			toast.error('Error occurred');
		}

		if (typeof window !== 'undefined') {
			intervalId = window.setInterval(function () {
				let newDate = Date.now();
				if (Math.abs(newDate - lastCheck) / 1000 > 19) {
					runner();
					lastCheck = Date.now();
				}
			}, 1000);
		}
	});

	$: if (currentFile) {
		runner();
	}
	let route = $page.routeId;
	$: $page.routeId != route && clearInterval(intervalId);
	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<div class="w-full flex flex-col dark:text-[#c7d0d8] gap-0">
	<div class="flex justify-end px-2 gap-2.5 pt-2 pb-1 hover:dark:bg-[#2a3036] hover:bg-gray-100">
		<img
			on:click={createFile}
			class="h-[1.05rem] w-[1.1rem] object-fill self-center cursor-pointer"
			src="/file-create.svg"
			alt=""
		/>
		<img class="h-4 w-4 object-contain self-center cursor-pointer" src="/folder-add.svg" alt="" />
		<img class="h-4 w-4 object-contain self-center cursor-pointer" src="/reload.svg" alt="" />
	</div>
	<div class={`${isCreatingFile ? '' : 'h-0 w-0 absolute'}px-4 flex justify-end`}>
		<form on:submit={submitFile}>
			<input
				bind:this={fileInput}
				type="text"
				class="text-xs focus:outline-none border border-zinc-500 bg-[#212529] px-1 py-0.5"
			/>
		</form>
	</div>
	{#each files as file}
		<div
			class={`${
				file.path == currentFile ? 'dark:bg-[#1a1e25] bg-gray-100' : ''
			} py-1 pl-4 flex gap-2 cursor-pointer font-code`}
			on:click={() => {
				changeCurrentFile(file);
			}}
		>
			<svg
				class="self-center"
				aria-label="File"
				fill={`${$themeStore.mode == 'dark' ? '#c7d0d8' : '#1a1e25'}`}
				aria-hidden="true"
				height="16"
				viewBox="0 0 16 16"
				version="1.1"
				width="16"
				data-view-component="true"
			>
				<path
					fill-rule="evenodd"
					d="M3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011zM2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z"
				/>
			</svg>
			<span>{file.path}</span>
		</div>
	{/each}
</div>
