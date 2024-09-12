<script lang="ts">
	import toast from 'svelte-french-toast';
	import {
		Parser,
		Tokenizer,
		Compiler,
		MemoryManager,
		Draw,
		Dates,
		SIMPLE_IMPORTS
	} from '@munezero/floparser';
	import { onMount } from 'svelte';
	import type { IRepresentation } from '$lib/parser/types';
	import CodeMirror from '$lib/components/pages/web-ide/CodeMirror.svelte';
	import ErrorsDisplayer from '$lib/components/pages/web-ide/ErrorsDisplayer.svelte';
	import { getCookie, setCookie } from '$lib/util';
	import Button from '@smui/button';
	import { Icon } from '@smui/tab';
	import config from '$lib/util/config';
	import AppIconButton from '$lib/components/core/AppIconButton.svelte';
	import MingcuteDownLine from '~icons/mingcute/down-line';
	import MingcuteUpLine from '~icons/mingcute/up-line';

	const helpContent = config.ide.help;

	export let initialValue: string = ``;

	let value: string = ``;

	$: {
		value = initialValue;
		output = '';
		failures = [];
	}

	let output: string = ``;

	let closed = true;

	const ENCODER = new TextEncoder();

	let outputElement = null;

	let failures: any[] = [],
		representation: IRepresentation | null;

	let isTerminalOpen = true;

	let toggleTerminal = () => (isTerminalOpen = !isTerminalOpen);

	const runCode = async () => {
		// outputElement = document && document.getElementById('output');

		output = '';

		failures = [];

		const tokenizer = new Tokenizer();

		const parser = Parser.create({
			path: 'Module',
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
		});

		tokenizer.feed(ENCODER.encode(value));

		tokenizer.done();

		parser.done();

		const execute = async (glue, module) => {
			let key;
			for (const [iKey, value] of Object.entries(glue.procedures)) {
				const { name, path } = value;
				if (name === 'main' && path === 'Module') {
					key = iKey;
					break;
				}
			}
			if (key) {
				try {
					const memory = new WebAssembly.Memory({
						initial: 128
					});

					const state = MemoryManager(memory);
					const drawer = Draw(memory, outputElement);
					const dates = Dates();

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
						if (!outputElement) {
							toast.error("Output element not found. Click 'Run' again for re-evaluation");
						}
						if (outputElement) {
							outputElement.innerHTML = '';
						}
						procedure();

						output = outputElement.innerHTML;
						toast.success('Compile success! 😀');
					}
				} catch (e) {
					toast.error('COMPILATION ERROR OCCURRED😔');
					console.log(e.message);
				}
			}
		};

		if (representation) {
			// console.log('❤', output, outputElement, outputElement.innerHTML);
			const compilerOptions = Object.freeze({
				memory: true
			});

			const [glue, module] = Compiler.compile(representation, compilerOptions);
			await execute(glue, module);
		}
	};

	const closeIDEGuide = () => {

		let cookieSubscribed = getCookie('COOKIE_SUBSCRIBED') === 'true';

		if (cookieSubscribed) {
			setCookie('ide-guide-off', 'true');
		}
		closed = true;
	};

	const clearOutput = () => {
		output = '';
		failures = [];
		toast.success('cleared');
	};

	onMount(() => {
		closed = getCookie('ide-guide-off') !== undefined;
		output = '';
	});
</script>

<div
	class="w-full h-full flex flex-col relative overflow-hidden overflow-y-auto light:text-gray-900 dark:text-gray-300 border-l border-t dark:border-white dark:border-opacity-10"
	style="background: var(--sk-back-1)"
>
	<div
		class={`${
			isTerminalOpen ? 'basis-1/2' : 'basis-full'
		} min-h-[400px] border-b dark:border-white dark:border-opacity-10 lg:border-r lg:border-black lg:border-opacity-10 dark:lg:border-white dark:lg:border-opacity-10 flex flex-col transition-all duration-200`}
	>
		<div
			class="border-b border-black dark:border-white border-opacity-10 dark:border-opacity-10 p-1 px-2 flex justify-between items-center bg-gray-200 dark:bg-gray-800 text-[#13A6C7]"
		>
			<Icon class="material-icons">code</Icon>
			<Button variant="outlined" on:click={() => runCode()}>Run</Button>
		</div>
		<div class="text-base xl:text-lg flex-grow relative">
			<div class="absolute w-full h-full overflow-y-auto">
				<CodeMirror bind:value />
			</div>
		</div>
	</div>

	<div
		class="flex-grow border-b dark:border-white dark:border-opacity-10 lg:border-r dark:lg:border-white dark:lg:border-opacity-10 flex flex-col transition-all duration-200 overflow-hidden"
		class:overflow-y-auto={isTerminalOpen}
	>
		<div
			class="border-b border-black dark:border-white border-opacity-10 dark:border-opacity-10 p-1 px-2 flex justify-between items-center text-[#13A6C7] bg-gray-200 dark:bg-gray-800"
		>
			<Icon class="material-icons">terminal</Icon>

			<AppIconButton  icon = {isTerminalOpen ? MingcuteDownLine : MingcuteUpLine} handleClick={() => toggleTerminal()}/>

			<Button variant="outlined" on:click={() => clearOutput()}>clear</Button>
		</div>

		{#if representation && isTerminalOpen}
			<div class="flex flex-col gap-3 text-base xl:text-lg">
				<div class="text-md text-charcoal dark:text-gray-300 font-code">
					<div class="px-4 py-2 dark:text-gray-400">{@html output}</div>
				</div>
			</div>
		{:else if failures.length > 0 && isTerminalOpen}
			<div class="px-3 py-6 flex flex-col gap-3">
				<p class="bg-red-500 text-gray-200 text-center px-3 py-2 text-lg">
					{'Syntax Error: Code Not Compiled!'}
				</p>
				<ErrorsDisplayer {failures} />
			</div>
		{/if}
	</div>

	{#if !closed}
		<div
			class="absolute z-50 border border-black border-opacity-30 dark:border dark:border-primary px-5 py-5 bottom-4 right-4 md:w-[25em] dark:shadow-md dark:bg-white dark:bg-opacity-5 shadow-lg"
		>
			<h3 class="text-charcoal dark:text-gray-200 text-lg text-gabarito font-semibold">
				{helpContent && helpContent.title}
			</h3>
			<p class="text-charcoal dark:text-gray-200 text-md mb-4">
				{@html helpContent && helpContent.content}
			</p>
			<Button variant = "raised" on:click={() => closeIDEGuide()}>Ok, got it!</Button>
		</div>
	{/if}
</div>

<div id="output" class="hidden" bind:this={outputElement} />
