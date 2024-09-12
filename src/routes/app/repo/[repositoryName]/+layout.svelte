<script lang='ts'>
	import Link from 'svelte-link';
	import { onMount } from 'svelte';
	import MaterialSymbolsLock from '~icons/material-symbols/lock';
	import { goto } from '$app/navigation';
	import authStore from '$lib/store/auth';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import { getCookie, setCookie } from '$lib/util';

	export let data: any;

	const tabId = 'individual-library-tab-index';

	$:user = $authStore.user;

	let index = 0;

	const navigateTab = async (idx) => {

		index = idx;

		const routingSuffix = ['code', 'issue', 'setting'];

		if (index >= 0 && index <= 2) {
			await goto(`/app/repo/${data.name}/${routingSuffix[index]}`);

			let cookieSubscribed = getCookie('COOKIE_SUBSCRIBED') === 'true';

			if(cookieSubscribed){
				setCookie(tabId, index.toString());
			}
		}
	};

	onMount(() => {

		index = 0;

		let cookieSubscribed = getCookie('COOKIE_SUBSCRIBED') === 'true';

		if (cookieSubscribed && getCookie(tabId) !== undefined) {
			let cookieValue = getCookie(tabId);
			index = parseInt(cookieValue);
		}
	});
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<div class='flex flex-col w-full min-h-full overflow-y-auto dark:bg-charcoal bg-gray-100'>

	<div class='flex gap-4 py-4 px-8'>
		<div class='flex-auto max-w-full'>
			<div class='flex h-full break-words items-center flex-wrap'>
				<MaterialSymbolsLock className='dark:text-white text-black' />
				<span class='mx-2'>
					<Link
						href={`/app/repo`}
						class='dark:text-gray-100 text-orange-500 text-xl hover:underline'
					>
						{user?.username?.toLowerCase()}
					</Link>
				</span>
				<span class='mx-1 flex items-center self-stretch text-gray-500'> / </span>
				<span class='mx-2'>
					<Link
						href={`/app/repo/${data?.name}`}
						class='dark:text-gray-100 text-orange-500 text-xl hover:underline'
					>
						{data?.name}
					</Link>
				</span>
			</div>
		</div>
	</div>

	<div class='w-full dark:text-gray-100 px-8 flex flex-col flex-grow'>

		<div class='flex w-full'>
			<AppButton size='sm' rounded={false} variant={index === 0 ? 'line-active-bottom' : 'text'}
								 handleClick={() => navigateTab(0)}>Code
			</AppButton>
			<AppButton size='sm' rounded={false} variant={index === 1 ? 'line-active-bottom' : 'text'}
								 handleClick={() => navigateTab(1)}>Issue
			</AppButton>
			<AppButton size='sm' rounded={false} variant={index === 2 ? 'line-active-bottom' : 'text'}
								 handleClick={() => navigateTab(2)}>Setting
			</AppButton>
		</div>

		<div class='flex py-3 text-sm flex-grow'>
			<slot />
		</div>
	</div>
</div>