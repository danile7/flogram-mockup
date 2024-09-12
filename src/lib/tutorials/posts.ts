import type { Post, Metadata } from '../types/docs';

export default async function posts(): Promise<Post[]> {

	const allPosts = import.meta.glob('/src/routes/tutorials/*/*.{md,svx}');

	const body: Promise<Post>[] = [];

	for (const path in allPosts) {
		body.push(
			allPosts[path]().then(({ metadata }: Metadata) => {
				return { path, metadata } as Post;
			})
		);
	}

	let posts: Post[] = await Promise.all(body);
	posts = posts.filter((post) => post.metadata.published);

	posts.sort((a, b) => {
		return (a.metadata.order || 0) - (b.metadata.order || 0);
	});

	return posts;
}
