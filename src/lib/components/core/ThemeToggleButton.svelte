<script lang='ts'>
	export let dark = true;
	export let handleClick: () => void = () => {
	};
</script>

<button
	class='flex justify-center items-center w-10 h-10 rounded-lg p-2 cursor-pointer transition-all duration-200 dark:bg-[#101820] light:bg-white'
	on:click={() => handleClick()}
>
	<div class='w-full h-full relative'
	>
		<div
			class='w-full h-full rounded-full'
			class:gradient-dark={dark}
			class:gradient-light={!dark}></div>

		<div
			class={`absolute rounded-full bg-white dark:bg-[#101820] transition-all duration-500 ${dark ? "w-[70%] h-[70%] top-[0.5px] right-[0.5px] " : "w-0 h-0  top-[3px] right-[3px]"}  `}>
		</div>

	</div>
</button>

<style>
    .gradient-light {
        background: linear-gradient(40deg, #FF0080, #FF8C00 70%);
    }

    .gradient-dark {
        background: linear-gradient(40deg, #8983F7, #A3DAFB 70%);
    }
</style>