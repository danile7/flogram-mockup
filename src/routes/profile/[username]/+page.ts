import { getUserByName } from '$lib/services/auth.service';

export async function load({ params }) {
	try {
		const name = params.username;

		const profile = await getUserByName({ name });

		if (profile) {
			return {
				user: { ...profile },
				found: true
			};
		} else {
			return {
				user: {},
				found: false
			};
		}
	} catch (e) {
		console.log(e);
		return {
			user: {},
			found: false
		};
	}
}
