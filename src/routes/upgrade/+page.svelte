<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon } from '@smui/button';
	import { goto } from '$app/navigation';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import themeStore from '$lib/store/theme';
	import { setCookie } from '$lib/util';
	import data from '$lib/util/config';
	import AppSelect from '$lib/components/core/AppSelect.svelte';

	let planOption = ['Month', 'Year'];
	let plan = planOption[0];

	const handleClick = () => {
		setCookie('payment-subscription-option', plan === planOption[0] ? 'month' : 'year', 1);
		goto('/payment');
	};
</script>

<div class="w-full h-full flex-grow top-0 left-0">
	<div
		class="w-full h-full relative flex flex-col lg:flex-row lg:justify-center lg:items-center p-4 sm:p-16 md:p-32 lg:p-4 overflow-y-auto bg-white dark:bg-charcoal bg-gray-100"
		transition:fade={{ duration: 200, easing: cubicOut }}
	>
		<img
			src="/side-gradient.png"
			class="fixed w-[160px] lg:w-[230px] h-full left-0 select-none opacity-40 dark:opacity-100 transition-all duration-300 border-none"
			alt=""
			draggable="false"
		/>
		<img
			src="/side-gradient.png"
			class="fixed w-[160px] lg:w-[230px] h-full rotate-180 right-0 select-none opacity-40 dark:opacity-100 transition-all duration-300"
			alt=""
			draggable="false"
		/>

		<!-- free -->
		<div
			class="w-full min-w-80 lg:w-1/4 min-h-[600px] flex flex-col rounded-2xl p-7 border border-[#078090] border-opacity-30 shadow-md scale-90 text-gray-900 dark:text-gray-200 shadow-xl light:shadow-md transition-all duration-200 bg-white"
			class:gradient={$themeStore?.mode === 'dark'}
		>
			<div
				class="flex flex-col gap-4 pb-2 border-b border-primary dark:border-white border-opacity-30 font-bold"
			>
				<div class="text-2xl">Free</div>
				<div class="flex items-end">
					<div class="text-2xl mr-2">$0</div>
					<div class=" text-gray-500 text-sm">/Forever</div>
				</div>
			</div>

			<div class="flex flex-col pt-4 gap-2 text-lg flex-grow justify-between">
				<div class="flex flex-col">
					<div class="pb-2">
						This is for you that are beginning to explore coding and web development
					</div>

					<div class="flex items-center">
						<Icon class="material-icons mr-4 dark:text-white">done</Icon>
						<div class="">Flogram online IDE</div>
					</div>
				</div>

				<div class=" justify-self-end w-full flex justify-center">
					<AppButton variant="primary" disabled={true}>
						<div class="px-5">Your Current Plan</div>
					</AppButton>
				</div>
			</div>
		</div>

		<!-- month -->
		<div
			class="w-full min-w-80 lg:w-1/4 min-h-[600px] flex flex-col rounded-2xl p-7 border border-[#078090] shadow-lg shadow-md scale-90 text-gray-900 dark:text-gray-200 shadow-xl light:shadow-md transition-all duration-200 bg-white"
			class:gradient={$themeStore?.mode === 'dark'}
		>
			<div
				class="flex flex-col gap-4 pb-2 border-b border-primary dark:border-white border-opacity-30 font-bold"
			>
				<div class="text-2xl">Plus</div>
				<div class="flex items-end">
					<div class="text-2xl mr-2">
						{plan === 'Year'
							? data?.payment?.subscription?.year
							: data?.payment?.subscription?.month}
					</div>
					<div class=" text-gray-500 text-sm">{plan === 'Year' ? '/Year' : '/Month'}</div>
				</div>
			</div>

			<div class="flex flex-col pt-4 gap-2 text-lg flex-grow justify-between">
				<div class="flex flex-col">
					<div class="flex flex-col w-full mb-3">
						<AppSelect label="Select your plan" bind:value={plan} options={planOption} />
					</div>

					<div class="pb-2">
						This is for you that are beginning to explore coding and web development
					</div>

					<div class="flex items-center">
						<Icon class="material-icons mr-4 dark:text-white">done</Icon>
						<div class="">Add File System</div>
					</div>

					<div class="flex items-center">
						<Icon class="material-icons mr-4 dark:text-white">done</Icon>
						<div class="">Add AI Code Generator</div>
					</div>
				</div>

				<div class=" justify-self-end w-full flex justify-center">
					<AppButton variant="primary-outlined" disabled={false} handleClick={() => handleClick()}>
						<div class="px-5">Get Plus</div>
					</AppButton>
				</div>
			</div>
		</div>

		<!-- year -->

		<!--		<div-->
		<!--			class='w-full min-w-80 lg:w-1/4 min-h-[600px] flex flex-col rounded-2xl p-7 border border-[#078090] border-opacity-30 shadow-md scale-90 shadow-md scale-90 text-gray-900 dark:text-gray-200 shadow-xl light:shadow-md transition-all duration-200 bg-white'-->
		<!--			class:gradient={$themeStore?.mode === 'dark'}-->
		<!--		>-->
		<!--			<div class='flex flex-col gap-4 pb-2 border-b border-primary dark:border-white border-opacity-30 font-bold'>-->
		<!--				<div class='text-2xl'>Plus</div>-->
		<!--				<div class='flex items-end'>-->
		<!--					<div class='text-2xl mr-2'>${data?.payment?.subscription?.year}</div>-->
		<!--					<div class=' text-gray-500 text-sm'>/Year</div>-->
		<!--				</div>-->
		<!--			</div>-->

		<!--			<div class='flex flex-col pt-4 gap-2 text-lg flex-grow justify-between'>-->
		<!--				<div class='flex flex-col'>-->
		<!--					<div class='pb-2'>-->
		<!--						This is for you that are beginning to explore coding and web development-->
		<!--					</div>-->

		<!--					<div class='flex items-center'>-->
		<!--						<Icon class='material-icons mr-4 dark:text-white'>done</Icon>-->
		<!--						<div class=''>Add File System</div>-->
		<!--					</div>-->

		<!--					<div class='flex items-center'>-->
		<!--						<Icon class='material-icons mr-4 dark:text-white'>done</Icon>-->
		<!--						<div class=''>Add AI Code Generator</div>-->
		<!--					</div>-->
		<!--				</div>-->

		<!--				<div class=' justify-self-end w-full flex justify-center'>-->
		<!--					<AppButton variant='primary-outlined' disabled={false} handleClick={() => handleClick('year')}>-->
		<!--						<div class='px-5'>Get Plus</div>-->
		<!--					</AppButton>-->
		<!--				</div>-->
		<!--			</div>-->
		<!--		</div>-->
	</div>
</div>

<style>
	.gradient {
		background: radial-gradient(
			circle at 58.04px 56.96px,
			rgba(52, 159, 192, 0.33) 0%,
			rgba(57, 107, 154, 0.05) 100%
		);
	}
</style>
