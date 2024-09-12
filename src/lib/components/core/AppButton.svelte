<script lang='ts'>
	import EosIconsBubbleLoading from '~icons/eos-icons/bubble-loading';

	export let handleClick: () => void;

	type VariantType =
		'gradient'
		| 'gradient-outlined'
		| 'primary'
		| 'primary-outlined'
		| 'danger'
		| 'danger-outlined'
		| 'text'
		| 'line-active-bottom'
		| 'line-active-left'

	type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	export let variant: VariantType = 'gradient-outlined';
	export let size: SizeType = 'md';
	export let disabled = false;
	export let isLoading = false;
	let clazz = '';
	export { clazz as class };
	export let rounded = true;


	const buttonStyle = {
		'gradient': 'gradient dark:text-gray-200 light:text-gray-900',
		'gradient-outlined': 'gradient-border-mask hover:shadow-lg dark:text-gray-200 light:text-gray-900',
		'primary': 'bg-[#13A6C7] brightness-125 dark:brightness-100',
		'primary-outlined': 'border border-[#13A6C7] hover:shadow-lg hover:bg-white hover:bg-opacity-10 text-primary',
		'danger': 'bg-red-500',
		'danger-outlined': 'border border-red-500 hover:bg-red-500 hover:shadow-lg text-gray-900 dark:text-gray-100',
		'disabled': 'saturate-75 brightness-75',
		'text': 'hover:bg-primary hover:bg-opacity-10',
		'line-active-bottom': 'text-primary',
		'line-active-left': 'text-primary',
		'link': 'text-decoration-none hover:underline hover:text-primary '
	};

	const buttonSize = {
		'xs': 'text-xs p-1 px-2',
		'sm': 'text-sm p-1 px-3',
		'md': 'text-md p-2 px-4',
		'lg': 'text-lg p-3 px-6',
		'xl': 'text-xl p-4 px-8'
	};


</script>

<button
	class:brightness-75={disabled}
	class:saturate-75={disabled}
	class:rounded-full={rounded}
	class={`${clazz} ${buttonStyle[variant]} transition-all duration-150 flex justify-center items-center whitespace-nowrap cursor-pointer`}
	disabled={disabled || isLoading}
	on:click={handleClick}
>
	<div class={`${buttonSize[size]} relative flex justify-between items-center`}>

		<slot />

		{#if isLoading}
			<EosIconsBubbleLoading class = "ml-3"/>
		{/if}

		{#if variant === 'line-active-bottom' }
			<div class='h-[2px] bg-primary absolute bottom-0 w-full left-0'></div>
		{/if}

		{#if variant === 'line-active-left' }
			<div class='w-[2px] bg-primary absolute bottom-0 h-full left-0'></div>
		{/if}
	</div>
</button>


<style>

    .gradient {
        background: linear-gradient(110deg, #7F64E2, #41A6EF) border-box;
    }

    .gradient-border-mask {
        backdrop-filter: blur(10px);
        border-radius: 100px;
    }

    .gradient-border-mask::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 100px;
        border: 1px solid transparent;
        background: linear-gradient(#7F64E2, #41A6EF) border-box;
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
    }

    .gradient-border-mask:hover::before {
        box-shadow: 0 0 20px white;
    }
</style>