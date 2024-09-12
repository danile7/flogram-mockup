<script context='module'></script>

<script>
	import { afterUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { basicSetup } from 'codemirror';
	import { EditorState, StateEffect } from '@codemirror/state';
	import { EditorView, keymap, placeholder as placeholderExt } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	import { indentUnit } from '@codemirror/language';
	import { unifiedMergeView } from '@codemirror/merge';
	import EosIconsThreeDotsLoading from '~icons/eos-icons/three-dots-loading';

	let classes = '';
	export { classes as class };

	export let basic = true;
	export let lang = void 0;
	export let theme = void 0;
	export let extensions = [];
	export let useTab = true;
	export let tabSize = 2;
	export let styles = void 0;
	export let lineWrapping = false;
	export let editable = true;
	export let readonly = false;
	export let placeholder = void 0;

	export let value = '';
	export let originalValue = '';
	export let compare = true;

	export let nodebounce = false;
	const is_browser = typeof window !== 'undefined';
	const dispatch = createEventDispatcher();
	let element;
	let view;
	let update_from_prop = false;
	let update_from_state = false;
	let first_config = true;
	let first_update = true;

	function debounce(func, threshold, execAsap = false) {
		let timeout;
		return function debounced(...args) {
			const self = this;
			if (timeout) clearTimeout(timeout);
			else if (execAsap) func.apply(self, args);
			timeout = setTimeout(() => {
				if (!execAsap) func.apply(self, args);
				timeout = null;
			}, threshold || 100);
		};
	}

	$: state_extensions = [
		...get_base_extensions(
			basic,
			useTab,
			tabSize,
			lineWrapping,
			placeholder,
			editable,
			readonly,
			lang
		),
		...get_theme(theme, styles),
		...extensions
	];
	$: {
		if (view) {
			update(value, compare, originalValue);
		}
	}

	$: {
		if (view && state_extensions) {
			reconfigure();
		}
	}
	$: on_change = nodebounce ? handle_change : debounce(handle_change, 300);

	$: if (compare !== undefined) {
		// console.log('compare value is ', compare);
	}

	onMount(() => {
		view = create_editor_view();
		updateButtonLabels();
		dispatch('ready', view);
	});

	afterUpdate(() => {
		updateButtonLabels();
	});

	onDestroy(() => {
		if (view) view.destroy();
	});

	function create_editor_view() {
		return new EditorView({
			parent: element,
			state: create_editor_state(value),
			dispatch(transaction) {
				view.update([transaction]);
				if (!update_from_prop && transaction.docChanged) {
					on_change();
				}
			}
		});
	}

	function reconfigure() {
		if (first_config) {
			first_config = false;
			return;
		}
		view.dispatch({
			effects: StateEffect.reconfigure.of(state_extensions)
		});
	}

	function update(value2, compare2, originalValue2) {
		if (first_update) {
			first_update = false;
			return;
		}
		if (update_from_state) {
			update_from_state = false;
			return;
		}
		update_from_prop = true;
		view.setState(create_editor_state(value2, compare2, originalValue2));
		update_from_prop = false;
	}

	function handle_change() {
		const new_value = view.state.doc.toString();
		if (new_value === value) return;
		update_from_state = true;
		value = new_value;

		dispatch('change', value);
		updateButtonLabels();
	}

	function create_editor_state(value2, compare2 = compare, originalValue2 = originalValue) {
		let extensions = [...state_extensions];

		if (compare2) {
			extensions.push(
				unifiedMergeView({
					original: originalValue2,
					highlightChanges: true,
					gutter: true,
					mergeControls: false
				})
			);
		}

		return EditorState.create({
			doc: value2 ?? void 0,
			extensions
		});
	}

	function get_base_extensions(
		basic2,
		useTab2,
		tabSize2,
		lineWrapping2,
		placeholder2,
		editable2,
		readonly2,
		lang2
	) {
		const extensions2 = [
			indentUnit.of(' '.repeat(tabSize2)),
			EditorView.editable.of(editable2),
			EditorState.readOnly.of(readonly2)
		];
		if (basic2) extensions2.push(basicSetup);
		if (useTab2) extensions2.push(keymap.of([indentWithTab]));
		if (placeholder2) extensions2.push(placeholderExt(placeholder2));
		if (lang2) extensions2.push(lang2);
		if (lineWrapping2) extensions2.push(EditorView.lineWrapping);
		return extensions2;
	}

	function get_theme(theme2, styles2) {
		const extensions2 = [];
		if (styles2) extensions2.push(EditorView.theme(styles2));
		if (theme2) extensions2.push(theme2);
		return extensions2;
	}

	function updateButtonLabels() {
		const acceptButtons = element.querySelectorAll('button[name="accept"]');
		const rejectButtons = element.querySelectorAll('button[name="reject"]');

		acceptButtons.forEach((button) => (button.textContent = 'Accept Changes'));
		rejectButtons.forEach((button) => (button.textContent = '↩'));
	}
</script>

{#if is_browser}
	<div class='codemirror-wrapper {classes}' bind:this={element} />
{:else}
	<div class='absolute w-full h-full'>
		<div
			class='absolute top-[0] left-[0] bottom-[0] right-[0] bg-[rgba(0,_0,_0,_0.4)] text-[white] flex items-center justify-center flex h-full w-full'
		>
			<EosIconsThreeDotsLoading class='mr-3' />

			<p class='font-[sans-serif]'>Loading editor...</p>
		</div>

		<pre
			class='text-[0.85rem] font-[monospace] [tab-size:2] resize-none pointer-events-none select-none overflow-auto cm-editor'>{value}</pre>
	</div>
{/if}

<style>
    .codemirror-wrapper :global(.cm-focused) {
        outline: none;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
