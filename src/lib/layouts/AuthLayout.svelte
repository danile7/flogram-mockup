<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import AuthHeader from './AuthHeader.svelte';
	import Footer from './Footer.svelte';
	import themeStore from '$lib/store/theme';
	import config from '$lib/util/config';

	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim';

	let particlesConfig = { ...config.particle.dark };

	$: {
		particlesConfig =
			$themeStore.mode === 'dark' ? { ...config.particle.dark } : { ...config.particle.light };
	}

	let onParticlesLoaded = (event) => {
		const particlesContainer = event.detail.particles;

	};

	void particlesInit(async (engine) => {
		await loadSlim(engine);
	});

	onMount(() => {
		let unsubscribe = page.subscribe(({ path }) => {
			particlesConfig =
				$themeStore.mode === 'dark' ? { ...config.particle.dark } : { ...config.particle.light };
		});
		return () => {
			unsubscribe();
		};
	});
</script>

<div>
	<AuthHeader />
	<slot />
	<Particles
			id="tsparticles"
			class=""
			style=""
			options="{particlesConfig}"
			on:particlesLoaded="{onParticlesLoaded}"
	/>
	<Footer />
</div>

<style>
	:global(#tsparticles) {
		margin: 0;
		padding: 0;
		position: absolute;
		width: 100vw;
		height: 200vh;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: -1;
	}

	@media screen and (min-width: 768px) {
		:global(#tsparticles) {
			height: 200vh;
		}
	}
</style>
