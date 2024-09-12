<script lang='ts'>
	import Textfield from '@smui/textfield';
	import EosIconsBubbleLoading from '~icons/eos-icons/bubble-loading';

	export let value = '';
	export let invalid = false;
	export let variant = 'outlined';
	export let colorVariant = '';
	export let label = '';
	export let icon = null;
	export let type = 'text';
	export let name;
	export let disabled: boolean = false;
	export let isLoading: boolean = false;
	let clazz = '';
	export { clazz as class };
</script>

{#if isLoading}
	<!-- Add any specific content you want to show while loading here -->
{/if}

<div class='relative flex flex-col'>
	{#if isLoading}
		<div class='absolute w-full h-full flex'>
			<div class='absolute right-4 h-full flex justify-center items-center'>
				<EosIconsBubbleLoading/>
			</div>
		</div>
	{/if}
	{#if icon !== null}
		<Textfield
			bind:value={value}
			type={type}
			variant={variant}
			label={label}
			invalid={invalid}
			name={name}
			disabled={disabled || isLoading}
			class={`shaped-outlined text-white ${clazz} ${colorVariant}`}
			placeholder='hello world'
		>
			<!-- <Icon class='material-icons' slot='leadingIcon'>{icon}</Icon> -->
		</Textfield>
	{:else}
		<Textfield
			bind:value={value}
			type={type}
			variant={variant}
			label={label}
			invalid={invalid}
			name={name}
			disabled={disabled}
			class={`shaped-outlined text-white ${clazz} ${colorVariant}`}
		>
		</Textfield>
	{/if}
</div>
<input class='hidden' value={value} name={name} />

<style>

    * :global(.shaped-outlined + .mdc-text-field-helper-line) {
    	padding-left: 32px;
    	padding-right: 28px;
    }

    /*border radius*/
    * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__leading) {
        border-radius: 28px 0 0 28px;
        width: 28px;
    }

    * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__trailing) {
        border-radius: 0 28px 28px 0;
    }

    /* icon color */
    :global(.dark .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading) {
        color: rgba(255, 255, 255, 0.5);
    }

    :global(.light .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading) {
        color: rgba(0, 0, 0, 0.5);
    }

    /* icon color */
    :global(.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading) {
        color: #b00020 !important;
    }

    /* icon focused color */
    :global(.mdc-text-field:not(.mdc-text-field--disabled).mdc-text-field--focused.primary .mdc-text-field__icon--leading) {
        color: #13A6C7;
    }

		/*padding*/
    :global(.mdc-text-field__input) {
				padding-left: 15px;
    }

    /* text field color */
    :global(.dark .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input) {
        color: rgba(255, 255, 255, 0.7);
    }

    /* text field color */
    :global(.light .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input) {
        color: rgba(0, 0, 0, 0.7);
    }

    /* text field focused color */
    :global(.mdc-text-field:not(.mdc-text-field--disabled).mdc-text-field--focused.primary .mdc-text-field__input) {
        color: #13A6C7;
    }

    /* text field border color */
    :global(.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading, .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch, .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing) {
        border-color: rgba(255, 255, 255, 0.38);
    }

    /* text field focused border color */
    :global(.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading, .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch, .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline__trailing) {
        border-color: rgba(255, 255, 255, 0.87);
    }

    /* text field label color */
    :global(.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label) {
        color: rgba(255, 255, 255, 0.6);
    }

    /* text field border color */
    :global(.light .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading, .light .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch, .light .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing) {
        border-color: rgba(0, 0, 0, 0.38);
    }

    /* text field focused border color */
    :global(.light .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading, .light .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline__notch, .light .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline__trailing) {
        border-color: rgba(0, 0, 0, 0.87);
    }

    /* text field label color */
    :global(.light .mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label) {
        color: rgba(0, 0, 0, 0.6);
    }

    :global(.mdc-text-field:not(.mdc-text-field--disabled).mdc-text-field--focused.primary .mdc-floating-label) {
        color: #13A6C7;
    }
</style>
