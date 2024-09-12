<script lang="ts">
	import FileActions from '$lib/components/FileActions.svelte';
	import { mobile_showing, showing_files } from '$lib/store/mobile_showing_store';
	import { Dialog as RawDialog } from 'as-comps';
	import { SvelteComponent, tick, type ComponentType } from 'svelte';
	import { fly } from 'svelte/transition';
	import IDEHeader from './IDEHeader.svelte';
	import MobileFooter from './MobileFooter.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import EnglishDescription from '$lib/components/EnglishDescription.svelte';
	import Terminal from '$lib/components/Terminal.svelte';


	export let textValue : string = '';
	export let codeValue : string = '';

	let update_height: () => void;

	$: handle_showing_change($mobile_showing);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async function handle_showing_change(_: typeof $mobile_showing) {
		await tick();
		if (update_height) update_height();
	}
	let width: number;
</script>

<svelte:window bind:innerWidth={width} />

<div class="grid grid-cols-[1fr] grid-rows-[auto_minmax(0,_1fr)] h-full">
	<IDEHeader mobile />
	<main id="main" >
		<RawDialog
			bind:isOpen={$showing_files}
			noCloseButton
			includedTrigger={false}
			dialogIn={fly}
			dialogOut={fly}
			dialogInOptions={{ x: -500 }}
			dialogOutOptions={{ x: -500 }}
			autofocus={false}
			--as-dialog-padding="0"
			--as-dialog-top="calc(50% + 88px)"
			--as-dialog-overflow="visible"
			--as-dialog-left="0"
			--as-dialog-right="auto"
			--as-dialog-transform="translateY(-50%)"
			--as-dialog-border-radius="0"
			--as-dialog-width="calc(100% - 4em)"
			--as-dialog-max-width="800px"
			--as-dialog-height="100%"
			--as-dialog-max-height="calc(100% - 2em)"
		>
			<FileActions mobile />
		</RawDialog>
		<div class="grid grid-rows-[min-content_1fr_min-content] relative" class:hidden={$mobile_showing !== 'code'}>
			<Editor value = {codeValue} on:updateCodeValue />
		</div>
		<div  class ="bg-back-1-light dark:bg-back-1-dark" class:hidden={$mobile_showing !== 'iframe'}>
			<EnglishDescription bind:update_height value = {textValue} on:updateTextValue />
		</div>
		<div class:hidden={$mobile_showing !== 'terminal'}>
			<Terminal bind:update_height />
		</div>
	</main>
	<MobileFooter />
</div>

<style>

	main,
	div {
		width: 100%;
		height: 100%;
		max-width: 100vw;
	}
	
</style>
