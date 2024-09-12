<script lang="ts">
	import { onDestroy } from 'svelte';
	import EosIconsBubbleLoading from '~icons/eos-icons/bubble-loading';

	type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	type InputType = 'text' | 'password'

	export const type: InputType = 'text';
	export const size: SizeType = 'xl';
	export const focusBorderColor:string = 'blue';
	export let value: string = '';
	export const placeholder: string = '';
	export const isInvalid: boolean = false;
	export const isLoading: boolean = false;
	export const disabled: boolean = false;
	export const required: boolean = false;
	export const name: string | null = null;

	let timer: any;

	const focusBorderColors = {
		blue: 'focus-visible:border-blue-500'
	};

	const sizes = {
		xs: 'text-xs py-1 px-2',
		sm: 'text-sm py-2 px-2',
		md: 'text-md py-2 px-3',
		lg: 'text-lg py-2 px-3',
		xl: 'text-xl py-2 px-3'
	};

	const variants = {
		outline: '',
		filled: '',
		flushed: '',
		unstyled: ''
	};

	type FocusBorderColorType = typeof focusBorderColors;

	type VariantType = typeof variants;

	const handleInput = (e: any) => {
		// in here, you can switch on type and implement
		// whatever behaviour you need
		clearTimeout(timer);

		timer = setTimeout(() => {
			value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
		}, 750);
	};

	const focusBorderColorF = focusBorderColors[focusBorderColor as keyof FocusBorderColorType];

	onDestroy(() => {
		clearTimeout(timer);
	});
</script>

<div class='w-full flex relative'>
	<input
		{type}
		class={` ${
			sizes[size]
		} bg-inherit  text-charcoal dark:text-gray-200 w-full min-w-0 outline outline-transparent outline-2 outline-offset-2 appearance-none relative transition border-2 border-charcoal dark:border-gray-200 ${
			isInvalid ? 'border-red-500' : 'border-inherit focus-visible:z-1 ' + focusBorderColorF
		}`}
		on:input={handleInput}
		{placeholder}
		{...name ? { name } : {}}
		{disabled}
	/>

	{#if isLoading}
		<EosIconsBubbleLoading class='absolute top-1/2 right-2 -translate-y-1/2' />
	{/if}
</div>
