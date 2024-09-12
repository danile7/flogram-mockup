<script>
	import Link from 'svelte-link';
</script>

<div
	class="bg-gray-200 dark:bg-slate-800 flex flex-col lg:flex-row items-center justify-around gap-3 md:gap-10 py-14 px-4"
>
	<div class="flex flex-col gap-3">
		<h3 class="text-charcoal dark:text-gray-200 text-5xl font-gabarito font-semibold">
			Our Inspiring Story
		</h3>
	</div>
	<div class="lg:w-3/5 gap-2 py-5 dark:text-gray-300 font-inter text-xl">
		While working on a previous cryptocurrency project, Matt and his team faced challenges when
		using Rust's complicated and unfriendly language, largely due to it's problematic ownership
		tracking, which slowed down the...
		<Link
			href="/our-story"
			class="cursor-pointer dark:text-primary text-primary hover:dark:text-primary-light hover:text-black"
			>read story
		</Link>
	</div>
</div>
