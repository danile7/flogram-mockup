<script lang='ts'>
	import { onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';
	import aiIDEStore from '$lib/store/aiIDE';
	import { commands } from '$lib/command_runner/commands';
	import Desktop from '$lib/components/pages/flogram-new-ide/Desktop.svelte';
	import Mobile from '$lib/components/pages/flogram-new-ide/Mobile.svelte';
	import CommandRunner from '$lib/command_runner/CommandRunner.svelte';

	export let data;

	let storeValue = get(aiIDEStore);
	let unsubscribe: any;

	const updateCodeValue = (codeValue: string) => {
		if (storeValue.codeValue !== codeValue) {
			aiIDEStore.setNewCode(codeValue);
		}
	};

	const updateTextValue = (textValue: string) => {
		if (storeValue.textValue !== textValue) {
			aiIDEStore.setNewEnglish(textValue);

		}
	};

	onMount(async () => {
		unsubscribe = aiIDEStore.subscribe((data) => (storeValue = data));
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	let width: number;
</script>

<svelte:window bind:innerWidth={width} />

{#if width >= 500}
	<Desktop
		textValue={storeValue.newEnglish}
		codeValue={storeValue.newCode}
		on:updateTextValue={({ detail }) => updateTextValue(detail)}
		on:updateCodeValue={({ detail }) => updateCodeValue(detail)}
	/>
{:else}
	<Mobile
		textValue={storeValue.newEnglish}
		codeValue={storeValue.newCode}
		on:updateTextValue={({ detail }) => updateTextValue(detail)}
		on:updateCodeValue={({ detail }) => updateCodeValue(detail)}
	/>
{/if}

<CommandRunner commands={$commands} />