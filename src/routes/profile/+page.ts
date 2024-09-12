import { getUsers } from '$lib/services/auth.service';

export async function load() {

	try {
		const users = await getUsers();
		return { users };
	} catch (err) {
		return { users: null };
	}
}
