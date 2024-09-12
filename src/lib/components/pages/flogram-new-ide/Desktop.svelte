<script lang="ts">
	import IDEHeader from '$lib/components/pages/flogram-new-ide/IDEHeader.svelte';
	import FileActions from '$lib/components/FileActions.svelte';
	import { layout_store } from '$lib/store/layout_store';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Editor from '$lib/components/Editor.svelte';
	import EnglishDescription from '$lib/components/EnglishDescription.svelte';
	import Terminal from '$lib/components/Terminal.svelte';

	export let codeValue: string = '';
	export let textValue: string = '';

	function handle_pane() {
		if (update_height) update_height();
	}

	$: {
		$layout_store.terminal;
		handle_pane();
	}

	let update_height: () => void;

	const min_size = 5;
</script>

<div class="grid grid-cols-[1fr] grid-rows-[auto_minmax(0,_1fr)] h-full">
	<IDEHeader />
	<main id="main">
		<Splitpanes on:ready={handle_pane} on:resized={handle_pane}>
			<Pane bind:size={$layout_store.file_tree}>
				<FileActions {min_size} />
			</Pane>
			<Pane minSize={min_size}>
				<Splitpanes on:ready={handle_pane} on:resized={handle_pane}>
					<Pane minSize={min_size}>
						<Splitpanes horizontal on:ready={handle_pane} on:resized={handle_pane}>
							<Pane minSize={min_size}>
								<Splitpanes on:ready={handle_pane} on:resized={handle_pane}>
									<Pane
										bind:size={$layout_store.description}
										class="relative grid grid-rows-[min-content_1fr_min-content]"
									>
										<EnglishDescription value  = {textValue} on:updateTextValue/>
									</Pane>
									<Pane minSize={10} class="relative grid grid-rows-[min-content_1fr_min-content] ">
										<Editor value = {codeValue} on:updateCodeValue/>
									</Pane>
								</Splitpanes>
							</Pane>
							<Pane bind:size={$layout_store.terminal}>
								<Terminal bind:update_height/>
							</Pane>
						</Splitpanes>
					</Pane>
				</Splitpanes>
			</Pane>
		</Splitpanes>
	</main>
</div>
