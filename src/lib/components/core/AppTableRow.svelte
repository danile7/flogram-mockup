<script>
	let clazz = '';
	export { clazz as class };
</script>

<button
	on:click
	class={`${clazz} w-full grid grid-cols-12 gap-0 border-b border-black border-opacity-10 px-3`}>
	<slot />
</button>