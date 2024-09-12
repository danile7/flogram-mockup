<script lang="ts">
	export let title = '';
	export let description = '';
	export let bg = 'bg-primary';
	export let id = '';
</script>

<div class={`${bg} flex gap-2 p-10`}>
	<div class="flex flex-col font-gabarito font-semibold text-gray-100 gap-0 self-start w-1/3">
		<span class="text-4xl self-start">{id}</span>
		<span class="text-3xl self-start">{title}</span>
	</div>

	<p class="dark:text-gray-200 text-slate-900 prose text-lg font-inter">
		{@html description}
	</p>
</div>
