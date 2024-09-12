<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {js_snippets, svelte_snippets} from '$lib/svelte-snippets';
    import {HighlightStyle, LanguageSupport, syntaxHighlighting} from '@codemirror/language';
    import type {Extension} from '@codemirror/state';
    import {EditorView, placeholder} from '@codemirror/view';
    import {abbreviationTracker} from '@emmetio/codemirror6-plugin';
    import {tags} from '@lezer/highlight';
    import {codemirror, withCodemirrorInstance} from '@neocodemirror/svelte';
    import {svelte} from '@replit/codemirror-lang-svelte';
		import { editor_config } from '$lib/store/editor_config_store';

    export let value: string = '';
    export let current_lang: string = '';
		export let placeholderText: string = '';


    const dispatch = createEventDispatcher();

    const svelte_syntax_style = HighlightStyle.define([
        {tag: tags.comment, color: 'var(--sk-code-comment)'},
        {tag: tags.keyword, color: 'var(--sk-code-keyword)'},
        {tag: tags.string, color: 'var(--sk-code-string)'},
        {tag: tags.number, color: 'var(--sk-code-number)'},
        {tag: tags.tagName, color: 'var(--sk-code-tags)'},
        {tag: tags.className, color: 'var(--sk-code-component)'},
    ]);

    const theme = syntaxHighlighting(svelte_syntax_style);

    const languages: Record<string, () => Promise<LanguageSupport>> = {
        svelte: async () => svelte(),
        svx: async () => svelte(),
        html: () => import('@codemirror/lang-html').then((lang) => lang.html()),
        js: () => import('@codemirror/lang-javascript').then((lang) => lang.javascript()),
        cjs: () => import('@codemirror/lang-javascript').then((lang) => lang.javascript()),
        mjs: () => import('@codemirror/lang-javascript').then((lang) => lang.javascript()),
        ts: () => import('@codemirror/lang-javascript').then((lang) => lang.javascript()),
        css: () => import('@codemirror/lang-css').then((lang) => lang.css()),
        json: () => import('@codemirror/lang-json').then((lang) => lang.json()),
        md: () => import('@codemirror/lang-markdown').then((lang) => lang.markdown()),
        python : () => import('@codemirror/lang-python').then((lang) => lang.python()),
        flo : () => import('@codemirror/lang-python').then((lang) => lang.python()),
    };

    let cursor: number | null = null;

		async function get_extensions(config: typeof $editor_config) {
			const extensions = [js_snippets, svelte_snippets, abbreviationTracker()];
			if (config.code_wrap) {
				extensions.unshift(EditorView.lineWrapping);
			}

			if(placeholderText){
				extensions.push(placeholder(placeholderText));
			}
			return extensions;
		}

    let extensions: Extension[];

    $: lang = current_lang && current_lang in languages ? current_lang : undefined;

		$: get_extensions($editor_config).then((resolved_extensions) => {
			extensions = resolved_extensions;
		});

    export const codemirror_instance = withCodemirrorInstance();
</script>

<div
        class="codemirror-wrapper"
        on:codemirror:textChange={({ detail: new_code }) => {
				value = new_code;
                dispatch('change', {value: new_code});
			}}
        use:codemirror={{
				lang,
				langMap: languages,
				theme,
				tabSize: 3,
				useTabs: true,
				value: value,
				documentId: 'editor-1',
				extensions,
				cursorPos: cursor,
				setup: 'basic',
				instanceStore: codemirror_instance,
				onChangeBehavior: {
					duration: 300,
					kind: 'throttle',
				},
				styles: {
					'&': {
						width: '100%',
						height: '100%',
						overflow: 'auto',
						backgroundColor: 'var(--sk-back-1)',
						color: 'var(--sk-code-base)',
					},
					'*': {
						fontFamily: 'var(--sk-font-mono)',
						tabSize: 3,
						fontSize: 'var(--sk-editor-font-size)',
					},
					'.cm-gutters': {
						border: 'none',
					},
					'.cm-gutter': {
						backgroundColor: 'var(--sk-back-1)',
						color: 'var(--sk-code-base)',
					},
					'.cm-line.cm-activeLine': {
						backgroundColor: 'var(--sk-back-translucent)',
					},
					'.cm-activeLineGutter': {
						backgroundColor: 'var(--sk-back-3)',
					},
					'.cm-focused.cm-selectionBackground': {
						backgroundColor: 'var(--sk-back-4) !important',
					},
					'.cm-selectionBackground': {
						backgroundColor: 'var(--sk-back-5) !important',
					},
					'.cm-cursor': {
						borderColor: 'var(--sk-code-base)',
					},
					'.cm-tooltip': {
						border: 'none',
						background: 'var(--sk-back-3)',
					},
					'.cm-tooltip.cm-tooltip-autocomplete > ul': {
						background: 'var(--sk-back-3)',
					},
					'.cm-tooltip-autocomplete ul li[aria-selected]': {
						background: 'var(--sk-theme-1)',
						color: 'var(--sk-text-1)',
					},
					'.cm-tooltip-lint': {
						background: 'var(--sk-back-3)',
						color: 'var(--sk-text-1)',
					},
					'.cm-panels': {
						background: 'var(--sk-back-3)',
						color: 'var(--sk-text-1)',
					},
				},
			}}
/>

<style>
    :global(.codemirror-wrapper) {
        grid-row: 2;
        overflow: auto;
    }
</style>
