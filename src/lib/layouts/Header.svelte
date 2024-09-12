<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import Link from 'svelte-link';
	import Avatar from 'svelte-boring-avatars';
	import { goto } from '$app/navigation';
	import Menu from '@smui/menu';
	import { Anchor } from '@smui/menu-surface';
	import { Icon } from '@smui/button';

	import themeStore from '$lib/store/theme';
	import authStore from '$lib/store/auth';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import ThemeToggleButton from '$lib/components/core/ThemeToggleButton.svelte';
	import data from '$lib/util/config';
	import { getCookie, isEmptyString } from '$lib/util';
	import LineMdCloseToMenuAltTransition from '~icons/line-md/close-to-menu-alt-transition';
	import LineMdMenuToCloseAltTransition from '~icons/line-md/menu-to-close-alt-transition';


	let menu: Menu;
	let anchor: HTMLDivElement;
	let anchorClasses: { [k: string]: boolean } = {};

	let menus = data.header.menu;
	let isLabelMenuOpen = false;

	$: mode = $themeStore.mode;
	$: user = $authStore.user;
	let loading = true;

	$: {
		if (typeof window !== 'undefined') {
			const token = getCookie('access_token');

			if (isEmptyString(token)) {
				loading = false;
			} else {
				loading = user === null;
			}
		}
	}

	let mode;

	const toggle = async () => {
		themeStore.toggleMode();
	};

	const dispatch = createEventDispatcher();

	const gotoProfile = () => {
		goto(`/profile/${user?.username?.toLowerCase()}`);
	};

	const toggleMenu = () => {
		isLabelMenuOpen = !isLabelMenuOpen;
	};
</script>

{#if !loading}
	<div
		class='dark:bg-charcoal sticky top-0 z-50 bg-white shadow-md dark:shadow-none left-0 right-0 w-full transition flex flex-col lg:flex-row justify-between items-center gap-4 px-8 py-6'
	>
		<div class='flex w-full justify-between items-center'>
			<Link href='/' class='flex gap-2'>
				<img width='0' height='0' class='w-10' src='/img/logo.png' alt='Flogram Logo' />
				<span class='text-charcoal dark:text-gray-100 font-bold text-2xl self-center'>Flogram</span>
			</Link>

			<div class='flex md:hidden cursor-pointer hover:opacity-50 transition-all duration-150'>
				<button on:click={() => toggleMenu()} class="text-black-700 dark:text-white text-2xl">
					{#if isLabelMenuOpen}
						<LineMdMenuToCloseAltTransition />
					{:else }
						<LineMdCloseToMenuAltTransition />
					{/if}
				</button>
			</div>
		</div>

		<div class='flex items-center justify-between w-full flex-grow'>
			<div class='mr-2 lg:mr-3'>
				<div class={`${isLabelMenuOpen ? 'flex' : 'hidden md:flex'} lg:gap-5 gap-2 self-center`}>
					{#each menus as menu}
						<Link
							href={menu.link}
							class='hover:opacity-50 text-lg transition font-gabarito text-charcoal dark:text-gray-100'
						>
							{menu.label}
						</Link>
					{/each}
				</div>
			</div>

			<div class={`${isLabelMenuOpen ? 'flex' : 'hidden md:flex'} gap-2 lg:gap-3 items-center`}>
				<!--		<IconButton variant='ghost' icon={$themeStore.mode === 'light' ? faMoon : faSun} handleClick={toggle} />-->

				<!--		<Button handleClick={() => goto('/#sponsor')} variant='ghost' colorScheme={'black-ghost'}>Sponsor</Button>-->

				<!--		<div class='md:hidden'>-->
				<!--			<IconButton colorScheme={'black'} variant='ghost' icon={faHeart} handleClick={() => goto('/#sponsor')} />-->
				<!--		</div>-->

				<ThemeToggleButton handleClick={toggle} dark={mode === 'dark'} />

				<!--			<AppButton handleClick={() => goto('/#sponsor')}>-->
				<!--				<div class='hidden md:flex'>-->
				<!--					Sponsor-->
				<!--				</div>-->

				<!--				<div class='flex md:hidden'>-->
				<!--					&lt;!&ndash;				<Fa icon={faHeart} />&ndash;&gt;-->
				<!--					💖-->
				<!--				</div>-->
				<!--			</AppButton>-->

				{#if user !== null}
					<!--			<IconButton-->
					<!--				icon={faAdd}-->
					<!--				handleClick={() => goto(`${session ? '/repo/create' : '/auth/signin'}`)}-->
					<!--				variant='ghost'-->
					<!--				colorScheme={'black'}-->
					<!--			/>-->

					<!--				<AppButton handleClick={() => goto('/app/repo/creat')}>-->
					<!--					<div class='hidden md:flex'>-->
					<!--						Create-->
					<!--					</div>-->

					<!--					<div class='flex md:hidden px-1'>-->
					<!--						<Fa icon={faAdd} />-->
					<!--					</div>-->
					<!--				</AppButton>-->

					<AppButton handleClick={() => goto('/app/repo')}>
						<div class='hidden md:flex'>Repository</div>
						<div class='flex md:hidden'>📂</div>
					</AppButton>

					<AppButton handleClick={() => goto('/upgrade')}>
						<div class='hidden md:flex'>Upgrade</div>
						<div class='flex md:hidden'>
							<Icon class='material-icons'>upgrade</Icon>
						</div>
					</AppButton>

					<div class='relative'>
						<button class='cursor-pointer' on:click={() => menu.setOpen(true)}>
							<Avatar
								name={user && user.username?.toLowerCase()}
								variant='bauhaus'
								colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
							/>
						</button>

						<div
							class={Object.keys(anchorClasses).join(' ')}
							use:Anchor={{
								addClass: (className) => {
									if (!anchorClasses[className]) {
										anchorClasses[className] = true;
									}
								},
								removeClass: (className) => {
									if (anchorClasses[className]) {
										delete anchorClasses[className];
										anchorClasses = anchorClasses;
									}
								}
							}}
							bind:this={anchor}
						>
							<Menu
								bind:this={menu}
								anchor={false}
								bind:anchorElement={anchor}
								anchorCorner='BOTTOM_LEFT'
								class='bg-transparent'
							>
								<div
									class='flex flex-col border border-black border-opacity-30 text-gray-900 dark:text-gray-200 dark:border-white dark:border-opacity-5 bg-white dark:bg-gray-800 shadow-md rounded-lg'
								>
									<button
										class='flex flex-col px-5 py-3 bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 transition-all duration-200 hover:bg-opacity-5 dark:hover:bg-opacity-5'
										on:click={() => {
											menu.setOpen(false), gotoProfile();
										}}
									>
										<div class='font-bold'>{user?.username}</div>
										<div class='text-gray-400 dark:text-gray-400'>{user?.username}@gmail.com</div>
									</button>
									<Link href='/sign-out' class='flex flex-col'>
										<button
											class='flex px-5 py-3 bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 transition-all duration-200 hover:bg-opacity-5 dark:hover:bg-opacity-5'
											on:click={() => {
												menu.setOpen(false);
											}}
										>
											<Icon class='material-icons mr-2'>logout</Icon>
											Sign out
										</button>
									</Link>
								</div>
							</Menu>
						</div>
					</div>
				{:else}
					<div class='flex gap-1'>
						<AppButton handleClick={() => goto('/auth/signin')}>
							<div class='hidden md:flex tracking-wider'>Sign In/Up</div>

							<div class='flex md:hidden px-[1px]'>
								<Icon class='material-icons'>login</Icon>
							</div>
						</AppButton>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
