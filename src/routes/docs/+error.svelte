<script>
	import { page } from '$app/stores';
	console.log($page.error);
</script>

<div class="h-screen w-full flex justify-center items-center dark:bg-[#29303d]">
	<div class="flex flex-col gap-4">
		<h1 class="dark:text-white text-[#29303d] text-5xl font-semibold font-nunito">
			{$page?.error?.message}
		</h1>
		<button class="text-white dark:bg-gray-50 bg-[#29303d] px-4 py-2 rounded-3xl"
			><a href="/docs">Go Home</a></button
		>
	</div>
</div>
