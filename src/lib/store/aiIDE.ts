import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import toast from 'svelte-french-toast';
import { ACTIVE_BOX, AI_MODE } from '$lib/util/enums';
import { runBotsFromCodeToText, runCodeGenerateBot } from '$lib/services/ai.service';
import { current_tab } from '$lib/tabs';
import { runCode } from '$lib/components/pages/flogram-new-ide/FlogramCompiler.svelte';

export type AIMODE_TYPE = 'FAST' | 'QUALITY';

export type AIIDEState = {
	loading: boolean;
	terminalOpened: boolean;
	compareMode: boolean;
	isGeneratingCode: boolean;
	AIMode: AIMODE_TYPE;
	activeBox: null | 'TEXT' | 'CODE';
	textValue: string;
	codeValue: string;
	originalValue: string;
	compileOutput: string;
	failures: any[];
	errors: any[];
	oldEnglish: string;
	newEnglish: string;
	oldCode: string;
	newCode: string;
};

const initialState: AIIDEState = {
	loading: false,
	terminalOpened: false,
	compareMode: false,
	isGeneratingCode: false,
	AIMode: AI_MODE.FAST,
	activeBox: ACTIVE_BOX.NONE,
	textValue: ``,
	codeValue: ``,
	originalValue: ``,
	compileOutput: ``,
	failures: [],
	errors: [],
	newEnglish: '',
	oldEnglish: 'a',
	oldCode: '',
	newCode: ''
};

const createAIIDEStore = () => {
	const { subscribe, update }: Writable<AIIDEState> = writable(initialState);

	/**
	 * @Store Actions
	 */

	const setLoading = (loading: boolean) => update((data) => ({ ...data, loading }));

	const setGeneratingCode = (isGeneratingCode: boolean) =>
		update((data) => ({ ...data, isGeneratingCode }));

	const setTerminalOpen = (terminalOpened: boolean) =>
		update((data) => ({ ...data, terminalOpened }));

	const setCompareMode = (compareMode: boolean) => update((data) => ({ ...data, compareMode }));

	const setActiveBox = (activeBox: null | 'TEXT' | 'CODE') =>
		update((data) => ({ ...data, activeBox }));

	const setText = (textValue: string) => update((data) => ({ ...data, textValue }));

	const setCode = (codeValue: string) => update((data) => ({ ...data, codeValue }));

	const setOldEnglish = (oldEnglish: string) => update((data) => ({ ...data, oldEnglish }));

	const setNewEnglish = (newEnglish: string) => update((data) => ({ ...data, newEnglish }));

	const setOldCode = (oldCode: string) => update((data) => ({ ...data, oldCode }));

	const setNewCode = (newCode: string) => update((data) => ({ ...data, newCode }));

	const setOriginalValue = (originalValue: string) =>
		update((data) => ({ ...data, originalValue }));

	const setCompileOutput = (compileOutput: string) =>
		update((data) => ({ ...data, compileOutput }));

	const setFailures = (failures: any) => update((data) => ({ ...data, failures }));

	const setErrors = (errors: any) => update((data) => ({ ...data, errors }));

	const changeAIMode = (AIMode: AIMODE_TYPE) => update((data) => ({ ...data, AIMode }));
	/**
	 * @async actions
	 */

	const runCurrentCode = async () => {
		const $current_tab = get(current_tab);

		let { newCode } = get(aiIDEStore);

		setFailures([]);
		setCompileOutput('')

		if (!$current_tab) {
			toast.error('Select a file!');
		}
		else if(!$current_tab.endsWith('.flo')){
			toast.error('This is not flogram file!')
		}
		else if (!newCode || newCode?.trim().length === 0) {
			toast.error('Code is Empty');
		} else {
			const res = await runCode(newCode);
			if (res?.success) {
				setCompileOutput(res?.output as string);
				setErrors([]);
				setFailures([]);
				setGeneratingCode(false);
				toast.success('Code executed successfully!');
			} else {
				if (res?.failures) {
					setFailures(res?.failures);
				}
				if (res?.error) {
					toast.error(res?.error);
				}
			}
		}
	};

	const generateCode = async () => {
		const $current_tab = get(current_tab);

		let { oldEnglish, newEnglish, oldCode } = get(aiIDEStore);

		if (!$current_tab) {
			toast.error('Select a file!');
		} else if ( !newEnglish || newEnglish?.trim().length === 0) {
			toast.error('Text Input is empty');
		} else if (oldEnglish === newEnglish) {
			toast.error('Text Input has not changed');
		} else {
			if (oldEnglish.trim().length === 0) {
				oldEnglish = 'test';
			}
			if (oldCode.trim().length === 0) {
				oldCode = 'test';
			}
			toast.success('generating...');
			try {
				setGeneratingCode(true);

				// let res: { result: string } = (await runCodeGenerateBot({
				// 	oldEnglish,
				// 	newEnglish,
				// 	oldCode
				// })) as { result: string };

				let res:string = await runCodeGenerateBot({
					userInput: newEnglish
				});

				console.log('res:::', JSON.stringify(res))

				toast.success('New Code was generated 😍');

				const code = res.replace("      Code:", "");

				setOldCode(code);
				setNewCode(code);
				setOldEnglish(newEnglish);
			} catch (err: any) {
				toast.error(err.message);
			} finally {
				setGeneratingCode(false);
			}
		}
	};

	const generateText = async (userInput: string | undefined) => {
		setLoading(true);

		try {
			let text: string = (await runBotsFromCodeToText(userInput as string)) as string;
			setText(text);
		} catch (err: any) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return {
		subscribe,
		setLoading,
		setTerminalOpen,
		setCompareMode,
		setActiveBox,
		setText,
		setCode,
		setOriginalValue,
		setCompileOutput,
		setFailures,
		setErrors,
		generateCode,
		generateText,
		setOldEnglish,
		setNewEnglish,
		setOldCode,
		setNewCode,
		changeAIMode,
		runCurrentCode
	};
};

const aiIDEStore = createAIIDEStore();
export default aiIDEStore;
