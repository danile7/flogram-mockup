<script lang="ts">
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import SigninForm from '$lib/components/pages/auth/SigninForm.svelte';

	export let form;

	onMount(() => {
		if (form && form.error) {
			toast.error(form.error);
		}
	});
</script>

<div
	class="w-full h-screen flex justify-center items-center flex flex-col dark:text-gray-200 text-gray-900"
>
	<SigninForm />
</div>
