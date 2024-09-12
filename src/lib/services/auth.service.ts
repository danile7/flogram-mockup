import { env } from '$env/dynamic/public';
import fetchAPI from './fetchAPI';

/**
 *
 * export const signIn = async ({ usernameOrEmail, password }: SIGNIN_PARAM) => await fetchAPI.post(`${env.PUBLIC_FLOGRAM_API_URL}/auth/signin`, { usernameOrEmail, password });
 * */

export const signUp = async ({
	email,
	username,
	password
}: {
	email: string;
	username: string;
	password: string;
}) =>
	await fetchAPI.post(`${env.PUBLIC_FLOGRAM_API_URL}/auth/signup`, { email, username, password });

export const getUsers = async () => await fetchAPI.get(`${env.PUBLIC_FLOGRAM_API_URL}/users`);

export const getUserByEmailAndPassword = async ({
	email,
	password
}: {
	email: string;
	password: string;
}) => {
	const result = await fetchAPI.post(`${env.PUBLIC_FLOGRAM_API_URL}/auth/signin`, {
		usernameOrEmail: email,
		password
	});

	if (result) {
		return Promise.resolve(result);
	} else {
		return Promise.resolve(null);
	}
};

export const getUserByName = async ({ name }: { name: string }) => {
	const profile = await fetchAPI.get(`${env.PUBLIC_FLOGRAM_API_URL}/users/findbyUsername/${name}`);

	if (!profile) return Promise.resolve(null);

	return Promise.resolve(profile);
};

export const getUserByToken = async ({ token }: { token: string }) => {
	const user = await fetchAPI.post(`${env.PUBLIC_FLOGRAM_API_URL}/auth/verify`, { token });

	if (!user) return Promise.resolve(null);

	return Promise.resolve(user);
};

export const checkUsernameDuplication = async ({ username }: { username: string }, header) =>
	await fetchAPI.post(
		`${env.PUBLIC_FLOGRAM_API_URL}/users/check-username-duplicate`,
		{ username },
		header
	);

interface UPDATE_PROFILE_PARAM {
	email: string;
	username: string;
	password: string;
}

export const updateProfile = async ({ email, username, password }: UPDATE_PROFILE_PARAM, header) =>
	await fetchAPI.put(
		`${env.PUBLIC_FLOGRAM_API_URL}/users/profile/update`,
		{
			email,
			username,
			password
		},
		header
	);
