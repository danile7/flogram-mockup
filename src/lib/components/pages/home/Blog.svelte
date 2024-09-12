<script lang="ts">
	interface IBlog {
		author: string;
		github_id: number;
		date: string;
		content: string;
		stars: number;
	}
	import BlogCard from './components/BlogCard.svelte';
	let blogs: IBlog[] = [
		{
			author: 'Matthew Czanerk',
			github_id: 1498338,
			date: 'Apr 4, 2023',
			content:
				'While working at Yahoo, I began to track where I was spending my time and how much faster it would be to fix the same bugs using a language that matches the long term plans Flogram has. Flogram would allow me to write code over 3x faster and let me spend less time hassling with bugs, more time building. On top of which, it has performance which can’t just be easily added later if you run into an issue that needs it with another language and is energy efficient which is always a win. Flogram is a clear winner to me.',
			stars: 5
		},
		{
			author: 'Frederico Brandão Alves',
			github_id: 11416855,
			date: 'May 2, 2023',
			content: '',
			stars: 5
		},
		{
			author: 'Didier Munezero',
			github_id: 51176044,
			date: 'April 7, 2023',
			content:
				"Flogram's type-safety feature has been a game-changer, allowing me to catch and fix errors early in the development process, saving me time and effort. It's truly a developer's dream come true! Its code syntax is clean and concise, allowing me to write efficient code with ease. I enjoy using the English-like terms available in Flogram code, making it incredibly intuitive and human-friendly. With Flogram, I feel empowered to create robust and error-free applications, making my coding journey more enjoyable and fulfilling.",
			stars: 5
		}
	];
</script>

<div class="dark:bg-gray-900 py-16 md:py-32 items-center text-center flex flex-col mx-auto px-4">
	<h1
		class="dark:text-gray-100 text-3xl mb-12 text-center font-extrabold text-gray-700 font-nunito"
	>
		Great people believe in us:
	</h1>

	<div class="grid md:grid-col-2 lg:grid-cols-3 gap-5">
		{#each blogs as blog}
			<BlogCard {...blog} />
		{/each}
	</div>
</div>
