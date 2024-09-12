<script>
	import DescriptionCard from './components/DescriptionCard.svelte';
	import config from '$lib/util/config';

	const notesContent = config.landing.notes;
</script>

<div class="w-full flex justify-center text-center px-4 mb-10">
	<div class="flex flex-col w-[500px]">
		<DescriptionCard>
			<h2 class="font-gabarito text-4xl text-charcoal dark:text-gray-200">{notesContent.title}</h2>
			<p class="font-inter text-xl">{notesContent.content}</p>
		</DescriptionCard>
	</div>
</div>
