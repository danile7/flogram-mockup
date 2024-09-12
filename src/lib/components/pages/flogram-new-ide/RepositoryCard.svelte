<script lang='ts'>
	import { goto } from '$app/navigation';

	export let name: string = 'test-project';
	export let link: string = '';

</script>

<button
	on:click={() => goto(link)}
	class='cursor-pointer flex flex-col bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-10 flex flex-col min-w-[280px] p-4 rounded-md shadow-md  hover:text-primary  hover:border-primary dark:hover:border-primary dark:hover:border-opacity-100 border border-black border-opacity-10 dark:border-opacity-20 hover:border-opacity-100 dark:hover:border-opacity-100 dark:border-white transition-all duration-300'>
	<div class='flex justify-start'>{name}</div>
</button>