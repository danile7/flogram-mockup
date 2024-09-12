<script lang="ts">
	import Avatar from 'svelte-avatar';
	import Badge from '$lib/components/core/Badge.svelte';
	import Button, { Icon } from '@smui/button';
	import type { LibraryType } from 'src/lib/types/Library';
	import uniqolor from 'uniqolor';
	import Ripple from '@smui/ripple';
	import { goto } from '$app/navigation';

	export let library: LibraryType;
</script>

<button on:click={() => goto(`/app/repo/${library.name}`)}>
	<div
		class="dark:bg-white dark:bg-opacity-5 dark:text-gray-100 dark:border-0 border border-black border-opacity-30 flex flex-col justify-between gap-5 p-5 rounded-lg cursor-pointer transition-all duration-150 hover:shadow-lg"
		use:Ripple={{ surface: true }}
	>
		<!-- Main Content -->
		<div class="flex gap-5">
			<div class="w-12 h-12">
				<Avatar
					initials=""
					src=""
					name={library.name}
					size="50px"
					bgColor={uniqolor(library.name).color}
					borderRadius="10%"
				/>
			</div>

			<!-- Desc -->
			<div class="grow flex flex-col justify-between items-start text-left">
				<!-- Library name -->
				<div class="font-medium text-2xl font-nunito">
					{library.name}
				</div>
				<!-- Library description -->
				<div class="dark:text-gray-300 text-gray-400 text-lg font-left">
					{library.description}
				</div>

				<!-- Library tags -->
				<div class="flex gap-2">
					{#if 'labels' in library}
						{#each library.labels as tag}
							<Badge colorScheme={tag.color}>{tag.name}</Badge>
						{/each}
					{/if}
				</div>
			</div>

			<!-- Top badge -->
			<!-- {#if library.isTopRanked}
				<div class="hidden lg:flex self-start">
					<Badge fontSize="16px" colorScheme="orange">Top Ranked</Badge>
				</div>
			{/if} -->
		</div>
		<!-- {#if library.isTopRanked}
			<div class="lg:hidden self-start">
				<Badge fontSize="16px" colorScheme="orange">Top Ranked</Badge>
			</div>
		{/if} -->
		<!-- Action -->
		<div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
			<!-- actions -->
			<div class="flex flex-wrap gap-2 justify-between">
				<Button variant="outlined">
					<Icon class="material-icons">done</Icon>
					Like
					{library.votes}
				</Button>
				<Button variant="outlined">
					<Icon class="material-icons">comment</Icon>
					Comment
				</Button>

				<Button variant="outlined">
					<Icon class="material-icons">download</Icon>
					Download
					{library.downloads}
				</Button>
			</div>

			<!-- status -->
			<!--			<div class='flex gap-5 px-4'>-->
			<!--				<span class='text-gray-600 font-medium dark:text-gray-100'>{library.votes} votes</span>-->
			<!--				<span class='text-gray-600 font-medium dark:text-gray-100'-->
			<!--				>{library.downloads} downloads</span-->
			<!--				>-->
			<!--			</div>-->
		</div>
	</div>
</button>
