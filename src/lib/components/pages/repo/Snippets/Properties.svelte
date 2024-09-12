<script lang='ts'>


	import { onMount, createEventDispatcher } from 'svelte';
	import { getCookie } from '../Utils.svelte';
	import type { File } from '../Struct.svelte';
	import Swal from 'sweetalert2';

	export let item: File;
	export let readOnly: boolean;

	const dispatch = createEventDispatcher();
	let modal = null;


	let destroy;
	let Modal;


	const loadAxentix = async () => {
		const module = await import('axentix');
		destroy = module.destroy;
		Modal = module.Modal;
	};


	onMount(async () => {
		modal = new Modal('#modal-properties', { bodyScrolling: true });
		if (window || document) {
			await loadAxentix();
			const modalQuery = document.querySelector('#modal-properties');
			modalQuery.addEventListener('ax.modal.closed', function() {
				destroy('#modal-properties');
				dispatch('closePropsModal');
			});
			modal.open();
		}
	});

	async function rename() {
		const { value: nuName } = await Swal.fire({
			titleText: 'Enter new name',
			confirmButtonColor: '#0a6bb8',
			showCancelButton: true,
			input: 'text',
			inputValue: item.name.replaceAll('/', ''),
			inputAttributes: {
				autocapitalize: 'off',
				autocorrect: 'off'
			}
		});

		if (!nuName) {
			return;
		}

		if (item.name == nuName) {
			await Swal.fire({
				icon: 'error',
				text: 'Old and new name must be different',
				confirmButtonColor: '#0a6bb8'
			});
			return;
		}

		await Swal.fire({
			icon: 'warning',
			text: 'Not implemented in the demo site',
			confirmButtonColor: '#0a6bb8'
		});

		modal.close();
	}

	async function del() {
		const { value: confirm } = await Swal.fire({
			html:
				'Do you really want to delete<br/><code>' +
				item.path +
				'</code>&nbsp;?',
			icon: 'question',
			confirmButtonColor: '#0a6bb8',
			showCancelButton: true,
			cancelButtonText: 'No'
		});
		if (!confirm) {
			return;
		}

		await Swal.fire({
			icon: 'warning',
			text: 'Not implemented in the demo site',
			confirmButtonColor: '#0a6bb8'
		});

		modal.close();
	}

	function toPaste(isCut: boolean) {
		return function() {
			dispatch('toPaste', { file: item, isCut: isCut });
			modal.close();
		};
	}
</script>

<div class='modal shadow-1 white rounded-3 modal-bouncing' id='modal-properties'>
	<div class='modal-header ellipsis'>
		<img alt={item.icon[0]} src='icons/48x48/{item.icon[0]}.svg' />&nbsp;{item.name}
	</div>
	<div class='modal-content container'>
		<p class='ellipsis'><b>File name:</b> <span title={item.name}>{item.name}</span></p>
		<p class='ellipsis'><b>Size:</b> {item.size}</p>
		<p class='ellipsis'><b>Mod. date:</b> {item.chDate}</p>
		<p class='ellipsis'><b>Type:</b> {item.mimeType}</p>
		<p class='ellipsis'><b>Owner:</b> {item.owner}</p>
		<p class='ellipsis'><b>Group:</b> {item.group}</p>
		<p class='ellipsis'><b>Permissions:</b> {item.permissions}</p>
		<div>&nbsp;</div>
		{#if !readOnly && (!item.isDir || item.name != '../')}
			<div class='btn-group btn-group-small rounded-1 hide-xs mx-auto'>
				<button class='btn primary' on:click|stopPropagation={toPaste(true)}>Cut</button>
				<button class='btn primary' on:click|stopPropagation={toPaste(false)}>Copy</button>
				<button class='btn primary' on:click|stopPropagation={rename}>Rename</button>
				<button class='btn error' on:click|stopPropagation={del}>Delete</button>
			</div>
			<div class='hide-sm-up'>
				<div class='btn-group btn-group-small rounded-1 mx-auto'>
					<button class='btn primary' on:click|stopPropagation={toPaste(true)}>Cut</button>
					<button class='btn primary' on:click|stopPropagation={toPaste(false)}>Copy</button>
				</div>
				<div>&nbsp;</div>
				<div class='btn-group btn-group-small rounded-1 mx-auto'>
					<button class='btn primary' on:click|stopPropagation={rename}>Rename</button>
					<button class='btn error' on:click|stopPropagation={del}>Delete</button>
				</div>
			</div>
		{/if}
	</div>
</div>
