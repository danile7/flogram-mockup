<script lang='ts'>

	type POSITION_TYPE = 'BOTTOM-LEFT' | 'BOTTOM-RIGHT' | 'TOP-LEFT' | 'TOP-RIGHT'

	export let open: boolean = false;

	export let position: POSITION_TYPE = 'BOTTOM-LEFT';

	const openMenu = () => open = true;

	const closeMenu = () => open = false;

</script>

<div class='relative inline-block'>

	{#if open && (position === 'TOP-LEFT' || position === 'TOP-RIGHT')}
		<div class='relative '>
			<div
				class='origin-bottom-left absolute bottom-0 mt-0 min-w-44 z-20 animatecss animate__fast animatecss-fadeIn '
				class:left-0={position === 'TOP-LEFT'}
				class:right-0={position === 'TOP-RIGHT'}
			>
				<slot name='menu' />
			</div>

			<button class='z-10 fixed left-0 right-0 top-0 bottom-0' on:click={() => closeMenu()}></button>
		</div>
	{/if}

	<button
		on:click={() => openMenu()}
		class='cursor-pointer'>
		<slot name='button' />
	</button>

	{#if open && (position === 'BOTTOM-LEFT' || position === 'BOTTOM-RIGHT')}
		<div class='relative'>
			<div
				class='origin-bottom-left absolute top-0 mt-0 min-w-44 z-20 animatecss animate__fast animatecss-fadeIn '
				class:left-0={position === 'BOTTOM-LEFT'}
				class:right-0={position === 'BOTTOM-RIGHT'}
			>
				<slot name='menu' />
			</div>

			<button class='z-10 fixed left-0 right-0 top-0 bottom-0' on:click={() => closeMenu()}></button>
		</div>
	{/if}


</div>