<script lang="ts">
	export let colorScheme: string = 'gray';
	export let size: string = 'md';
	export let variant: string = 'soild';
	export let className: string = '';
	export let leftIcon: typeof import('svelte').SvelteComponent;
	export let rightIcon: typeof import('svelte').SvelteComponent;
	export let loadingText: string = '';
	export let isLoading: boolean = false;
	export let disabled: boolean = false;
	export let fullWidth: boolean = false;
	export let handleClick: () => void = () => {};

	let propColorScheme = colorScheme;

	$: {
		colorScheme, (propColorScheme = colorScheme);
	}

	const textColors = {
		'gray-600': '!text-gray-600',
		'gray-500': '!text-gray-500',
		'red-600': '!text-red-600',
		'orange-600': '!text-orange-600',
		'yellow-600': '!text-yellow-600',
		'green-600': '!text-green-600',
		'teal-600': '!text-teal-600',
		'blue-600': '!text-blue-600',
		'cyan-600': '!text-cyan-600',
		'purple-600': '!text-purple-600',
		'pink-600': '!text-pink-600',
		'gray-900': '!text-gray-900'
	};

	const bgColors = {
		'gray-100': 'bg-gray-100',
		'red-100': 'bg-red-100',
		'orange-100': 'bg-orange-100',
		'yellow-100': 'bg-yellow-100',
		'green-100': 'bg-green-100',
		'teal-100': 'bg-teal-100',
		'blue-100': 'bg-blue-100',
		'cyan-100': 'bg-cyan-100',
		'purple-100': 'bg-purple-100',
		'pink-100': 'bg-pink-100',
		'slate-50': 'bg-slate-50',
		primary: 'bg-primary',
		charcoal: 'charcoal',
		'charcoal-light': 'charcoal-light',
		'charcoal-lighter': 'charcoal-lighter'
	};

	const hoverBgColors = {
		'gray-100': 'hover:!bg-gray-100',
		'red-100': 'hover:!bg-red-100',
		'orange-100': 'hover:!bg-orange-100',
		'yellow-100': 'hover:!bg-yellow-100',
		'green-100': 'hover:!bg-green-100',
		'teal-100': 'hover:!bg-teal-100',
		'blue-100': 'hover:!bg-blue-100',
		'cyan-100': 'hover:!bg-cyan-100',
		'purple-100': 'hover:!bg-purple-100',
		'pink-100': 'hover:!bg-pink-100'
	};

	const activeBGColors = {
		'gray-200': 'active:!bg-gray-200',
		'red-200': 'active:!bg-red-200',
		'orange-200': 'active:!bg-orange-200',
		'yellow-200': 'active:!bg-yellow-200',
		'green-200': 'active:!bg-green-200',
		'teal-200': 'active:!bg-teal-200',
		'blue-200': 'active:!bg-blue-200',
		'cyan-200': 'active:!bg-cyan-200',
		'purple-200': 'active:!bg-purple-200',
		'pink-200': 'active:!bg-pink-200'
	};

	const schemes = {
		transparent: 'hover:bg-gray-100',
		gray: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-white',
		red: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
		black:
			'bg-charcoal dark:bg-gray-200 border-2 border-charcoal hover:border-charcoal hover:bg-primary hover:dark:bg-primary hover:dark:border-primary dark:border-gray-200 hover:border-primary hover:dark:text-gray-200 text-gray-200 dark:text-charcoal',
		'black-ghost':
			'bg-black dark:bg-gray-200 border-2 border-black hover:border-charcoal dark:border-gray-200 hover:dark:border-primary hover:dark:text-gray-200 hover:dark:bg-charcoal hover:bg-charcoal',
		yellow: 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700',
		purple: 'bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700',
		pink: 'bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700',
		slate: 'bg-slate-50 text-gray-900',
		blueOutlined:
			'bg-transparent text-primary dark:text-gray-200 border border-primary hover:text-white hover:bg-primary active:bg-blue-700',
		gray50: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-100',
		hvGray: 'hover:bg-gray-400 hover:text-gray-900 active:bg-gray-500 text-gray-100'
	};

	const sizes = {
		xs: 'h-6',
		sm: 'h-8',
		md: 'h-10',
		lg: 'h-12'
	};

	type SchemeType = typeof schemes;
	type SizeType = typeof sizes;
	type VariantType = typeof variants;
	type TextColorType = typeof textColors;
	type BGColorType = typeof bgColors;
	type HoverBgColorType = typeof hoverBgColors;
	type ActiveBGColorType = typeof activeBGColors;

	const variants = {
		solid: '',
		outline: `!bg-transparent ${textColors[(propColorScheme + '-600') as keyof TextColorType]} ${
			hoverBgColors[(propColorScheme + '-100') as keyof HoverBgColorType]
		} ${
			activeBGColors[(propColorScheme + '-200') as keyof ActiveBGColorType]
		} border border-current`,
		ghost: `!bg-transparent ${textColors[(propColorScheme + '-600') as keyof TextColorType]} ${
			hoverBgColors[(propColorScheme + '-100') as keyof HoverBgColorType]
		} ${
			activeBGColors[(propColorScheme + '-200') as keyof ActiveBGColorType]
		} text-black dark:text-white`,
		link: `!bg-transparent hover:!bg-transparent ${
			textColors[(propColorScheme + '-600') as keyof TextColorType]
		} hover:underline decoration-current`
	};

	// const schemeF = schemes[propColorScheme as keyof SchemeType];
	// const sizeF = sizes[size as keyof SizeType];
	// const variantF = variants[variant as keyof VariantType];
	// const disabledF = disabled || isLoading;
	// const widthF = fullWidth ? 'w-full' : 'w-fit';

	$: disabledF = disabled || isLoading;
	$: buttonStyle = generateStyle(propColorScheme, disabledF);

	const generateStyle = (propColorScheme, disabledF): string => {
		const disabledStyle = 'cursor-not-allowed opacity-20 ';
		const sizeF = sizes[size as keyof SizeType];
		const variantF = variants[variant as keyof VariantType];
		const schemeF = schemes[propColorScheme as keyof SchemeType];
		const widthF = fullWidth ? 'w-full' : 'w-fit';

		return `${
			disabledF ? disabledStyle : ''
		} ${widthF} ${sizeF} ${schemeF} ${variantF} relative font-inter inline-flex appearance-none items-center justify-center select-none whitespace-nowrap align-middle outline outline-transparent outline-2 outline-offset-2 leading-tight px-4 py-3 transition cursor-pointer text-lg`;
	};
</script>

<button
	class={' ' + className + ' ' + buttonStyle}
	on:click={() => {
		if (!disabled && !isLoading) {
			handleClick();
		}
	}}
>
	{#if isLoading}
		<div
			class={`inline-block border-t-2 border-t-current border-r-2 border-r-current border-b-2 border-b-transparent border-l-2 border-l-transparent animate-loading-fast rounded-full w-4 h-4 text-current ${
				loadingText ? 'mr-2' : ''
			}`}
		/>
		{#if loadingText}
			{loadingText}
		{/if}
	{:else}
		<!-- left icon -->
		{#if leftIcon}
			<svelte:component this = {leftIcon}/>
		{/if}
		<slot />

		<!-- right icon -->
		{#if rightIcon}
			<svelte:component this = {rightIcon}/>
		{/if}
	{/if}
</button>
