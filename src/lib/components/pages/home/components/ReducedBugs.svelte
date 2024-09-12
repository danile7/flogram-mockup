<script lang='ts'>
	import DescriptionCard from './DescriptionCard.svelte';
	import MinimalBugs from './SampleCode/MinimalBugs.svelte';

	import config from '$lib/util/config';

	const minizedBugsContent = config.landing.features.minimizeBugs;
</script>

<div class='flex flex-col gap-5 p-10'>
	<div class='flex flex-col lg:flex-row justify-between'>
		<div
			class='flex flex-col font-gabarito font-bold text-charcoal dark:text-gray-200 self-start w-1/2 pb-10'
		>
			<span class='text-4xl md:text-5xl self-start'>{minizedBugsContent.order}</span>
			<span class='text-3xl md:text-4xl self-start' id='myDiv'>{minizedBugsContent.title}</span>
		</div>

		<div class='flex-grow flex justify-end'>
			<DescriptionCard>
				{minizedBugsContent.content[0]}
			</DescriptionCard>
		</div>
	</div>
	<div class='w-full flex items-center justify-start'>
		<DescriptionCard>
			{minizedBugsContent.content[1]}
		</DescriptionCard>
	</div>
	<div class='w-full flex items-center justify-end'>
		<DescriptionCard>
			<p>{minizedBugsContent.content[2].content}</p>
			<ul class='-mt-2'>
				{#each minizedBugsContent.content[2].bulletPoints as bulletPoint }
					<li>{bulletPoint}</li>
				{/each}
			</ul>
		</DescriptionCard>
	</div>
	<div class='flex justify-center w-full pt-8'>
		<MinimalBugs />
	</div>
</div>


