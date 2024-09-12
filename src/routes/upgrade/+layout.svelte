<script>
	import Header from '$lib/layouts/Header.svelte';
</script>

<div class="w-screen h-screen flex flex-col">
	<div>
		<Header />
	</div>
	<div class="flex-grow overflow-hidden overflow-y-auto">
		<slot />
	</div>
</div>
