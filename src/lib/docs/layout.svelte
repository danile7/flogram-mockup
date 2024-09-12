<script lang='ts'>
	import { format_date } from '$lib/util';
	import { page } from '$app/stores';
	import { update } from '$lib/store/tutorial';

	export let title = '';
	export let summary = '';
	export let publishedOn; // Expecting a date or string
	export let author = '';
	export let published;
	export let order = 0;

	if ($page.routeId?.includes('tutorials') && title) {
		update(title);
	}
	let proseClass =
		'prose py-8 font-sans prose-strong:text-charcoal prose-strong:dark:text-primary-gray-200 prose-sm prose-headings:font-gabarito md:prose-md lg:prose-lg prose-table:dark:text-gray-300 prose-thead:text-gray-300 prose-li:dark:text-gray-300 prose-p:font-inter prose-code:font-code prose-a:font-gabarito prose-ul:dark:text-gray-300 prose-ol:dark:text-gray-300 prose-a:text-[22px] prose-headings:dark:text-gray-300 dark:prose-a:text-gray-300 prose-a:text-black prose-p:dark:text-gray-300 prose-code:dark:text-[#4fd1c5] prose-code:text-[18px] prose-code:text-blue-900 prose-pre:dark:bg-[#1f2937] prose-pre:bg-slate-100 prose-ol:text-[16px] prose-ul:text-[16px] prose-p:text-[16px]';
</script>

<svelte:head>
	<title>{title || 'Docs - Flogram'}</title>
	<meta name='description' content={summary} />
</svelte:head>

{#if $page.routeId?.includes('docs')}
	<div class='col-span-9 px-6 pb-3 font-inter'>
		<div class={proseClass}>
			<slot />
		</div>
		<div class='flex justify-end'>
			<p class='dark:text-gray-400'>Last updated on {format_date(publishedOn)}</p>
		</div>
	</div>
{:else}
	<div class='px-2 pb-3 font-inter'>
		<div class={proseClass}>
			<slot />
		</div>
		<div class='flex justify-end'>
			<p class='dark:text-gray-400'>Last updated on {format_date(publishedOn)}</p>
		</div>
	</div>
{/if}

<style>
</style>
