<script lang='ts'>
	import Header from './Header.svelte';
	import themeStore from '$lib/store/theme';


	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim';


	export let header = true;

	let darkConfig = {
		fpsLimit: 100,
		particles: {
			color: {
				value: '#234E70'
			},
			shape: {
				type: 'circle'
			},
			size: {
				value: 3, // average size
				random: true, // enable random sizing
				anim: {
					enable: true,
					speed: 3,
					size_min: 1, // minimum size
					size_max: 6, // maximum size
					sync: false
				}
			},
			move: {
				enable: true,
				speed: 0.5,
				outMode: 'bounce' // or "out"
			}
		},
		interactivity: {
			events: {
				onClick: {
					enable: true,
					mode: 'push'
				}
			}
		},
		fullScreen: false,
		background: {
			color: {
				value: '#101820'
			}
		}
	};
	let lightConfig = {
		fpsLimit: 500,
		particles: {
			color: {
				value: '#101820'
			},
			shape: {
				type: 'circle'
			},
			size: {
				value: 3, // average size
				random: true, // enable random sizing
				anim: {
					enable: true,
					speed: 3,
					size_min: 1, // minimum size
					size_max: 6, // maximum size
					sync: false
				}
			},
			move: {
				enable: true,
				speed: 0.5,
				outMode: 'bounce' // or "out"
			}
		},
		interactivity: {
			events: {
				onClick: {
					enable: true,
					mode: 'push'
				}
			}
		},
		fullScreen: false,
		background: {
			color: {
				value: '#ffff'
			}
		}
	};
	let particlesConfig = darkConfig;

	$: if ($themeStore.mode == 'light') {
		particlesConfig = lightConfig;
	} else {
		particlesConfig = darkConfig;
	}

	let onParticlesLoaded = (event) => {
		const particlesContainer = event.detail.particles;

	};

	void particlesInit(async (engine) => {
		await loadSlim(engine);
	});

</script>

<div class='w-screen h-screen flex flex-col'>
	{#if header}
		<Header />
	{/if}

	<div class='flex-grow relative'>
		<div class='absolute w-full h-full'>
			<div class='relative w-full h-full '>
				<slot />
			</div>
		</div>
	</div>

	<Particles
		id='tsparticles'
		class=''
		style=''
		options='{particlesConfig}'
		on:particlesLoaded='{onParticlesLoaded}'
	/>
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
