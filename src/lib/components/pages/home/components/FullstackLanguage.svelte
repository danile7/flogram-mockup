<script lang="ts">
	import AllInOne from './SampleCode/AllInOne.svelte';
	import config from '$lib/util/config';

	const fullStackLanguageContent = config.landing.features.fullStackLanguage;
</script>

<div class="flex flex-col bg-gray-200 dark:bg-slate-800 py-32">
	<div class="flex flex-col lg:flex-row gap-10 lg:gap-2 pb-10 px-10">
		<div
			class="flex flex-col text-charcoal dark:text-gray-200 gap-0 self-start w-1/2 font-gabarito font-bold"
		>
			<span class="text-4xl md:text-5xl self-start">{fullStackLanguageContent.order}</span>
			<span class="text-3xl md:text-4xl self-start">{fullStackLanguageContent.title}</span>
		</div>

		<div class="flex flex-col gap-4">
			<p class="dark:text-gray-300 text-black prose text-lg md:text-xl font-inter">
				{fullStackLanguageContent.content[0]}
			</p>
			<p class="dark:text-gray-300 text-black prose text-lg md:text-xl font-inter">
				{fullStackLanguageContent.content[1]}
			</p>
			<p class="dark:text-gray-300 text-black prose text-lg md:text-xl font-inter">
				{fullStackLanguageContent.content[2]}
			</p>
		</div>
	</div>
	<div class="flex justify-center md:gap-6 md:px-4">
		<AllInOne />
	</div>
</div>
