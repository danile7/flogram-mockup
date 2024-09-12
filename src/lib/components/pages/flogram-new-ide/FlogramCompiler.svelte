<script lang="ts" context="module">
	import {
		Parser,
		Tokenizer,
		Compiler,
		MemoryManager,
		Draw,
		SIMPLE_IMPORTS
	} from '@munezero/floparser';

    const ENCODER = new TextEncoder();

	export const runCode = async (value: string) => {
		let outputElement = document && document.createElement('div');

		let failures:any[] = [];

        let representation;

		const tokenizer = new Tokenizer();

		const parser = Parser.create({
			path: 'Module',
			imports: SIMPLE_IMPORTS
		});

		parser.on(Parser.EVENT_FAIL, (failure) => {
			failures = [...failures, failure];
			representation = null;
		});

		parser.on(Parser.EVENT_DONE, (data) => {
			representation = data;
		});

		tokenizer.on('token', (position, array, index, length) => {
			parser.feed(position, array, index, length);
		});

		tokenizer.feed(ENCODER.encode(value));

		tokenizer.done();

		parser.done();

		const execute = async (glue, module) => {
			let key;
			for (const [iKey, value] of Object.entries(glue.procedures)) {
				const { name, path } = value;

				if (name === 'main' && path === 'Module') {
					key = iKey;
					break;
				}
			}
			if (key) {
				try {
					const memory = new WebAssembly.Memory({
						initial: 128
					});

					const state = MemoryManager(memory);
					const drawer = Draw(memory, outputElement);

					const descriptionImports = Object.freeze({
						imports: {}
					});

					const memoryImport = 'memory';

					Object.keys(glue.imports).forEach((importKey) => {
						if (state[importKey]) {
							descriptionImports.imports[importKey] = state[importKey];
						}
						if (drawer[importKey]) {
							descriptionImports.imports[importKey] = drawer[importKey];
						}
						if (importKey === memoryImport) {
							descriptionImports.imports[importKey] = memory;
						}
					});

					const moduleCompiled = await WebAssembly.compile(module);
					const moduleInstance = await WebAssembly.instantiate(moduleCompiled, descriptionImports);

					const procedure = moduleInstance.exports[key];
					if (procedure) {
						if (!outputElement) {
							toast.error("Output element not found. Click 'Run' again for re-evaluation");
						}
						if (outputElement) {
							outputElement.innerHTML = '';
						}
						procedure();

                        // aiIDEStore.setCompileOutput(outputElement.innerHTML);

                        return {
                            success : true,
                            output : outputElement.innerHTML
                        }
					}
				} catch (e) {
					console.log(e.message);

                    return {
                        success: false,
                        error : 'COMPILATION ERROR OCCURRED😔' + e.message
                    }
				}
			}
		};

		// if thre is any errors
		if (failures.length > 0) {
			
            return {
                success : false,
                failures 
            }


		} else {
            failures  = [];

			if (representation) {
				const compilerOptions = Object.freeze({
					memory: true
				});

				const [glue, module] = Compiler.compile(representation, compilerOptions);
				let res = await execute(glue, module);
                if(res?.success){
                    return {
                        success : true,
                        output : res.output
                    }
                }
                else{
                    return {
                        success: false,
                        error : res?.error
                    }
                }
			}
		}
	};
</script>
