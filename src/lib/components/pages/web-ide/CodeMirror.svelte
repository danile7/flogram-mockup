<script lang="ts">
    import AppCodemirror from "$lib/components/core/AppCodemirror.svelte";

    export let value = ''
    export let handleChange: () => void = () => {
    }
</script>

<AppCodemirror bind:value on:change={handleChange}/>