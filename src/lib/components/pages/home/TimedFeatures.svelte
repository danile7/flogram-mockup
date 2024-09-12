<script>
	import TimedCard from '../components/TimedCard.svelte';
	import config from '$lib/util/config';

	const timeFeaturesContent = config.landing.timeFeatures;
</script>

<div class="flex flex-wrap items-center justify-center gap-3 md:gap-10 px-4 mt-8 md:mt-20">
	<div class="flex flex-col">
		<h2 class="text-charcoal dark:text-gray-200 text-5xl font-bold font-gabarito text-center">
			LIVE NOW🔥
		</h2>
		<div class="flex flex-wrap items-center justify-center gap-3 md:gap-10 py-14 px-4">
			{#each timeFeaturesContent.liveFeatures as feature}
				<TimedCard {...feature} />
			{/each}
		</div>
	</div>

	<div class="flex flex-col">
		<h2 class="text-charcoal dark:text-gray-200 text-5xl font-bold font-gabarito text-center">
			COMING SOON 🔨
		</h2>
		<div class="flex flex-wrap items-center justify-center gap-3 md:gap-10 py-14 px-4">
			{#each timeFeaturesContent.soonFeatures as feature}
				<TimedCard {...feature} />
			{/each}
		</div>
	</div>
</div>
