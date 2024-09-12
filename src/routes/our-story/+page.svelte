<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import TeamProfile from '$lib/components/pages/components/TeamProfile.svelte';
	import HomeLayout from '$lib/layouts/HomeLayout.svelte';
	import Link from 'svelte-link/src/Link.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
	});

	const team = [
		{
			full_name: 'Matthew Czarnek',
			title: 'Chief Executive Officer',
			description:
				'Matt is the founder of Flogram. He is a full-stack developer working for Yahoo with a passion for programming languages and compilers. He has worked on a variety of repositories, including a cryptocurrency, a game engine, and a web framework.',
			image_url: '/Matt.jpg'
		},
		{
			full_name: 'Sarah Young',
			title: 'Chief Marketing Officer',
			description:
				'Sarah lives in Fairfax with her son, Isaiah and dog, Camo. She is a hockey addict. Assists the Flogram team with support, project planning, communication, marketing and creative problem solving.',
			image_url: '/Sarah.jpg'
		},
		{
			full_name: 'Didier Munezero',
			title: 'Chief Engineer',
			description:
				'Didier is originally from Rwanda. A musicophile! Currently pursuing a Computer Science degree from Northwestern University. He is the mastermind behind Flogram’s compiler and website code bases.',
			image_url: '/D2.jpeg'
		}
	];
	let teamElement: HTMLElement;
	afterNavigate(() => {
		if ($page.url?.toString()?.includes('#team') && teamElement) {
			teamElement.scrollIntoView();
		}
	});
</script>

<svelte:head>
	<title>Our story - Flogram</title>
</svelte:head>
<HomeLayout>
	<div class="w-full flex items-center justify-center py-20 min-h-screen border-b border-primary">
		<div class="flex flex-col gap-20">
			<div class="w-full flex justify-around">
				<div class="flex flex-col gap-6 lg:w-3/5">
					<div class="flex flex-col">
						<h1
							class="text-charcoal dark:text-gray-200 font-bold text-4xl md:text-5xl text-center font-gabarito"
						>
							The story of Flogram
						</h1>
					</div>
					<div class="flex flex-col gap-4 text-charcoal dark:text-gray-300 text-xl font-inter px-4">
						<p>
							While working on a cryptocurrency startup, Matt and his team faced challenges with
							Rust largely due to its ownership and borrowing system which adds a lot of complexity.
							We realized we needed a new programming language.
						</p>
						<p>
							This led to the birth of Flogram in March 2020. Our mission was to create a productive
							and high-performance programming language. As Flogram progressed, we realized that our
							features could benefit AI. From then on, AI code generation became our main endeavor.
						</p>
						<p>
							Flogram is not just a language; it's a gateway to pioneering AI innovations with ease.
							Join us in this exciting journey, and be part of a community that's reshaping the
							future of AI programming with Flogram.
						</p>
					</div>
					<div class="flex gap-6 justify-center" bind:this={teamElement} id="team">
						<Link href="https://discord.gg/rYzWK6497a" target="_blank">
							<Button colorScheme={'black'}>Talk to us on Discord</Button>
						</Link>
					</div>
				</div>
			</div>
			<div class="w-full flex flex-col gap-10">
				<h1
					class="w-full text-charcoal dark:text-gray-200 font-bold text-4xl md:text-5xl text-center font-gabarito"
					data-aos="zoom-out"
					data-aos-duration="1000"
				>
					Our Team
				</h1>
				<div class="w-full grid grid-cols-1 xl:px-32 xl:grid-cols-3 gap-4">
					{#each team as member}
						<div class="flex justify-center"><TeamProfile {...member} /></div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</HomeLayout>
