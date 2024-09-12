<script>
	let clazz = '';
	export { clazz as class };
</script>

<div
	class={`${clazz} w-full grid grid-cols-12 gap-0 font-bold border-b border-black border-opacity-10 px-3`}>
	<slot />
</div>