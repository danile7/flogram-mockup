<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AsyncButton from '$lib/components/core/AsyncButton.svelte';
	import AppCodemirror from '$lib/components/core/AppCodemirror.svelte';
	import aiIDEStore from '$lib/store/aiIDE';
	import { layout_store } from '$lib/store/layout_store';
	import MdiMinimize from '~icons/mdi/minimize';
	import MdiSparkles from '~icons/mdi/sparkles';
	import IconParkOutlineText from '~icons/icon-park-outline/text';

	export let value: string = '';

	const dispatch = createEventDispatcher();
</script>

<div
	class="bg-back-1-light dark:bg-back-2-dark border-b border-white border-opacity-20 h-[41px] flex justify-between items-center px-[10px] py-0 gap-1"
>
	<div class="flex items-center gap-2 font-semibold">
		<IconParkOutlineText />
		<span class="whitespace-nowrap">Text Input</span>
	</div>

	<div class="flex items-center gap-2">
		<AsyncButton
			badged={ $aiIDEStore.newEnglish !== null && $aiIDEStore.newEnglish?.trim().length !== 0 && $aiIDEStore.oldEnglish !== $aiIDEStore.newEnglish}
			click={async () => {
				await aiIDEStore.generateCode();
			}}
			title="Generate Code (Ctrl+1)"
			loading={$aiIDEStore.isGeneratingCode}
			disabled={$aiIDEStore.isGeneratingCode}
		>
			<MdiSparkles />
		</AsyncButton>

		<button
			class="w-6 h-6 rounded hidden mobile:flex justify-center items-center bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10"
			on:click={layout_store.toggle_description}
			title="Minimize Text Input (Alt+T)"
		>
			<MdiMinimize class="text-base" />
		</button>
	</div>
</div>

<AppCodemirror {value} placeholderText = "Add two numbers" on:change={({ detail: { value } }) => dispatch('updateTextValue', value)} />
