<script lang="ts">
	import { goto } from '$app/navigation';
	import AppInput from '$lib/components/core/AppInput.svelte';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import Link from 'svelte-link';
	import toast from 'svelte-french-toast';
	import { isEmptyString, isEmail } from '$lib/util';
	import { getUsers, signUp } from '$lib/services/auth.service';

	let email = '';
	let name = '';
	let password = '';
	let passwordConfirm = '';

	let emailError = '';
	let nameError = '';
	let passwordError = '';

	let triedOnce = false;

	let valid = false;
	let isLoading = false;
	let isCheckingEmail = false;
	let isCheckingName = false;

	const checkEmail = async () => {
		isCheckingEmail = true;
		const users = await getUsers();
		isCheckingEmail = false;

		return users.find((user) => user.email === email) === undefined;
	};

	const checkUsername = async () => {
		isCheckingName = true;
		const users = await getUsers();
		isCheckingName = false;

		return users.find((user) => user.username === name) === undefined;
	};

	const validate = async () => {
		triedOnce = true;

		emailError = '';
		nameError = '';
		passwordError = '';

		if (!isEmail(email)) {
			emailError = 'This is not email';
		}

		if (isEmptyString(email)) {
			emailError = 'Email is required';
		}

		if (isEmptyString(emailError)) {
			let isValidEmail = await checkEmail();

			if (!isValidEmail) {
				emailError = 'Email has already taken';
			}
		}

		if (isEmptyString(name)) {
			nameError = 'Username is required';
		}

		if (isEmptyString(nameError)) {
			let isValidName = await checkUsername();

			if (!isValidName) {
				nameError = 'Username has already taken';
			}
		}

		if (password !== passwordConfirm) {
			passwordError = 'Password is not matched';
		}

		if (isEmptyString(password)) {
			passwordError = 'Password is required';
		}

		valid = isEmptyString(emailError) && isEmptyString(nameError) && isEmptyString(passwordError);
	};

	const handleSubmit = async () => {
		await validate();

		if (valid) {
			try {
				isLoading = true;

				await signUp({ email, username: name, password });

				toast.success('Register Success!');

				if (typeof window !== 'undefined') {
					await goto('/auth/signin');
				}
			} catch (error) {
				if (error.message) {
					toast.error(error.message);
				}
				if (error.response.status >= 400) {
					toast.error('Please check your personal information.');
				}
			} finally {
				isLoading = false;
			}
		} else {
			toast.error('Check your inputs');
		}
	};
</script>

<div
	class="flex flex-col gap-3 text-xl w-[450px] p-8 rounded-lg shadow-lg bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10 "
>
	<h1 class="text-3xl font-bold text-center pb-5">Create your account</h1>

	<AppInput
		bind:value={email}
		type="text"
		class="shaped-outlined"
		variant="outlined"
		label="Email"
		name="email"
		disabled={isLoading}
		isLoading={isCheckingEmail}
		icon="email"
	/>

	{#if triedOnce}
		<div class="text-red-600 pl-5">{emailError}</div>
	{/if}

	<AppInput
		bind:value={name}
		type="text"
		class="shaped-outlined"
		variant="outlined"
		label="Username"
		name="name"
		disabled={isLoading}
		isLoading={isCheckingName}
		icon="person"
	/>

	{#if triedOnce}
		<div class="text-red-600 pl-5">{nameError}</div>
	{/if}

	<AppInput
		bind:value={password}
		type="password"
		class="shaped-outlined"
		variant="outlined"
		label="Password"
		disabled={isLoading}
		name="password"
		invalid={!isEmptyString(passwordError) && triedOnce}
		icon="password"
	/>

	{#if triedOnce}
		<div class="text-red-600 pl-5">{passwordError}</div>
	{/if}

	<AppInput
		bind:value={passwordConfirm}
		type="password"
		class="shaped-outlined"
		variant="outlined"
		label="Confirm Password"
		disabled={isLoading}
		name="passwordConfirm"
		invalid={!isEmptyString(passwordError) && triedOnce}
		icon="password"
	/>

	<div class="flex flex-col w-full pt-2">
		<AppButton variant="primary-outlined" handleClick={() => handleSubmit()} {isLoading}>
			<div class="w-full py-1">Sign up</div>
		</AppButton>
	</div>

	<div class="w-full flex justify-end items-center pt-2 pb-3 dark:text-gray-300 text-sm">
		<div>Do have already account?</div>
		<Link href="/auth/signin" class="ml-3 text-white font-bold text-lg">Sign In</Link>
	</div>
</div>