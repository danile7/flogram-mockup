<script type='ts'>
	import ComponentsLayout from '$lib/layouts/ComponentsLayout.svelte';
</script>

<ComponentsLayout>
	<div class='flex flex-col gap-5'>
		<div class='flex flex-col gap-2'>
			<div class='flex justify-between'>
				<h1 class='text-4xl font-bold'>IconButton</h1>

			</div>
			<span>Icon button renders an icon within in a button.</span>
		</div>

		<section name='import'>
			<div class='flex flex-col gap-3'>
				<h1 class='text-2xl'>Import</h1>
			</div>
		</section>

		<section name='usage'>
			<div class='flex flex-col gap-3'>
				<h1 class='text-2xl'>Usage</h1>

				<div class='relative prose prose-slate w-full'>
					<pre class='language-shell leading-3'>
						<code class='language-shell'>
								&lt;IconButton icon=&#123;faHome&#125; variant='outline' colorScheme='black'&gt;&lt;/IconButton&gt;
						</code>
         </pre>
				</div>
			</div>
		</section>

		<section name='colors'>
			<div class='flex flex-col gap-3'>
				<h1 class='text-2xl'>Colors</h1>

			</div>
		</section>

		<section name='colors'>
			<div class='flex flex-col gap-3'>
				<h1 class='text-2xl'>Variants</h1>

			</div>
		</section>
	</div>
</ComponentsLayout>
