<script lang="ts">
	import HighPerformance from './SampleCode/HighPerformance.svelte';
	import config from '$lib/util/config';

	const performanceContent = config.landing.features.performance;
</script>

<div class="flex flex-col bg-gray-200 dark:bg-slate-800 py-32">
	<div class="flex flex-col lg:flex-row gap-10 lg:gap-2 pb-10 px-10">
		<div
			class="flex flex-col font-gabarito font-bold text-charcoal dark:text-gray-200  gap-0 self-start w-1/2"
		>
			<span class="text-4xl md:text-5xl self-start">{performanceContent.order}</span>
			<span class="text-3xl md:text-4xl self-start">{performanceContent.title}</span>
		</div>

		<div class="dark:text-gray-300 text-black prose text-lg md:text-xl font-inter">
			<p>{performanceContent.content[0].content}</p>
			<ul class="-mt-2">
				{#each performanceContent.content[0].bulletPoints as bulletPoint}
					<li>{bulletPoint}</li>
				{/each}
			</ul>
			<p>{performanceContent.content[1]}</p>
		</div>
	</div>
	<div class="flex justify-center md:gap-6 md:px-4">
		<HighPerformance />
	</div>
</div>
