import Basic from '~icons/simple-icons/svelte';

export const template_icon_map = new Map(
	Object.entries({
		basic: Basic,
	}),
);

function capitalize(title: string) {
	return `${title.charAt(0).toUpperCase()}${title.substring(1)}`;
}

export function fix_title(title: string) {
	return title.split('_').map(capitalize).join(' ');
}
