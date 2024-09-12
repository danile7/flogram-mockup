import { ListType } from '$lib/types/List';

/** Dispatch event on click outside of node */
export function clickOutside(node: any) {
	const handleClick = (event: any) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export const getObjectTypeFromURL = (data: any): string => {
	const url = data.name + '/' + data.path;
	if (url.search(data.name + '/tree') >= 0) return ListType.FOLDER;
	else if (url.search(data.name + '/blob') >= 0) return ListType.FILE;
	else return ListType.FOLDER;
};

export const replaceSlashfromURL = (url: string): string => {
	return url.replace(/[/]/g, '-');
};

export const removeFileTypeFromURL = (data: any, type: string): string => {
	let url = '';
	if (!data.path) return url;
	if (type === ListType.FOLDER) url = data.path.replace(/tree[/]/, '');
	else url = data.path.replace(/blob[/]/, '');
	return url;
};

export const getBreadCrumbs = (libraryName: string, path: string): any => {
	let result = [{ url: libraryName, label: libraryName }];
	let items = path.split('/');

	items.forEach((item: string) => {
		if (!(item === 'blob' || item === 'tree' || item === 'find')) {
			let url = path.slice(0, path.search(item) + item.length);
			url = `${libraryName}/${url}`;
			if (item.search(/\./) < 0) {
				let suburl = url.replace('blob', 'tree');
				result.push({
					url: suburl,
					label: item
				});
			} else {
				result.push({
					url: url,
					label: item
				});
			}
		}
	});
	return result;
};

export const getFullFormatDateFromISOString = (isoString) => {
	const date = new Date(isoString);
	const year = date.getFullYear();
	let month: number | string = date.getMonth() + 1;
	let dt: number | string = date.getDate();

	if (dt < 10) {
		dt = '0' + dt;
	}
	if (month < 10) {
		month = '0' + month;
	}
	const fullDate = year + '-' + month + '-' + dt;
	return fullDate;
};

export function format_date(date: Date): string {
	return new Date(date).toLocaleString('default', {
		year: 'numeric',
		day: '2-digit',
		month: 'short'
	});
}

// Set a cookie
export const setCookie = (name: string, value: string, days = 365): void => {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/`;
};

// Get a cookie value by name
export const getCookie = (name: string): string | undefined => {
	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.split('=');
		if (cookieName.trim() === name) {
			return cookieValue;
		}
	}
	return undefined;
};

// Delete a cookie by name
export const deleteCookie = (name: string): void => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const isEmptyString = (str: string | undefined): boolean =>
	typeof str === 'undefined' || (typeof str !== 'undefined' && str.trim().length === 0);

export const isNull = (val: any): boolean => val === null;

export const isUndefined = (val: any): boolean => typeof val === 'undefined' || val === 'undefined';

export const isEmptyArray = (array: any): boolean => Array.isArray(array) && array.length === 0;

export const isEmptyObjet = (obj: any): boolean => typeof obj === 'object' && Object.keys(obj).length > 0;

export const isAccessTokenSet = () =>
	localStorage && localStorage.access_token && !isEmptyString(localStorage.access_token);

export const isEmail = (email) => {
	// Regular expression for validating email addresses
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
