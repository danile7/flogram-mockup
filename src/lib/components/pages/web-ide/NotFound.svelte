<script>
	import { goto } from '$app/navigation';
</script>

<div class="relative">
	<div class="absolute w-screen h-screen flex items-center justify-center bg-[#29303d]">
		<div class="bg-white px-6 py-6 flex flex-col gap- rounded-3xl">
			<h1 class="text-2xl font-semibold font-nunito">😔 Library not found</h1>
			<button
				class="focus:outline-none font-nunito bg-[#29303d] rounded-3xl text-white px-3 py-1.5 text-lg"
				on:click={() => goto('/ide')}>Go to search</button
			>
		</div>
	</div>
</div>
