<script lang="ts">
    import Button from '@smui/button';
    import EosIconsBubbleLoading from '~icons/eos-icons/bubble-loading';

    type VariantType = 'primary' | 'outlined';
    type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    export let variant: VariantType = 'primary';
    export let size: SizeType = 'md';
    export let disabled: boolean = false;
    export let isLoading: boolean = false;
    export let rounded: boolean = true;
    export let icon: typeof import('svelte').SvelteComponent;

    export let handleClick: () => any | void;
</script>

<Button
        on:click={disabled || isLoading ? () => {} : () => handleClick()}
        class={`custom-icon-button-123123 ${variant} ${size} ${rounded ? 'rounded' : null} ${
		disabled || isLoading ? 'disabled' : null
	} ${isLoading ? 'loading' : null}`}
>
    {#if isLoading}
        <div
                class={`w-full h-full flex justify-center items-center absolute left-0 top-0 bg-black bg-opacity-50 ${
				rounded ? 'rounded-full' : 'rounded-md'
			}`}
        >
            <EosIconsBubbleLoading/>
        </div>
    {:else}
        <svelte:component this={icon}/>
    {/if}

</Button>

<style>
    * :global(.myClass) {
        font-style: italic;
    }

    :global(.custom-icon-button-123123.mdc-button) {
        width: auto !important;
        padding: 0 !important;
    }

    :global(.custom-icon-button-123123.mdc-button.disabled) {
        filter: saturate(0);
        background: transparent;
    }

    :global(.custom-icon-button-123123.mdc-button.loading .loading-spinner) {
    }

    :global(.custom-icon-button-123123.mdc-button.disabled .mdc-button__ripple) {
        display: none;
    }

    :global(.custom-icon-button-123123.mdc-button .material-icons) {
        margin: 0;
        padding: 0;
    }

    :global(.custom-icon-button-123123.mdc-button.outlined) {
        border: 1px solid;
    }

    :global(.custom-icon-button-123123.mdc-button .mdc-button__ripple) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 !important;
    }

    :global(.custom-icon-button-123123.mdc-button.rounded) {
        border-radius: 100px;
    }

    :global(.custom-icon-button-123123.mdc-button.rounded .mdc-button__ripple) {
        border-radius: 100px;
    }

    :global(.custom-icon-button-123123.mdc-button.xs) {
        min-width: 36px !important;
        width: 36px;
        height: 36px;
    }

    :global(.custom-icon-button-123123.mdc-button.sm) {
        min-width: 40px !important;
        width: 40px;
        height: 40px;
    }

    :global(.custom-icon-button-123123.mdc-button.md) {
        min-width: 44px !important;
        width: 44px;
        height: 44px;
    }

    :global(.custom-icon-button-123123.mdc-button.lg) {
        min-width: 48px !important;
        width: 48px;
        height: 48px;
    }

    :global(.custom-icon-button-123123.mdc-button.xl) {
        min-width: 52px !important;
        width: 52px;
        height: 52px;
    }

    .custom.mdc-button {
    }
</style>
