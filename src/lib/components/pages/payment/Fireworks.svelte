<script lang="ts">
	import { Fireworks } from '@fireworks-js/svelte';
	import type { FireworksOptions } from '@fireworks-js/svelte';
	import { onMount } from 'svelte';

	let fw: Fireworks;
	let mounted = true;
	let options: FireworksOptions = {
		opacity: 0.5
	};

	function toggleFireworks() {
		const fireworks = fw.fireworksInstance();
		if (fireworks.isRunning) {
			fireworks.waitStop();
		} else {
			fireworks.start();
		}
	}

	onMount(() => {
		const fireworks = fw.fireworksInstance();
	});
</script>

<main>
	{#if mounted}
		<Fireworks bind:this={fw} {options} class="fireworks" />
	{/if}
</main>

<style>
	:global(.fireworks) {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		background: transparent;
	}
</style>
