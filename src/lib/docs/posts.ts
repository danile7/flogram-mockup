import type { Post } from '../types/docs';

export default async function posts(): Promise<Post[]> {
	const allPosts = import.meta.glob('/src/routes/docs/*/*.{md,svx}');
	const body = [];

	for (const path in allPosts) {
		body.push(
			allPosts[path]().then(({ metadata }) => {
				return { path, metadata };
			})
		);
	}
	let posts: Post[] = await Promise.all(body);
	posts = posts.filter((post) => post.metadata.published);

	posts.sort(function (a, b) {
		return (a.metadata?.order | 0) - (b.metadata?.order | 0);
	});

	return posts;
}
