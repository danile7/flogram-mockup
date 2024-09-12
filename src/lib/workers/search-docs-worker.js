import { init, inited, search } from './search';

addEventListener('message', async (event) => {
	const { type, payload } = event.data;

	if (type === 'init') {
		const where = payload;
		if (!where || typeof where !== 'string' || (where !== 'Flogram' )) {
			return;
		}
		// no reason to re-init if it's already inited
		if (!inited[where]) {


			const res = await fetch('/api/flogram-docs-content', {
					method: 'GET'
				})
			;

			const { blocks } = await res.json();
			init(blocks, where);

		}

		postMessage({ type: 'ready' });
	}

	if (type === 'query') {
		const { query, where } = payload;
		const results = search(query, where);


		postMessage({ type: 'results', payload: { results, query } });
	}
});
