<script lang="ts">
	const supporters = [
		{
			name: 'Matt',
			logo: 'https://avatars.githubusercontent.com/u/1498338?s=20?v=4'
		},
		{
			name: 'Frederico',
			logo: 'https://avatars.githubusercontent.com/u/11416855?s=20?v=4'
		},
		{
			name: 'Didier',
			logo: 'https://avatars.githubusercontent.com/u/51176044?s=20?v=4'
		}
	];
</script>

<div
	class="dark:bg-gray-900 flex flex-col md:flex-row items-center justify-center gap-6 py-14 px-4"
>
	<div class="flex flex-col gap-3">
		<h3 class="dark:text-primary-teal text-3xl font-nunito font-bold text-center md:text-left">
			Our Supporters
		</h3>
		<p class="dark:text-gray-100 text-center md:text-left">
			We so much appreciate the people who have our back
		</p>
	</div>

	<div class="grid grid-cols-3 md:grid-cols-6 gap-2  py-5">
		{#each supporters as supporter}
			<div class="flex p-2 bg-white">
				<img
					src={supporter.logo}
					alt={supporter.name}
					class="object-cover w-16 h-16 rounded-full"
				/>
			</div>
		{/each}
	</div>
</div>
