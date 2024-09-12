// import { toast } from '@zerodevx/svelte-toast';
import {toast} from 'svelte-french-toast'

export function success(msg: string) {
	toast.success(msg)
}

export function error(msg = 'Errors were made') {
	toast.error(msg);
}
