import posts from '$lib/tutorials/posts';
import config from '$lib/util/config';

const initialPost = config.tutorial.initialPost;

export async function load(param) {

	let { route, fetch } = param;

	const tutorials = await posts();

	let [prev, next] = tutorials;

	let codeValue = `enum Season:
		WINTER
		SPRING
		SUMMER
		FALL
	`;

	let pathname = route.id;
	let category = pathname.split('/').reverse()[0];

	if (category) {
		try {
			const response = await fetch(`/tutorials/${category}.txt`);

			if (response.ok) {
				codeValue = await response.text();
			} else {
				console.error('Failed to fetch file content:', response.statusText);
			}
		} catch (error) {
			console.error('Failed to fetch file content:', error);
		}


		const index = tutorials?.findIndex(tutorialElement => tutorialElement.path?.toLowerCase().includes(category + '/+page.md'));
		prev = index === 0 ? initialPost : tutorials[index - 1];
		next = index === tutorials.length - 1 ? initialPost : tutorials[index + 1];
	}

	let menuList = tutorials.map(({ path, metadata: { title } }) => ({ path, title }));

	return {
		codeValue,
		category,
		prev,
		next,
		menuList
	};
}
