<script lang='ts'>
	import { createEventDispatcher, onMount } from 'svelte';
	import { withCodemirrorInstance } from '@neocodemirror/svelte';
	import { current_tab } from '$lib/tabs';
	import { webcontainer } from '$lib/webcontainer';
	import { on_command } from '$lib/command_runner/commands';
	import AppCodemirror from '$lib/components/core/AppCodemirror.svelte';
	import VoidEditor from '$lib/components/VoidEditor.svelte';
	import Tabs from './Tabs.svelte';
	import ImageFromBytes from './ImageFromBytes.svelte';
	import aiIDEStore from '$lib/store/aiIDE';
	import { editor_config } from '$lib/store/editor_config_store';

	export let value: string = '';

	const dispatch = createEventDispatcher();
	let image_bytes: Uint8Array;

	function read_current_tab(tab: string, is_image: boolean) {
		if (!tab) return;
		if (is_image) {
			webcontainer.read_file(tab, false).then((file) => {
				image_bytes = file;
			});
			return;
		}
		webcontainer.read_file(tab).then((file) => {
			aiIDEStore.setOldCode(file);
			aiIDEStore.setNewCode(file);
		});
	}

	$: current_lang = $current_tab.split('.').at(-1) ?? 'python';
	$: is_image = ['png', 'bmp', 'jpg', 'jpeg', 'gif', 'webp'].includes(current_lang);
	$: read_current_tab($current_tab, is_image);

	on_command('format-current', () => {
		read_current_tab($current_tab, is_image);
	});

	onMount(() => {
		return webcontainer.on_fs_change('deletion', (path) => {
			$codemirror_instance.documents.delete(path);
		});
	});

	export const codemirror_instance = withCodemirrorInstance();

	const handleChange = (value: string) => {
		webcontainer.update_file($current_tab, value);
		dispatch('updateCodeValue', value);
	};
</script>

<Tabs />
{#if is_image}
	<ImageFromBytes {image_bytes} type={current_lang} />
{:else if $editor_config.is_open_help && $editor_config.is_help_active}
	<VoidEditor />
{:else if $current_tab}
	<AppCodemirror
		value={value}
		current_lang={current_lang}
		on:change={({ detail: { value } }) => handleChange(value)}
	/>
{:else}
	<VoidEditor/>
{/if}