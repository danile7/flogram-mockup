<script lang="ts">
	import AppButton from '$lib/components/core/AppButton.svelte';
	import { goto } from '$app/navigation';
</script>

<div
	class="p-8 bg-white bg-opacity-100 dark:bg-opacity-5 dark:bg-opacity-10 rounded-md border-primary flex flex-col text-xl border border-primary shadow-lg gap-7"
	style="z-index: 10000;"
>
	<div class="text-primary text-2xl font-bold">Enjoy your upgrade 😍</div>

	<AppButton handleClick={() => goto('/flogram-ide')}>Go to IDE</AppButton>
</div>
