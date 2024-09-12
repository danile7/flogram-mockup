export type AIIDE = {
	isLoading: boolean;
	isTerminalOpened: boolean;
	compareMode: boolean;
	activeBox: null | string;
	textValue: string;
	codeValue: string;
	originalValue: string;
	compileOutput: string;
	failures: any[];
};
