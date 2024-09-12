<script type="ts">
	import { onMount } from 'svelte';
	import Typewriter from 'typewriter-effect/dist/core';
	import { goto } from '$app/navigation';
	import VideoPlayer from '$lib/components/core/VideoPlayer.svelte';
	import config from '$lib/util/config';
	import AppButton from '$lib/components/core/AppButton.svelte';

	const bannerContent = config.landing.banner;

	let typewriterElement;

	onMount(() => {
		const typewriter = new Typewriter(typewriterElement, bannerContent.typewriterConfig);
		typewriter.typeString(bannerContent.subHeader).start();
	});
</script>

<div
	class="relative flex flex-col items-center justify-center lg:flex-row lg:min-h-[calc(100vh-92px)] w-full py-[5rem] px-1 lg:px-2 xl:px-4"
>
	<div
		class="flex flex-col w-full lg:w-1/2 gap-4 text-center py-10 rounded-md md:rounded-3xl px-8 md:px-16 lg:px-8"
	>
		<div class="text-black flex flex-col gap-3">
			<h1 class="dark:text-gray-200 font-inter font-bold text-[2em] md:text-[4em] lg:text-[5em]">
				{bannerContent.header}
			</h1>
			<p
				bind:this={typewriterElement}
				class="dark:text-gray-300 text-lg md:text-3xl lg:text-4xl italic font-gabarito"
			>
				{bannerContent.subHeader}
			</p>
		</div>

		<p class="dark:text-gray-400 text-charcoal text-md md:text-lg text-center">
			{bannerContent.content}
		</p>

		<div class="flex flex-col md:flex-row items-center justify-center mt-5 gap-5">
			<AppButton variant="primary-outlined" size="lg" handleClick={() => goto('/tutorials')}>
				Learn Flogram
			</AppButton>
		</div>
	</div>

	<div
		class="flex w-full lg:w-1/2 pt-8 lg:pt-0 items-center justify-center px-8 md:px-16 lg:px-8 xl:px-16"
	>
		<VideoPlayer youtubeID={bannerContent.youtubeID} />
	</div>
</div>
