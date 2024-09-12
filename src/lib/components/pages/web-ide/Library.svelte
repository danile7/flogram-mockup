<script lang="ts">
	import {
		Parser,
		Tokenizer,
		Compiler,
		MemoryManager,
		Draw,
		Dates,
		SIMPLE_IMPORTS
	} from '@munezero/floparser';
	import toast from 'svelte-french-toast';
	import CodeMirror from './CodeMirror.svelte';
	import FileViewer from './FileViewer.svelte';
	import { env } from '$env/dynamic/public';
	import { clickOutside, format_date } from '$lib/util';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { IRepresentation } from '$lib/parser/types';
	import type { Commit } from '$lib/types/Commit';
	import type { File } from '$lib/types/Library';
	import ErrorsDisplayer from './ErrorsDisplayer.svelte';

	let failures: any[] = [],
		representation: IRepresentation | null;
	let push;
	let is_publish = false;
	let commits: Commit[] = [];

	let save_message: string = '',
		addingMessage = false,
		seen = false,
		viewingCommits = false,
		loading = false;

	let value: string = '';
	let fileName: string = 'Module.flo';
	const ENCODER = new TextEncoder();

	let changes = [
		{
			title: 'Patches',
			number: 4
		},
		{
			title: 'Internal Changes',
			number: 3
		},
		{
			title: 'New Features',
			number: 2
		},
		{
			title: 'Breaking Changes',
			number: 1
		}
	];
	let update_number;
	const update = (num) => {
		update_number = num;
	};

	export let data;

	const runCode = async () => {
		failures = [];

		const tokenizer = new Tokenizer();

		const parser = Parser.create({
			path: fileName,
			files: files,
			Tokenizer: Tokenizer,
			imports: SIMPLE_IMPORTS
		});

		parser.on(Parser.EVENT_FAIL, (failure) => {
			failures = [...failures, failure];
			representation = null;
		});

		parser.on(Parser.EVENT_DONE, (data) => {
			representation = data;
		});

		tokenizer.on('token', (position, array, index, length) => {
			parser.feed(position, array, index, length);
			// parser.feed(position, buffer, index, length);
		});

		tokenizer.feed(ENCODER.encode(value));

		tokenizer.done();

		// feed complete, call 'done'
		parser.done();

		const execute = async (glue, module) => {
			let key;
			for (const [iKey, value] of Object.entries(glue.procedures)) {
				const { name, path } = value;
				if (name === 'main' && path === fileName) {
					key = iKey;
					break;
				}
			}
			if (key) {
				const memory = new WebAssembly.Memory({
					initial: 128
				});

				const state = MemoryManager(memory);
				const drawer = Draw(memory, outputElement);
				const dates = Dates();

				const outputElement = document && document.getElementById('output');
				if (outputElement) {
					outputElement.innerHTML = '';
				}
				if (!outputElement) {
					toast.error("Output element not found. Click 'Run' again for re-evaluation");
				}

				const descriptionImports = Object.freeze({
					imports: {}
				});

				const memoryImport = 'memory';

				Object.keys(glue.imports).forEach((importKey) => {
					if (state[importKey]) {
						descriptionImports.imports[importKey] = state[importKey];
					}
					if (drawer[importKey]) {
						descriptionImports.imports[importKey] = drawer[importKey];
					}
					if (dates[importKey]) {
							descriptionImports.imports[importKey] = dates[importKey];
						}
					if (importKey === memoryImport) {
						descriptionImports.imports[importKey] = memory;
					}
				});
				const moduleCompiled = await WebAssembly.compile(module);
				const moduleInstance = await WebAssembly.instantiate(moduleCompiled, descriptionImports);

				const procedure = moduleInstance.exports[key];
				if (procedure) {
					procedure();
				}
			}
		};

		if (representation) {
			const compilerOptions = Object.freeze({
				memory: true,
				draws: true
			});

			const [glue, module] = Compiler.compile(representation, compilerOptions);
			await execute(glue, module);
		}
	};

	let files: File[] = [];
	let initialFiles: File[] = [];

	async function saveCode(e) {
		if (e) e.preventDefault();
		if (save_message) {
			if (is_publish && !update_number) {
				toast.error('Publish effect is required!');
				return;
			}
			addingMessage = false;
			if (typeof window !== 'undefined') {
				try {
					// axios.defaults.headers.common['Authorization'] =
					// 	'Bearer ' + localStorage.getItem('access_token');
					// const saved = await axios.post(`${env.PUBLIC_FLOGRAM_API_URL}/commits`, {
					// 	libraryId: data.library.id,
					// 	name: save_message,
					// 	patches: files,
					// 	is_publish,
					// 	updateNumber: update_number
					// });
					save_message = '';
					toast.success(`Saved${is_publish ? ' and Published' : ''}!`);
				} catch (e: any) {
					toast.error(`${e.response.data.message}`);
				}
			}
		} else {
			toast.error('Commit message is required.');
		}
	}

	let browserSave = () => {
		if (typeof localStorage != 'undefined') {
			localStorage.setItem(
				'code_state',
				JSON.stringify({
					libraryId: data.library.id,
					name: save_message,
					patches: files
				})
			);
		}
	};
	function addMessage() {
		if (data.commit) {
			toast.error(
				"Can't push changes on specific push. All you can do is revert before making changes."
			);
		} else {
			if (!seen) {
				toast(
					'Immediate changes are saved locally in our browser. Click push for changes to be applied on remote server.',
					{
						icon: 'ℹ',
						duration: 5000
					}
				);
				seen = true;
				if (typeof window !== 'undefined') {
					localStorage.setItem('seen', 'true');
				}
			}
			addingMessage = true;
		}
	}

	const load = () => {
		viewingCommits = true;
		loadcommits();
	};
	const loadcommits = () => {
		loading = true;
		if (typeof window !== 'undefined') {
			// axios.defaults.headers.common['Authorization'] =
			// 	'Bearer ' + localStorage.getItem('access_token');
			// axios
			// 	.get(`${env.PUBLIC_FLOGRAM_API_URL}/commits/get-library-commits/${data.library.id}`)
			// 	.then((data) => {
			// 		commits = data.data;
			// 		loading = false;
			// 	})
			// 	.catch((e) => {
			// 		toast.error(e.response.data.message);
			// 	});
		}
	};
	const loadCommit = async (id) => {
		try {
			// axios
			// 	.get(`${env.PUBLIC_FLOGRAM_API_URL}/commits/${id}`)
			// 	.then((load) => {
			// 		push = load.data;
			// 	})
			// 	.catch((err) => {
			// 		toast.error('Error occurred; retrying...');
			// 	});
		} catch {
			toast.error('Error Occurred');
		}
	};

	const changeCommit = async (id) => {
		goto(`/ide/${data.name}/commit/${id}`);
		value = '';
		viewingCommits = false;
	};
	onMount(() => {
		if (localStorage.getItem('seen')) {
			seen = true;
		}
		if (data.commit) {
			loadCommit(data.commit.split('/')[1]);
		}
	});
	$: if (data.commit) {
		loadCommit(data.commit.split('/')[1]);
		// axios
		// 	.get(`${env.PUBLIC_FLOGRAM_API_URL}/commits/get-commit-files/${data.commit.split('/')[1]}`)
		// 	.then((response) => {
		// 		files = response.data;
		// 	})
		// 	.catch((e) => {
		// 		toast.error(e.data.response.message);
		// 	});
	}
	const initialPush = {
		breakingChangeNumber: 0,
		newFeatureNumber: 0,
		internalChangeNumber: 0,
		patchesNumber: 0
	};
	let newVersion =
		data.library.publishes?.length > 0
			? data.library.publishes[data.library.publishes.length - 1]
			: initialPush;
