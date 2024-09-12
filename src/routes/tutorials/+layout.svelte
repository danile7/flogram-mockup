<script lang="ts">
	import { page } from '$app/stores';
	import Link from 'svelte-link';
	import { blur } from 'svelte/transition';
	import MainLayout from '$lib/layouts/MainLayout.svelte';
	import IDE from '$lib/components/pages/tutorial/IDE.svelte';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import themeStore from '$lib/store/theme';
	import { backOut } from 'svelte/easing';
	import { Icon } from '@smui/button';
	import { capitalizeFirstLetter } from '$lib/util';
	// import { HSplitPane, VSplitPane } from 'svelte-split-pane';

	export let data;

	let { codeValue, category, prev, next, menuList } = data;

	$: {
		let { path } = $page;
		let {
			codeValue: newCodeValue,
			category: newCategory,
			prev: newPrev,
			next: newNext,
			menuList: newMenuList
		} = data;
		codeValue = newCodeValue;
		category = newCategory;
		prev = newPrev;
		next = newNext;
		menuList = newMenuList;

		if (viewLayer !== undefined) {
			viewLayer.scrollTop = 0;
		}
	}
	$: {
		if (container !== undefined) {
			let scrollOption = scrollToEditor
				? { left: 0, behavior: 'smooth' }
				: {
						left: container.scrollWidth,
						behavior: 'smooth'
				  };
			container.scrollTo(scrollOption);
		}
	}

	let viewLayer;
	let container;
	let menuOpen = false; // default state (dropdown close)
	let scrollToEditor = true;
	const ENCODER = new TextEncoder();

	const handleDropdownClick = () => {
		menuOpen = !menuOpen; // toggle state on click
	};

	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return; // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
		menuOpen = false;
	};

	let toggleEditorCode = () => (scrollToEditor = !scrollToEditor);
</script>

<svelte:head>
	<title>{'Tutorials - Flogram'}</title>
</svelte:head>

<MainLayout>
	<div
		class="w-full h-full flex lg:flex-nowrap overflow-hidden transition-all duration-400"
		bind:this={container}
	>
		<div
			class="h-full flex flex-col overflow-y-auto basis-full md:basis-full lg:basis-1/2 flex-shrink-0 md:min-w-full lg:min-w-0 relative"
		>
			<div
				class="flex-basis-1/2 dark:bg-charcoal flex flex-col items-center pb-10 overflow-y-auto min-h-full"
				bind:this={viewLayer}
			>
				<!--drop down menu-->
				<div
					class="w-full py-5 flex justify-center px-4 dark:bg-charcoal bg-gray-50 pb-5 sticky top-0 border-y border-[#29303d] z-10"
				>
					<div
						class="w-full flex flex-col gap-0 justify-between text-lg relative"
						on:focusout={handleDropdownFocusLoss}
					>
						<button
							class="flex items-center px-4 py-2 dark:bg-primary bg-gray-200 hover:bg-gray-300 font-nunito transition-all flex gap-3 cursor-pointer dark:text-white"
							on:click={handleDropdownClick}
						>
							<div class="transition-all duration-500" class:rotate-90={menuOpen}>
								<img
									src="/icons/icon-next.svg"
									alt="icon-next"
									style:filter={$themeStore.mode === 'light' ? 'invert(100%)' : 'invert(0)'}
								/>
							</div>
							<div>
								{capitalizeFirstLetter(category)}
							</div>
						</button>
						{#if menuOpen}
							<div
								class="absolute top-12 w-full flex flex-col bg-gray-50 dark:bg-charcoal border border-gray-500 dark:border-primary font-nunito duration-300 transition-all overflow-hidden h-[65vh] lg:h-[75vh] overflow-y-auto"
								transition:blur={{ duration: 500, easing: backOut }}
							>
								{#each menuList as { path, title }}
									<a
										on:click={() => (menuOpen = false)}
										href={`/tutorials/${path.split('/')[4].replace('.md', '').replace('.svx', '')}`}
										class="px-3 hover:bg-charcoal text-charcoal dark:text-gray-200 border-b border-gray-200 dark:border-opacity-5 dark:hover:border-primary hover:dark:text-primary hover:dark:bg-white hover:dark:bg-opacity-5 hover:text-gray-200 dark:hover:text-gray-200 transition-all cursor-pointer py-1 text-xl"
									>
										{title}
									</a>
								{/each}
							</div>

						{/if}
					</div>
				</div>

				<!--tutorial-->
				<div class="flex flex-col gap-3 dark:text-gray-200 px-4">
					{#if prev && prev.path}
						<div class="flex justify-start pt-4">
							<Link
								href={`/tutorials/${prev.path
									.split('/')[4]
									.replace('.md', '')
									.replace('.svx', '')}`}
							>
								<AppButton variant="primary-outlined">
									<div class="flex gap-3 items-center">
										<Icon class="material-icons text-sm font-light">arrow_back_ios_new</Icon>
										<p class="self-center text-sm md:text-lg">
											Previous Lesson: {prev.metadata.title}
										</p>
									</div>
								</AppButton>
							</Link>
						</div>
					{/if}

					<div class="grid grid-cols-1 -mt-5 mark-down">
						<slot />
					</div>

					{#if next && next.path}
						<div class="flex justify-end gap-2 pb-6">
							<Link
								href={`/tutorials/${next.path
									.split('/')[4]
									.replace('.md', '')
									.replace('.svx', '')}`}
							>
								<AppButton variant="primary-outlined">
									<div class="flex gap-3 items-center">
										<p class="self-center text-sm md:text-lg">Next Lesson: {next.metadata.title}</p>
										<Icon class="material-icons text-sm font-light overflow-hidden text-center w-5">
											arrow_forward_ios_new
										</Icon>
									</div>
								</AppButton>
							</Link>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<div class="basis-full md:basis-full lg:basis-1/2 flex-shrink-0 md:min-w-full lg:min-w-0">
			<IDE initialValue={codeValue} />
		</div>
	</div>

	<!--	<div class='fixed w-full h-full left-0 top-0'>-->
	<!--		<HSplitPane updateCallback={() => {console.log('HSplitPane Updated!');}} minLeftPaneSize = {"40%"}>-->
	<!--			<left slot='left' style='min-width: 400px;'>-->
	<!--			<left slot='left' style='min-width: 400px;'>-->
	<!--				<div class='w-full h-[600px] bg-red-500' style='min-width: 300px;'>sdf</div>-->
	<!--			</left>-->
	<!--			<div slot='right'>-->
	<!--				Right Pane-->
	<!--			</div>-->
	<!--		</HSplitPane>-->
	<!--	</div>-->

	<div class="flex lg:hidden fixed bottom-3 left-3">
		<AppButton variant="primary" handleClick={() => toggleEditorCode()}>
			<div class="w-full flex items-center gap-2 dark:text-gray-200">
				<Icon
					class="material-icons transition-all duration-200"
					style={`${scrollToEditor ? 'text-shadow : 0px 0px 10px lime; color : white;' : ''}`}
					>book
				</Icon>
				<Icon class="material-icons text-gray-300 dark:text-gray-300">compare_arrows</Icon>
				<Icon
					class="material-icons transition-all duration-200"
					style={`${!scrollToEditor ? 'text-shadow : 0px 0px 10px lime; color : white;' : ''}`}
					>code
				</Icon>
			</div>
		</AppButton>
	</div>
</MainLayout>
