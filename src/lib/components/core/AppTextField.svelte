<script lang='ts'>
	import EosIconsBubbleLoading from '~icons/eos-icons/bubble-loading';

	type VariantType =
		'primary' | 'error'

	type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

	type TextFieldType = 'text' | 'password';

	export const type: TextFieldType = 'text';
	export const variant: VariantType = 'primary';
	export const size: SizeType = 'md';
	export let value: string = '';
	export const label: string = '';
	export const name: string = '';
	export const placeholder: string = '';
	export const rounded: boolean = true;
	export let invalid: boolean = false;
	export const disabled: boolean = false;
	export let isLoading: boolean = false;
	let clazz: string = '';
	export { clazz as class };
	export let error: any = null;
	export let leftIcon: typeof import('svelte').SvelteComponent;
	export let rightIcon: typeof import('svelte').SvelteComponent;
	let active: boolean = false;

	const inputSize = {
		'xs': 'text-xs p-1',
		'sm': 'text-sm p-1',
		'md': 'text-md p-2 px-4',
		'lg': 'text-lg p-3',
		'xl': 'text-xl p-4'
	};


	let inputVariant = {
		'primary': `border border-primary rounded-md shadow-md ${active ? 'text-primary' : 'text-white'}`,
		'error': 'border !border-red-500 !t	ext-red-500 placeholder:text-lime-500'
	};

	$:{
		inputVariant = {
			'primary': `border transition-all duration-200 ${active ? 'text-primary border-primary shadow-md' : 'text-gray-600 border-black dark:text-white dark:border-white border-opacity-50'}`,
			'error': 'border !border-red-500 !text-red-500 placeholder:text-lime-500'
		};
	}

</script>

<div class='flex flex-col'>
	<div class='dark:text-white text-gray-800 pb-1'>
		{label}
	</div>

	<div
		class={`${clazz} ${ invalid  || error? inputVariant['error'] : '' } ${inputVariant[variant]} ${inputSize[size]} relative flex items-center`}>


		{#if leftIcon}
			<svelte:component this={leftIcon} class='mr-2' />
		{/if}


		<input
			bind:value={value}
			{name}
			{placeholder}
			class='bg-transparent w-full pr-4'
			on:focus={() => (active = true)}
			on:blur={() => (active = false)} />

		{#if isLoading}
			<EosIconsBubbleLoading class='absolute right-3' />
		{/if}

		{#if !isLoading && rightIcon}
			<svelte:component this={leftIcon} class='mr-2' />
		{/if}
	</div>

	{#if error !== null}
		<div class='py-[2px] text-red-500'>
			{error}
		</div>
	{/if}

</div>