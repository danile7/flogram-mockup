<script lang="ts">
	import Link from 'svelte-link';
	import RatioStar from '$lib/components/core/RatioStar.svelte';

	export let github_id = 0;
	export let author = 'Matt';
	export let date = '';
	export let content = '';
	export let stars = 0;
</script>

<Link
	href="/profile"
	class="dark:bg-gray-800 flex flex-col gap-4 bg-gray-50 p-5 px-4 md:px-8 md:w-[400px] font-oxygen"
>
	<div class="flex justify-center gap-3 ">
		<img
			class="h-12 w-12 rounded-full"
			src={`https://avatars.githubusercontent.com/u/${github_id}?s=20?v=4`}
			alt="Matt"
		/>
		<div class="flex flex-col gap-1">
			<span class="font-semibold dark:text-gray-200 font-nunito">{author}</span>
			<span class="text-gray-400 italic text-xs">{date}</span>
		</div>
	</div>

	<div class="flex flex-col text-sm gap-5">
		<p class="dark:text-gray-200">{content}</p>
		<div class="w-full flex items-center justify-center">
			<RatioStar {stars} />
		</div>
	</div>
</Link>
