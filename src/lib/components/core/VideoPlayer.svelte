<!--<script lang="ts">-->
<!--	import { onMount } from 'svelte';-->

<!--	let isLoading = true;-->
<!--	let errorMessage = '';-->

<!--	export let youtubeID: string | undefined = undefined;-->

<!--	onMount(() => {-->
<!--		const tag = document.createElement('script');-->

<!--		tag.src = 'https://www.youtube.com/iframe_api';-->

<!--		document.body.appendChild(tag);-->

<!--		if (typeof window !== 'undefined') {-->
<!--			window.onYouTubeIframeAPIReady = () => {-->
<!--				new YT.Player('youtube-player', {-->
<!--					height: '360',-->
<!--					width: '640',-->
<!--					videoId: youtubeID,-->
<!--					events: {-->
<!--						onReady: () => (isLoading = false),-->
<!--						onError: () => {-->
<!--							isLoading = false;-->
<!--							errorMessage = 'Failed to load video. Please try again later.';-->
<!--							console.log(errorMessage);-->
<!--						}-->
<!--					}-->
<!--				});-->
<!--			};-->
<!--		}-->
<!--	});-->
<!--</script>-->

<!--<div-->
<!--	class="w-full aspect-[4/3] shadow-md shadow-black rounded-md bg-slate-800 bg-opacity-60 relative"-->
<!--&gt;-->
<!--	<div id="youtube-player" class="w-full h-full" />-->
<!--	{#if isLoading}-->
<!--		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white lg:text-2xl">-->
<!--			Loading...-->
<!--		</div>-->
<!--	{/if}-->

<!--	{#if errorMessage}-->
<!--		<div-->
<!--			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 text-base md:text-xl"-->
<!--		>-->
<!--			{errorMessage}-->
<!--		</div>-->
<!--	{/if}-->
<!--</div>-->



<script>
	import LiteYouTube from 'svelte-lite-youtube-embed'
</script>

<div class='w-full aspect-[4/3] border border-red-500 flex flex-col justify-center'>
	<LiteYouTube
		videoId="VV0oYK8DEPQ"
		videoTitle="Speed at Scale"
		params="enablejsapi=1"
		posterQuality="hqdefault"
	/>
</div>