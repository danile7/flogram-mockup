<script>
	import { goto } from '$app/navigation';
	import AppInput from '$lib/components/core/AppInput.svelte';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import Link from 'svelte-link';
	import { getUserByEmailAndPassword, getUserByToken } from '$lib/services/auth.service';
	import toast from 'svelte-french-toast';
	import { deleteCookie, isEmptyString, setCookie } from '$lib/util';
	import authStore from '$lib/store/auth';

	let email = '';
	let password = '';

	let emailError = '';
	let passwordError = '';

	let triedOnce = false;

	let valid = false;
	let isLoading = false;

	$: {
		if (isEmptyString(email)) {
			emailError = 'Email is required!';
		} else {
			emailError = '';
		}

		if (isEmptyString(password)) {
			passwordError = 'Password is required!';
		} else {
			passwordError = '';
		}
	}

	$: valid = isEmptyString(emailError) && isEmptyString(passwordError);

	const validate = (e) => {
		triedOnce = true;

		if (!valid) {
			isLoading = false;
			return false;
		} else {
			isLoading = true;
			return true;
		}
	};

	const handleSubmit = async () => {
		let valid = validate();
		if (valid) {
			try {
				let { access_token } = await getUserByEmailAndPassword({ email, password });

				// set cookie, set auth header, set user
				setCookie('access_token', access_token, 30);

				authStore.setAuthHeader({ Authorization: `Bearer ${access_token}` });

				let newUser = await getUserByToken({ token: access_token });
				authStore.setUser(newUser);

				toast.success('Sign Success');

				setTimeout(async () => {
					await goto('/flogram-ide');
				}, 300);
			} catch (err) {
				console.log('Sign In Error:', err);

				// delete cookie, set auth header as null, set user as null
				deleteCookie('access_token');
				authStore.setUser(null);
				authStore.setAuthHeader(null);

				isLoading = false;
				toast.error(err?.message);
			}
		}
	};
</script>

<div
	class='flex flex-col gap-3 text-xl w-[450px] p-8 rounded-lg shadow-lg bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10 '
>
	<h1 class='text-3xl font-bold pb-5 text-center'>Sign in</h1>

	<AppInput
		bind:value={email}
		type='text'
		class='shaped-outlined'
		variant='outlined'
		label='Email'
		name='email'
		disabled={isLoading}
		invalid={!isEmptyString(emailError) && triedOnce}
		icon='email'
	/>
	{#if triedOnce}
		<div class='text-red-600 pl-5'>{emailError}</div>
	{/if}

	<AppInput
		bind:value={password}
		type='password'
		class='shaped-outlined'
		variant='outlined'
		label='Password'
		disabled={isLoading}
		name='password'
		invalid={!isEmptyString(passwordError) && triedOnce}
		icon='password'
	/>

	{#if triedOnce}
		<div class='text-red-600 pl-5'>{passwordError}</div>
	{/if}

	<div class='flex flex-col w-full pt-2'>
		<AppButton variant='primary-outlined' handleClick={() => handleSubmit()} {isLoading}>
			<div class='w-full py-1'>Sign in</div>
		</AppButton>
	</div>

	<div class='w-full flex justify-end pt-2'>
		<Link href='/auth/signup'>Don't have an account?</Link>
	</div>
</div>