<script lang="ts">
	export const ssr = false;
	import Button from '$lib/components/core/Button.svelte';
	import { goto } from '$app/navigation';
	import themeStore from '$lib/store/theme';

	$: mode = $themeStore.mode;
</script>

<div id="sponsor" class="dark:bg-gray-800 bg-gray-200">
	<div class="mx-auto px-8 py-12 md:py-32 text-white">
		<div class="max-w-[500px] text-center mb-14 mx-auto flex flex-col gap-3">
			<h1 class="text-2xl md:text-4xl font-semibold font-nunito">
				100% of Your Donations go Toward Improving Flogram <i class="fa fa-leaf" />
			</h1>

			<p>
				Our maintainers devote their time, effort, and heart to ensure Flogram keeps getting better
				and faster. Support us by donating to our collective 🙏
			</p>
		</div>

		<div class="max-w-[600px] mx-auto flex flex-col gap-6">
			<div
				class="flex flex-col md:flex-row p-6 dark:bg-gray-100 bg-white text-gray-800 justify-center items-center gap-5"
			>
				<div class="flex items-center justify-center mx-auto">
					<svg
						class="w-10 h-10 inline-block leading-4 shrink-0 text-current align-middle"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M533 1024l-147.7-84.8-136.4 78.3h-11.3c-17.3 0-34.2-3.4-50.1-10.1-15.3-6.5-29.1-15.7-40.8-27.6-11.7-11.7-21-25.5-27.5-40.8-6.7-15.9-10.1-32.7-10.1-50.1V128.5c0-17.4 3.4-34.2 10.1-50.1 6.5-15.3 15.8-29.1 27.6-40.8 11.7-11.8 25.5-21 40.8-27.5C203.3 3.4 220.2 0 237.5 0h590.9c17.3 0 34.2 3.4 50.1 10.1 15.3 6.5 29.1 15.7 40.8 27.6 11.7 11.7 21 25.5 27.5 40.8 6.7 15.9 10.1 32.7 10.1 50.1V889c0 17.4-3.4 34.2-10.1 50.1-6.5 15.3-15.8 29.1-27.6 40.8-11.7 11.8-25.5 21-40.8 27.5-15.8 6.7-32.7 10.1-50 10.1h-11.3l-136.4-78.3L533 1024z m147.7-182.6l157.2 90.3c2.5-0.6 5-1.4 7.5-2.4 5.2-2.2 9.9-5.4 13.9-9.4 4.1-4.1 7.2-8.7 9.4-14 2.3-5.3 3.4-11.1 3.4-17V128.5c0-5.9-1.1-11.7-3.4-17-2.2-5.2-5.4-9.9-9.4-13.9-4.1-4.1-8.7-7.2-13.9-9.4-5.4-2.3-11.1-3.4-17-3.4H237.5c-5.9 0-11.6 1.1-17 3.4-5.2 2.2-9.9 5.4-13.9 9.4-4.1 4.1-7.2 8.7-9.4 14-2.3 5.3-3.4 11.1-3.4 17V889c0 5.9 1.1 11.7 3.4 17 2.2 5.2 5.4 9.9 9.4 13.9 4.1 4.1 8.7 7.2 13.9 9.4 2.4 1 4.9 1.8 7.5 2.4l157.2-90.3L533 926.2l147.7-84.8z"
							fill="#3688FF"
						/>
						<path
							d="M490.6 310.9H321c-23.4 0-42.4-19-42.4-42.4s19-42.4 42.4-42.4h169.6c23.4 0 42.4 19 42.4 42.4s-19 42.4-42.4 42.4zM702.5 487.6H321c-23.4 0-42.4-19-42.4-42.4s19-42.4 42.4-42.4h381.6c23.4 0 42.4 19 42.4 42.4-0.1 23.4-19 42.4-42.5 42.4z"
							fill="#5F6379"
						/>
					</svg>
					<a
						href="https://blockchain-explorer.com/address/YOUR_BLOCKCHAIN_ADDRESS"
						target="_blank"
						rel="noopener noreferrer"
						class="flex flex-col ml-6"
					>
						<span class="text-lg font-bold font-nunito">Use Crypto</span>
						<span class="opacity-70">Sponsor the Flogram maintainers</span>
					</a>
				</div>

				<Button
					handleClick={() =>
						goto('https://blockchain-explorer.com/address/YOUR_BLOCKCHAIN_ADDRESS')}
					colorScheme={'black'}
					variant="ghost"
					>Sponsor
				</Button>
			</div>

			<div
				class="flex flex-col md:flex-row p-6 dark:bg-gray-100 bg-white text-gray-800 items-center gap-5"
			>
				<div class="flex items-center justify-center mx-auto">
					<svg
						viewBox="0 0 569 546"
						focusable="false"
						class="w-10 h-10 inline-block leading-4 shrink-0 text-current align-middle"
					>
						<g>
							<circle cx="362.589996" cy="204.589996" r="204.589996" fill="#f96854" />
							<rect fill="#052d49" height="545.799988" width="100" x="0" y="0" />
						</g>
					</svg>
					<a
						href="https://www.patreon.com/Flogram/"
						target="_blank"
						rel="noopener noreferrer"
						class="flex flex-col ml-6"
					>
						<span class="text-lg font-bold font-nunito">Open Patreon</span>
						<span class="opacity-70">Sponsor the creator, Matthew Czarnek</span>
					</a>
				</div>

				<Button
					colorScheme={'black'}
					variant="ghost"
					handleClick={() => goto('https://www.patreon.com/Flogram/')}
					>Sponsor
				</Button>
			</div>
		</div>
	</div>
</div>
