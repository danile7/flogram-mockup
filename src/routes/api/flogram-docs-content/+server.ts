import { json } from '@sveltejs/kit';
import content from './content.json';

export async function GET(): Promise<Response> {

	try {
		return json(content);
	} catch (error: any) {
		return json({ error: error.message }, { status: 500 });
	}
}