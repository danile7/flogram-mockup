<script lang="ts">
	import Select, { Option } from '@smui/select';
	type VariantType = 'outlined' | 'filled' | 'shaped-filled';
	export let label;
	export let variant = 'outlined';
	export let rounded: boolean = false;
	export let value;
	export let options = [];
	export let invalid = false;
	export let colorVariant = 'primary';
	export let icon;
	export let name;
	export let disabled: boolean = false;
</script>

<Select bind:value {label} {variant} class="shaped-filled app-mui-select">
	{#each options as option}
		<Option value={option}>{option}</Option>
	{/each}
</Select>

<style>
	/*icon color*/
	:global(.dark .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading) {
		color: rgba(255, 255, 255, 0.5);
	}

	:global(.light .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading) {
		color: rgba(0, 0, 0, 0.5);
	}

	/*icon color*/
	:global(.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading) {
		color: #b00020 !important;
	}

	/*icon focused color*/
	:global(.mdc-text-field:not(.mdc-text-field--disabled).mdc-text-field--focused.primary
			.mdc-text-field__icon--leading) {
		color: #13a6c7;
	}

	/*text color*/
	:global(.light .mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text) {
		color: rgba(0, 0, 0, 0.87);
	}

	:global(.dark .mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text) {
		color: rgba(255, 255, 255, 0.87);
	}

	/*input background*/

	:global(.dark .mdc-select--filled:not(.mdc-select--disabled) .mdc-select__anchor) {
		background: rgba(255, 255, 255, 0.1);
	}

	/*menu background*/
	:global(.mdc-menu-surface) {
		background: transparent;
	}

	:global(.dark .mdc-menu .mdc-deprecated-list) {
		background: rgba(30, 30, 30, 1);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
		color: rgba(240, 240, 240, 1);
	}

	:global(.light .mdc-menu .mdc-deprecated-list) {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
		color: rgba(60, 60, 60, 1);
	}

	/*active */
	:global(.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected) {
		/*color: inherit;*/
		color: #13a6c7;
	}

	:global(.dark .mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected) {
		background: rgba(255, 255, 255, 0.05);
	}

	:global(.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused
			.mdc-notched-outline
			.mdc-notched-outline__notch) {
		border-top: none;
		border-left: none;
		border-right: none;
	}

	/*text field color*/
	:global(.light .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input) {
		color: rgba(0, 0, 0, 0.7);
	}

	/*text field focused color*/
	:global(.mdc-text-field:not(.mdc-text-field--disabled).mdc-text-field--focused.primary
			.mdc-text-field__input) {
		color: #13a6c7;
	}

	/*text field border color*/
	:global(.mdc-text-field--outlined:not(.mdc-text-field--disabled)
			.mdc-notched-outline__leading, .mdc-text-field--outlined:not(.mdc-text-field--disabled)
			.mdc-notched-outline__notch, .mdc-text-field--outlined:not(.mdc-text-field--disabled)
			.mdc-notched-outline__trailing) {
		border-color: rgba(255, 255, 255, 0.38);
	}

	/*text field focused border color*/
	:global(.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover
			.mdc-notched-outline
			.mdc-notched-outline__leading, .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover
			.mdc-notched-outline
			.mdc-notched-outline__notch, .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover
			.mdc-notched-outline
			.mdc-notched-outline__trailing) {
		border-color: rgba(255, 255, 255, 0.87);
	}

	/*text field label color*/
	:global(.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label) {
		color: rgba(255, 255, 255, 0.6);
	}

	/*text field border color*/
	:global(.light
			.mdc-text-field--outlined:not(.mdc-text-field--disabled)
			.mdc-notched-outline__leading, .light
			.mdc-text-field--outlined:not(.mdc-text-field--disabled)
			.mdc-notched-outline__notch, .light
			.mdc-text-field--outlined:not(.mdc-text-field--disabled)
			.mdc-notched-outline__trailing) {
		border-color: rgba(0, 0, 0, 0.38);
	}

	/*text field focused border color*/
	:global(.light
			.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover
			.mdc-notched-outline
			.mdc-notched-outline__leading, .light
			.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover
			.mdc-notched-outline
			.mdc-notched-outline__notch, .light
			.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover
			.mdc-notched-outline
			.mdc-notched-outline__trailing) {
		border-color: rgba(0, 0, 0, 0.87);
	}

	/*text field label color*/
	:global(.light .mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label) {
		color: rgba(0, 0, 0, 0.6);
	}

	:global(.mdc-text-field:not(.mdc-text-field--disabled).mdc-text-field--focused.primary
			.mdc-floating-label) {
		color: #13a6c7;
	}
</style>
