<script>
	import Header from '$lib/layouts/Header.svelte';
</script>

<div class="flex flex-col h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
	<div>
		<Header />
	</div>

	<div class="flex-grow relative w-full">
		<div class="absolute w-full h-full">
			<slot />
		</div>
	</div>
</div>
