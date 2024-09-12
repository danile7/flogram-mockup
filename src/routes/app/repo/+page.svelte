<script lang='ts'>
	import { onMount } from 'svelte';
	import Tab from '$lib/components/core/Tab.svelte';
	import Library from '$lib/components/pages/repo/tabs/Library.svelte';
	import { getCookie, isEmptyString } from '$lib/util';
	import Overview from '$lib/components/pages/repo/tabs/Overview.svelte';
	import { REPO_TAB } from '$lib/util/enums';

	const tabId = 'repo_tab';
	const tabs = Object.values(REPO_TAB);
	let currentTab = -1;

	const setCurrentTab = () => {
		if (typeof window !== 'undefined') {
			currentTab = isEmptyString(getCookie(tabId)) ? 0 : parseInt(getCookie(tabId));
		}
	};

	onMount(() => {
		setCurrentTab();
	});
</script>

<svelte:head>
	<title>Your libraries' tabs</title>
</svelte:head>

<div class='w-full h-full overflow-y-auto flex flex-col'>
	{#if currentTab !== -1}

		<Tab bind:currentTab {tabs} tabId={tabId} />

		<!-- Tab content -->
		<div class='mt-5 p-5 flex-grow'>

			{#if tabs[currentTab] === REPO_TAB.PROFILE}
				<Overview />
			{/if}

			{#if tabs[currentTab] === REPO_TAB.LIBRARIES}
				<Library />
			{/if}

			{#if tabs[currentTab] === REPO_TAB.PROJECTS}
				<h1>Projects</h1>
			{/if}

			{#if tabs[currentTab] === REPO_TAB.STARS}
				<h1>Stars</h1>
			{/if}
		</div>
	{/if}
</div>
