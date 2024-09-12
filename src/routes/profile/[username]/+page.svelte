<script lang="ts">
	import { required, matchField, email } from 'svelte-forms/validators';
	import { form, field } from 'svelte-forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import themeStore from '$lib/store/theme';
	import authStore from '$lib/store/auth';
	import Button from '$lib/components/core/Button.svelte';
	import Input from '$lib/components/core/Input.svelte';
	import FormErrorMessage from '$lib/components/core/FormErrorMessage.svelte';
	import { checkUsernameDuplication } from '$lib/services/auth.service';
	import { updateProfile } from '$lib/services/auth.service';

	let isLoading = false;
	let isCheckingUsername = false;
	let isEditable: boolean = false;
	$: mode = $themeStore.mode;
	$: user = $authStore.user;

	export let data;

	const checkUsername = () => async (username: string) => {
		let duplicated = true;

		if ($authStore.authHeader !== null) {
			try {
				isCheckingUsername = true;
				duplicated = await checkUsernameDuplication({ username }, $authStore.authHeader);
			} catch (err) {
				console.log('err', err);
				toast.error(err.message);
			} finally {
				isCheckingUsername = false;
			}
		}

		return {
			valid: !duplicated,
			name: 'already_taken'
		};
	};

	const emailF = field('email', '', [(required(), email())]);
	const usernameF = field('username', '', [required(), checkUsername()]);
	const passwordF = field('password', '', [required()]);
	const password2F = field('password2', '', [required(), matchField(passwordF)]);

	const changeEditable = (): boolean => (isEditable = !isEditable);

	const profileForm = form(emailF, usernameF, passwordF, password2F);

	const handleProfileUpdate = async () => {
		await emailF.validate();
		await usernameF.validate();
		await passwordF.validate();
		await password2F.validate();

		if ($authStore.authHeader !== null) {
			try {
				let email = $emailF.value;
				let username = $usernameF.value;
				let password = $passwordF.value;

				await updateProfile({ email, username, password }, $authStore.authHeader);

				toast.success('Successfully updated!');
			} catch (error: any) {
				if (error?.response?.status >= 400) {
					toast.error('Please check your personal information.');
				}
			} finally {
				isLoading = false;
			}
		}
	};
</script>

<svelte:head>
	<title>Flogram: AI's language of choice</title>
</svelte:head>
{#if data.found}
	<div class="bg-[#29303d]">
		<div class="max-w-4xl flex items-center h-auto lg:min-h-screen flex-wrap mx-auto my-32 lg:my-0">
			<!--Main Col-->
			<div id="profile" class="bg-slate-700 w-full lg:w-3/5 shadow-2xl opacity-75 mx-6 lg:mx-0">
				{#if !isEditable}
					<div class="p-4 md:p-12 text-center lg:text-left">
						<!-- Image for mobile view-->
						<!--						<div-->
						<!--							class='block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center'-->
						<!--							style="background-image: url('/img/team/Matt.jpg')"></div>-->

						<h1 class="text-3xl font-bold pt-8 lg:pt-0 text-zinc-300">{data.user.username}</h1>
						<div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
						<p
							class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start text-gray-300"
						>
							<svg
								class="h-4 fill-current text-green-700 pr-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path
									d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"
								/>
							</svg>
							Senior software engineer
						</p>
						<p class="pt-8 text-sm text-zinc-400">This content is editable on your profile.</p>

						{#if data.user.username === user?.username}
							<div class="pt-12 pb-8">
								<button
									on:click={() => changeEditable()}
									class="dark:bg-primary font-nunito bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
								>
									Edit profile
								</button>
							</div>
						{/if}

						<!-- Use https://simpleicons.org/ to find the svg for your preferred product -->
					</div>
				{/if}
				{#if isEditable}
					<div class="p-4 md:p-12 text-center lg:text-left">
						<div class="flex flex-col gap-5">
							<!-- email -->
							<div class="flex flex-col gap-1">
								<span class="dark:text-gray-100 text-sm font-medium text-gray-700">Email</span>
								<Input
									type="text"
									placeholder="Enter your email"
									bind:value={$emailF.value}
									isInvalid={$profileForm.hasError('email.required')}
								/>
								{#if !$profileForm.valid}
									{#if $profileForm.hasError('email.required')}
										<FormErrorMessage>Email is required</FormErrorMessage>
									{:else if $profileForm.hasError('email.not_an_email')}
										<FormErrorMessage>Email is invalid</FormErrorMessage>
									{/if}
								{/if}
							</div>

							<!-- username -->
							<div class="flex flex-col gap-1">
								<span class="dark:text-gray-100 text-sm font-medium text-gray-700">User name</span>
								<Input
									type="text"
									placeholder="Enter your username"
									bind:value={$usernameF.value}
									isInvalid={$profileForm.hasError('username.required')}
									isLoading={isCheckingUsername}
								/>
								{#if !$profileForm.valid}
									{#if $profileForm.hasError('username.required')}
										<FormErrorMessage>Username is required</FormErrorMessage>
									{:else if $profileForm.hasError('username.already_taken')}
										<FormErrorMessage>Username is already taken</FormErrorMessage>
									{/if}
								{/if}
							</div>

							<!-- password -->
							<div class="flex flex-col gap-1">
								<span class="dark:text-gray-100 text-sm font-medium text-gray-700">Password</span>
								<Input
									type="password"
									placeholder="Enter your password"
									bind:value={$passwordF.value}
									isInvalid={$profileForm.hasError('password.required')}
								/>
								{#if !$profileForm.valid}
									{#if $profileForm.hasError('password.required')}
										<FormErrorMessage>Password is required</FormErrorMessage>
									{/if}
								{/if}
							</div>

							<!-- confirm password -->
							<div class="flex flex-col gap-1">
								<span class="dark:text-gray-100 text-sm font-medium text-gray-700"
									>Confirm Password</span
								>
								<Input
									type="password"
									placeholder="Confirm your password"
									bind:value={$password2F.value}
									isInvalid={$profileForm.hasError('password2.required')}
								/>
								{#if !$profileForm.valid}
									{#if $profileForm.hasError('password.required')}
										<FormErrorMessage>Confirm password is required</FormErrorMessage>
									{:else if $profileForm.hasError('password2.match_field')}
										<FormErrorMessage>Password should be matched</FormErrorMessage>
									{/if}
								{/if}
							</div>
						</div>
					</div>

					<div class="flex justify-between p-6">
						<Button
							colorScheme={mode === 'light' ? 'black' : 'blueOutlined'}
							handleClick={handleProfileUpdate}
							{isLoading}
							disabled={isLoading}
							>Update
						</Button>
						<button
							on:click={() => changeEditable()}
							class=" text-black font-nunito underline focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Cancel
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="relative">
		<div class="absolute w-screen h-screen flex items-center justify-center bg-[#29303d]">
			<div class="bg-white px-6 py-6 flex flex-col gap-3">
				<h1 class="text-2xl font-medium">😔 User not found</h1>
				<button
					class="focus:outline-none font-nunito bg-[#29303d] text-white rounded-sm px-3 py-1.5 text-lg"
					on:click={() => goto('/profile')}
					>Go to search
				</button>
			</div>
		</div>
	</div>
{/if}
