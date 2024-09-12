<script>
	export let full_name = '';
	export let title = '';
	export let description = '';
	export let image_url = '';
</script>

<div class="border-2 border-primary dark:border-gray-300 px-5 py-5 max-w-[30em]">
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<img
				class="self-center h-40 border-primary dark:border-gray-300 bg-gray-300 object-contain"
				src={image_url}
				alt={full_name}
			/>
			<h3 class="self-center text-charcoal dark:text-gray-200 font-bold text-3xl font-gabarito">
				{full_name}
			</h3>
			<p class="self-center text-charcoal dark:text-gray-300 font-inter text-xl">
				{title}
			</p>
		</div>
		<p class="text-charcoal dark:text-gray-400 font-inter text-xl">
			{description}
		</p>
	</div>
</div>
