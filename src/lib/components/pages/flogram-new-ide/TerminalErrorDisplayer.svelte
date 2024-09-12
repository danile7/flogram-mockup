<script>
	export let failures = [];
</script>

<div class="flex flex-col tracking-wider">
	{#each failures as { type, message, failureRow, failureColumn }}
		<div class="flex flex-col">
			<div class="pb-4 tracking-widest text-red-700">ERROR!</div>
			<div>{message}</div>
			<div class="text-right pb-2">{failureRow}:{failureColumn}</div>
		</div>
	{/each}
</div>
