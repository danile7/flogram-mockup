<script>
	export let failures = [];
	console.log(failures);
</script>

<div class="flex flex-col gap-3">
	{#each failures as failure}
		<div class="flex flex-col">
			<p class="text-lg text-charcoal dark:text-gray-300 italic font-code">
				<span class="text-red-500">Error Type {failure.type}: </span>{failure.message}
				Line[{failure.failureRow}:{failure.failureColumn}]
			</p>
		</div>
	{/each}
</div>
