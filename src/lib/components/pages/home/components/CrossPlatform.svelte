<script lang="ts">
	import config from '$lib/util/config';
	const crossPlatformContent = config.landing.features.crossPlatform;
</script>

<div class="flex flex-col py-32">
	<div class="flex flex-col lg:flex-row gap-10 lg:gap-2 px-10">
		<div
			class="flex flex-col font-gabarito font-bold text-charcoal dark:text-gray-200  gap-0 self-start w-1/2"
		>
			<span class="text-4xl md:text-5xl self-start">{crossPlatformContent.order}</span>
			<span class="text-3xl md:text-4xl self-start">{crossPlatformContent.title}</span>
		</div>

		<div class="dark:text-gray-300 text-black prose text-lg md:text-xl font-inter">
			<p>{crossPlatformContent.content[0]}</p>
			<p>{crossPlatformContent.content[1]}</p>
		</div>
	</div>
</div>
