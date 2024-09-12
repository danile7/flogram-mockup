<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { intro_hidden_forever, is_intro_open } from '$lib/store/intro_store';
	import { marked } from 'marked';
	import Close from '~icons/material-symbols/close-rounded';
	import HideForever from '~icons/material-symbols/hide-source-outline-rounded';
	import README from '../../../../README.md?raw';
	import GitHub from '~icons/mdi/github';
	import Discord from '~icons/simple-icons/discord';
	import Docs from '~icons/material-symbols/docs';

	const intro = marked(README.split('---')[1]);
</script>

<aside>
	<button
		class="dismiss"
		title="Dismiss Intro"
		on:click={() => {
			$is_intro_open = false;
		}}
	>
		<Close />
	</button>
	<section>
		<div class="box">
			<h2 style='display: flex; align-items: center;'>
				<Logo /> <span style='padding-top: 4px;'>Flogram IDE</span>
			</h2>
			<h3 style='padding: 10px 0px;'>AI Supporting IDE for flogram.</h3>
			<p>We are excited to have you here</p>
			<p>Please note that our IDE is currently in its early stages of development.</p>
			<p>Write code in the left, and click 'Run' in the top right corner for compilation.</p>
			<p>As we work diligently to enhance your experience, you may encounter some sections that are not fully operational yet.</p>
		</div>
		<div class="links">
			<a href="https://flogram.dev/tutorial/" title="Docs">
				<Docs style="font-size: 3rem;" />
				Docs
			</a>
			<a href="https://github.com" title="GitHub">
				<GitHub style="font-size: 3rem;" />
				Repository
			</a>
			<a href="https://discord.gg" title="Discord">
				<Discord style="font-size: 3rem;" />
				Chat
			</a>
		</div>
		{@html intro}
	</section>
	<button
		class="hide-forever"
		on:click={() => {
			$intro_hidden_forever = true;
			$is_intro_open = false;
		}}
	>
		<HideForever /> Hide Intro forever
	</button>
</aside>

<style>
	.box {
		margin: auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		margin-bottom: 1rem;
		background-color: var(--sk-back-3);
		border-radius: 2rem;
	}
	h2 {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		font-weight: 600;
		font-size: 4rem;
	}
	.tagline {
		font-size: 2.6rem;
	}

	.links {
		display: flex;
		gap: 4rem;
		justify-content: center;
	}

	.links a {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	aside :global(p),
	aside :global(ul) {
		margin: 0.5rem;
	}

	.dismiss {
		padding: 1rem;
		position: fixed;
		right: var(--sb-size);
	}

	.hide-forever {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: auto;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}

	button:hover {
		background-color: var(--sk-back-4);
	}

	button:active {
		background-color: var(--sk-back-5);
	}

	aside {
		background-color: var(--sk-back-1);
		height: 100%;
		overflow: auto;
		--sb-size: 1.5rem;
	}

	section {
		padding: 0.5em;
		max-width: 70ch;
		margin: auto;
	}

	section :global(img) {
		max-width: 100%;
	}

	section :global(ul) {
		margin-inline-start: 2em;
	}
</style>
