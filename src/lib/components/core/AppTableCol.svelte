<script>
	let clazz = '';
	export { clazz as class };
	export let col = 1;

	const cols = {
		'1': 'col-span-1',
		'2': 'col-span-2',
		'3': 'col-span-3',
		'4': 'col-span-4',
		'5': 'col-span-5',
		'6': 'col-span-6',
		'7': 'col-span-7',
		'8': 'col-span-8',
		'9': 'col-span-9',
		'10': 'col-span-10',
		'11': 'col-span-11',
		'12': 'col-span-12'
	};


</script>

<button
	on:click
	class={` ${clazz} ${cols[col]} py-2`}>
	<slot />
</button>