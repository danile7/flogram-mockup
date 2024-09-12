<script lang="ts">
	import CodeBox from './CodeBox.svelte';
	import DescriptionCard from './DescriptionCard.svelte';
	const descs = [
		"Flogram is not just a programming language; it's a futuristic development platform where AI meets coding. Our long-term vision is to transform how repositories are initiated and developed. Imagine starting a new project by simply writing a summary in English or your preferred language. The Flogram editor takes this summary and intelligently breaks it down into distinct files, each with its own English description. This process involves a dynamic conversation between you and our finely-tuned AI models, ensuring that the project's structure aligns perfectly with your vision.",
		"Once you confirm the descriptions, Flogram's AI leaps into action, generating the initial code for each file. This unique approach bridges the gap between human language and code, allowing you to focus on the bigger picture while the AI handles the details. As you refine your project, you can edit either the English descriptions or the code itself. After making changes, simply hit the 'Update' button, and our AI will present you with an updated version of the code, highlighting the differences for easy review.",
		'Moreover, Flogram emphasizes the importance of robust testing. By default, unit tests are automatically generated for all files, covering essential edge cases. These tests must pass before deployment, ensuring high-quality, reliable code. You have full control to approve changes, edit test descriptions, or modify the code, blending human intuition with AI precision.',
		'In essence, Flogram is creating a paradigm shift in software development, where coding becomes a seamless, interactive dialogue between developer and AI, leading to more efficient, accurate, and high-quality software creation.'
	];
</script>

<div class="flex flex-col gap-10">
	<div class={`flex flex-col lg:flex-row gap-10 lg:gap-2 p-10`}>
		<div
			class="flex flex-col font-gabarito font-semibold text-charcoal dark:text-gray-200 gap-0 self-start w-1/2"
		>
			<span class="text-4xl md:text-5xl self-start">04</span>
			<span class="text-3xl md:text-4xl self-start">Coding With AI(Soon)</span>
		</div>
		<div class="flex flex-col gap-20">
			<DescriptionCard>
				description={descs[0]}
			</DescriptionCard>
		</div>
	</div>
	<div class="flex flex-col gap-12">
		{#each descs as description, index (index)}
			<div
				class={`w-full flex items-center ${index % 2 == 1 ? 'justify-end' : 'justify-start'} px-4`}
			>
				<DescriptionCard>
					{description}
				</DescriptionCard>
			</div>
		{/each}
	</div>
	<div class="flex justify-center gap-6 px-4">
		<CodeBox />
	</div>
</div>