</script>

<div class="relative">
	<div class="absolute w-screen h-screen pt-0 grid grid-cols-1 md:grid-cols-12 dark:bg-gray-400">
		<div class="md:col-span-3 dark:bg-[#212529] flex flex-col pb-10 overflow-y-auto">
			<div
				class="w-full py-5 flex justify-center px-4 dark:bg-[#29303d] bg-gray-100 pb-5 sticky top-0"
			>
				<input
					value={data.library.name}
					class={`w-full font-nunito text-lg font-semibold flex px-3 py-2 dark:bg-white bg-[#29303d] dark:text-black text-white focus:outline-none`}
				/>
			</div>
			<div class="w-full flex justify-start">
				<FileViewer
					bind:content={value}
					bind:currentFile={fileName}
					bind:initialFiles
					bind:files
					bind:browserSave
					runner={runCode}
					bind:data
				/>
			</div>
		</div>
		<div class="md:col-span-5 dark:bg-[#292c34] bg-[#e1e2e8] overflow-y-auto">
			<div
				class={`w-full py-3 flex items-center dark:bg-[#29303d] bg-gray-50 px-4 mb-4 gap-3 ${
					data.commit ? 'justify-center' : 'justify-start'
				}`}
			>
				{#if data.commit}
					<button
						class="ml-3 font-nunito border-2 border-[#385db2] text-gray-100 px-3 py-1 self-center"
						on:click={() => goto(`/ide/${data.name}`)}>back to latest</button
					>
					<p class="text-gray-100">{`Push: ${push?.name}`}</p>
					<button class="font-nunito border-2 border-[#8138b2] text-gray-100 px-3 py-1 self-center"
						>revert here</button
					>
				{:else}
					<p class="text-xl dark:text-white font-nunito font-bold">editor</p>
				{/if}
			</div>
			<CodeMirror bind:value />
		</div>
		<div class="md:col-span-4 dark:bg-[#2e323a] overflow-y-auto">
			<div
				class="w-full py-3 flex items-center justify-end dark:bg-[#29303d] bg-gray-100 px-4 sticky top-0 gap-3"
			>
				<div class="relative border-2 border-primary-teal flex gap-2 px-2">
					<button class="dark:text-gray-100 font-nunito py-1 px-3" on:click={runCode}>Run</button>
				</div>
				<div class="relative border-2 border-[#385db2] flex gap-2 px-2">
					<button class="dark:text-gray-100 font-nunito py-1 px-3" on:click={load}> Load </button>
				</div>
				<div class="relative border-2 border-[#8138b2] flex gap-2 px-2">
					<button class="dark:text-gray-100 font-nunito py-1 px-3" on:click={addMessage}>
						Push
					</button>
				</div>
			</div>
			{#if representation}
				<div class="px-3 py-6 flex flex-col gap-3 text-lg">
					<p
						class="border-2 border-green-500 text-center px-3 py-2 text-white dark:text-gray-100 text-lg bg-green-500"
					>
						{'Success: Code Compiled!'}
					</p>
					<div class="text-lg text-charcoal dark:text-gray-300 italic font-code">
						<p class=" px-2 py-1 text-lg text-center">Logs:</p>
						<div id="output" class="px-4 py-2 dark:text-gray-400" />
					</div>
				</div>
			{:else if failures.length > 0}
				<div class="px-3 py-6 flex flex-col gap-3">
					<p class="bg-red-500 text-gray-200 text-center px-3 py-2 text-lg">
						{'Syntax Error: Code Not Compiled!'}
					</p>
					<ErrorsDisplayer {failures} />
				</div>
			{/if}
		</div>
	</div>
</div>
{#if addingMessage}
	<div
		class="absolute bg-[#29303d] bg-opacity-90 h-screen w-screen flex justify-center items-center"
	>
		<form
			on:submit={saveCode}
			class="relative bg-white px-6 py-6 flex flex-col gap-3"
			use:clickOutside
			on:click_outside={() => {
				addingMessage = false;
			}}
		>
			<h1 class="text-2xl font-semibold font-nunito">Change message</h1>
			<input
				bind:value={save_message}
				class={`w-full flex px-3 py-2 bg-white focus:outline-none border-2 border-[#29303d] md:w-80`}
			/>
			<div class="flex gap-2 cursor-pointer" on:click={() => (is_publish = !is_publish)}>
				<div class="h-5 w-5 self-center border-2 border-[#29303d]">
					{#if is_publish}
						<img src="/btick.svg" alt="no found" />
					{/if}
				</div>
				<p>Publish this version</p>
			</div>
			{#if is_publish}
				<div class="flex flex-col py-3">
					<h3 class="font-nunito text-xl font-medium">
						What kind of change does this version make?
					</h3>
					<div class="flex flex-col gap-2">
						{#each changes as change}
							<div class="flex gap-2 cursor-pointer" on:click={() => update(change.number)}>
								<div class="p-0.5 border-[1.5px] border-[#29303d] self-center">
									<div class={`w-2 h-2 ${update_number == change.number && 'bg-[#29303d]'}`} />
								</div>
								<p class="text-sm">{change.title}</p>
							</div>
						{/each}
					</div>
				</div>
				<div class="">
					{`v${
						update_number == 1
							? newVersion.breakingChangeNumber + 1
							: newVersion.breakingChangeNumber
					}:${update_number == 2 ? newVersion.newFeatureNumber + 1 : newVersion.newFeatureNumber}:${
						update_number == 3
							? newVersion.internalChangeNumber + 1
							: newVersion.internalChangeNumber
					}:${update_number == 4 ? newVersion.patchesNumber + 1 : newVersion.patchesNumber}`}
				</div>
			{/if}
			<button
				type="submit"
				class="focus:outline-none font-nunito bg-[#29303d] text-gray-100 px-3 py-1.5 text-lg"
				>Save</button
			>
			<div
				class="absolute -right-6 cursor-pointer -top-6 p-1 bg-[#29303d]"
				on:click={() => (addingMessage = false)}
			>
				<img class="h-8 w-8" src="/close.svg" alt="" />
			</div>
		</form>
	</div>
{/if}
{#if viewingCommits}
	<div
		class="absolute bg-[#29303d] bg-opacity-90 h-screen w-screen flex justify-center items-center"
	>
		<div
			use:clickOutside
			on:click_outside={() => (viewingCommits = false)}
			class="flex flex-col gap-0 bg-white"
		>
			<div class="px-3 py-2 border-b border-[#29303d]">
				<p class="text-xl text-[#29303d] font-semibold py-2 text-center font-nunito">
					All pushes made
				</p>
			</div>
			{#if loading}
				<div class="">
					<p class="text-center px-4 py-3">Loading ...</p>
				</div>
			{/if}
			{#if commits.length > 0}
				<div class="flex flex-col gap-0 max-h-[calc(100vh-200px)] overflow-y-auto">
					{#each commits as commit}
						<div
							class="flex gap-3 cursor-pointer hover:bg-[#e3e5e8] px-4 py-3 transition-all"
							on:click={() => changeCommit(commit.id)}
						>
							<p class="text-black text-md">{commit.name}</p>
							<p class="text-sm text-gray-600 self-center">{format_date(commit?.createdAt)}</p>
							<p class="text-sm text-gray-800 self-center cursor-pointer">
								by {commit.author?.username || 'User'}
							</p>
						</div>
					{/each}
				</div>
			{:else}
				<div class="px-3 py-6">
					<p class="text-lg font-nunito">No history found for this libary</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
