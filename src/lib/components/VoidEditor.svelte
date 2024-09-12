<script lang="ts">
	import File from '~icons/material-symbols/unknown-document-rounded';
	export let loading:boolean = false;
</script>

{#if !loading}
	<div class="bg-back-2-light dark:bg-back-1-dark text-lg h-full flex flex-col justify-center items-center gap-8 text-center ">
		<div class ="text-3xl font-bold text-primary gap-4 flex items-center"><div>FLOGRAM IDE</div> <File/></div>
		<div class="flex flex-col items-center justify-center gap-2">
			<div class = "text-lg font-semibold flex items-center"><span class = "text-2xl">🎈</span> Welcome to Flogram IDE <span class = "text-2xl">🎈</span></div>
			<div>Short Key Lists</div>
			<div>Ctrl + B: toggle File Explorer</div>
			<div>Ctrl + `: toggle Terminal</div>
			<div>Alt + T: toggle Text Input</div>
			<div>Ctrl + P: Search Files</div>
			<div>Ctrl + K : Command Runner</div>
			<div>Ctrl + Alt + D: Search flogram documentation</div>
			<div>Ctrl + R: Compile current tab code</div>
			<div>Ctrl + 1: Generate code from text input</div>
		</div>
	</div>
{:else}
	<div class = "text-lg h-full flex flex-col justify-center items-center gap-8 text-center row-[1/-1] items-centter">Loading...</div>
{/if}
