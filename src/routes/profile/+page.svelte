<script lang="ts">
	import { goto } from '$app/navigation';
	import type { User } from '$lib/types/User';
	interface IData {
		users: User[];
	}

	export let data: IData;
	let value: string = '';
	let results = data.users;

	$: {
		results = data.users.filter(
			(project) => project.username.includes(value) || project.email?.includes(value)
		);
	}

	//TODO: Search Library values

	const open = (username: string) => {
		goto(`/profile/${username}`);
	};
</script>

<svelte:head>
	<title>IDE - Flogram</title>
</svelte:head>
<div class="relative ">
	<div class="absolute flex items-start justify-center bg-[#29303d] pt-40 overflow-y-auto">
		<div class="flex flex-col gap-10">
			<div class="flex flex-col gap-6 w-[50%] self-center">
				<input
					bind:value
					type="text"
					placeholder="Search for users and organizations"
					class="focus:outline-none text-lg px-4 py-2"
				/>
			</div>
			<div class="flex flex-col self-center w-[80%]">
				<div class="flex flex-wrap  gap-4">
					{#each results as user}
						<button
							on:click={() => open(user.username)}
							class="bg-white cursor-pointer py-2 hover:rounded-full hover:bg-zinc-100 px-3 transition-all"
						>
							<div class="flex flex-col relative">
								<img
									class="w-40 h-40 object-cover rounded-full"
									src="https://images.unsplash.com/photo-1535982368253-05d640fe0755"
									alt="User"
								/>
								<p
									class="self-center font-medium text-lg absolute -bottom-1 px-2 py-1 bg-[#29303d] text-white rounded-md"
								>
									{user.username}
								</p>
							</div>
						</button>
					{/each}
					{#if results.length == 0}
						<div class="flex flex-col gap-0 px-6 py-5 bg-white">
							<p class=" text-xl">😔 No results founds.</p>
							<p class="text-zinc-400">Try different keywords</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
