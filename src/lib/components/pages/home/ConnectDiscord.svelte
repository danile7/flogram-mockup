<script lang="ts">
	import Link from 'svelte-link';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import config from '$lib/util/config';

	const connectDiscordContent = config.landing.connectDiscord;
</script>

<div class="bg-discord shadow-lg">
	<div class="max-w-xl md:max-w-7xl mx-auto py-8 px-6 md:px-8">
		<div class="flex flex-col md:flex-row items-center justify-between gap-5">
			<div class="flex text-white">
				<div class="flex items-center justify-center text-5xl mr-5">
					<img
						src="/icons/icon-discord.svg"
						class="w-auto h-auto"
						width="0"
						height="0"
						alt="discord-icon"
					/>
				</div>

				<div class="flex flex-col gap-1 self-center">
					<h1 class="font-bold text-3xl leading-5 font-gabarito">{connectDiscordContent.title}</h1>
					<p class="opacity-70 text-xl font-inter">{connectDiscordContent.content}</p>
				</div>
			</div>

			<Link href={connectDiscordContent.discordLink} target="_blank">
				<AppButton variant="primary-outlined">Join Our Discord</AppButton>
			</Link>
		</div>
	</div>
</div>
