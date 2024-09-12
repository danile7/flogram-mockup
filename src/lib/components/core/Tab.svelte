<script lang='ts'>
	import { setCookie } from '$lib/util';

	export let tabs: string[] = [];
	export let currentTab = 0;
	export let tabId;

	const handleClick = (tabIndex: number) => {
		currentTab = tabIndex;
		if (typeof window !== 'undefined') {
			setCookie(tabId, currentTab.toString(), 30);
		}
	};
</script>

<div>
	<div class='flex'>
		{#each tabs as tab, index}
			<button
				class={`text-gray-500 text-lg flex items-center justify-center px-4 font-gabarito py-2 border-b-2 cursor-pointer transition ${
					currentTab === index ? '!text-primary border-current' : 'border-transparent'
				}`}
				on:click={() => handleClick(index)}
			>
				{tab}
			</button>
		{/each}
	</div>
</div>
