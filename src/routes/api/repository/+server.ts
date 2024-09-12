import { json } from '@sveltejs/kit';
// import _ from 'lodash';
import libraries from './data';

export async function POST({ request }): Promise<Response> {
	try {

		let { name } = await request.json();

		// let directory = _.find(libraries, { name });

		let directory = libraries[0];

		return json({
			directoryStructure: directory.directoryStructure
		});
	} catch (error: any) {
		return json({ error: error.message }, { status: 500 });
	}
}
