<script lang="ts">
	import Link from 'svelte-link';
</script>

<div class="flex justify-around py-6">
	<div class="flex flex-col gap-5 text-charcoal dark:text-gray-200 text-lg font-gabarito">
		<Link
			aria-label="libraries"
			href="/libraries"
			class="pb-2 border-b-2 border-charcoal hover:text-gray-700 hover:text-primary hover:border-primary "
			>Libraries
		</Link>
		<Link
			aria-label=""
			href="/ide"
			class="pb-2 border-b-2 border-charcoal hover:text-gray-700 hover:text-primary hover:border-primary "
			>IDE
		</Link>
		<Link
			aria-label="tutorials"
			href="/tutorials"
			class="pb-2 border-b-2 border-charcoal hover:text-gray-700 hover:text-primary hover:border-primary "
			>Tutorials
		</Link>
	</div>
	<div class="flex flex-col gap-5 text-charcoal dark:text-gray-200 text-lg font-gabarito">
		<Link
			aria-label="our-story"
			href="/our-story"
			class="pb-2 border-b-2 border-charcoal hover:text-gray-700 hover:text-primary hover:border-primary "
			>Our Story
		</Link>

		<Link
			aria-label="team"
			href="/our-story#team"
			class="pb-2 border-b-2 border-charcoal hover:text-gray-700 hover:text-primary hover:border-primary "
			>Team
		</Link>

		<Link
			aria-label="discord"
			href="https://discord.gg/rYzWK6497a"
			target="_blank"
			class="pb-2 border-b-2 border-charcoal hover:text-gray-700 hover:text-primary hover:border-primary "
			>Discord
		</Link>
	</div>
	<div class="flex flex-col gap-5 text-charcoal dark:text-gray-200 text-lg font-gabarito">
		<Link
			aria-label="github"
			href="https://github.com/Flogram"
			target="_blank"
			class="pb-2 border-b-2 border-charcoal hover:text-gray-700 hover:text-primary hover:border-primary "
			>Github
		</Link>

		<Link
			aria-label="Patreon"
			href="https://www.patreon.com/Flogram/"
			target="_blank"
			class="pb-2 border-b-2 border-charcoal hover:text-gray-700 hover:text-primary hover:border-primary "
			>Patreon
		</Link>

		<Link
			aria-label="tutorials"
			href="/tutorials"
			class="pb-2 border-b-2 border-charcoal hover:text-gray-700 hover:text-primary hover:border-primary "
			>Why Flogram
		</Link>
	</div>
</div>
<footer class="flex gap-2 items-center text-center flex-col text-gray-700 py-12">
	<p>Copyright © 2020 - {new Date().getFullYear()} Flogram LLC. All rights reserved.</p>

	<!-- social button groups -->
	<div class="hidden md:flex items-center px-8 gap-5">
		<!-- <Link
		aria-label=""
			href="https://github.com/Flogram"
			target="_blank"
			class="bg-transparent cursor-pointer outline outline-transparent outline-offset-2 text-inherit transition"
		>
			<i class="fa fa-github leading-4 shrink-0 transition hover:text-gray-600 !text-2xl" />
		</Link> -->

		<Link
			aria-label="discord"
			href="https://discord.gg/rYzWK6497a"
			target="_blank"
			class="bg-transparent cursor-pointer outline outline-transparent outline-offset-2 text-inherit transition"
		>
			<i class="fa fa-discord-alt leading-4 shrink-0 transition hover:text-gray-600 !text-2xl" />
		</Link>

		<!-- <Link
		aria-label=""
			href=""
			target="_blank"
			class="bg-transparent cursor-pointer outline outline-transparent outline-offset-2 text-inherit transition"
		>
			<i class="fa fa-youtube-play leading-4 shrink-0 transition hover:text-gray-600 !text-2xl" />
		</Link> -->

		<Link
			aria-label="facebook"
			href="https://www.facebook.com/Flogram.dev"
			target="_blank"
			class="bg-transparent cursor-pointer outline outline-transparent outline-offset-2 text-inherit transition"
		>
			<i
				class="fa fa-facebook-square leading-4 shrink-0 transition hover:text-gray-600 !text-2xl"
			/>
		</Link>
	</div>
</footer>
