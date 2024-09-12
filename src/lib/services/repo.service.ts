import { env } from '$env/dynamic/public';
import fetchAPI from './fetchAPI';

export const updateProfileMD = async ({ profile }: { profile: string }, header) =>
	await fetchAPI.put(`${env.PUBLIC_FLOGRAM_API_URL}/users/profilemd/update`, { profile }, header);


export const getLibraries = async () =>
	await fetchAPI.get(`${env.PUBLIC_FLOGRAM_API_URL}/libraries/`);


export const searchLibraries = async ({ libraryName }: { libraryName: string }) =>
	await fetchAPI.get(`${env.PUBLIC_FLOGRAM_API_URL}/libraries/search/${libraryName}`);

export const getLibraryInfoByName = async ({ libraryName }: { libraryName: string }) =>
	await fetchAPI.get(`${env.PUBLIC_FLOGRAM_API_URL}/libraries/${libraryName}`);


export const getLibraryList = async ({
																			 libraryName,
																			 libraryPath,
																			 params,
																			 authHeader
																		 }: { libraryName: string, libraryPath: string, params: any, authHeader: any }) =>
	await fetchAPI.get(`${env.PUBLIC_FLOGRAM_API_URL}/libraries/list/${libraryName}/${libraryPath}?${params}`, authHeader);

export const fetchLibraryComments = async ({ libraryName, authHeader }: { libraryName: string, authHeader: any }) =>
	await fetchAPI.get(`${env.PUBLIC_FLOGRAM_API_URL}/commits/lastcommit/${libraryName}`, authHeader);

interface Library {
	name: string,
	description: string,
	isPublic: boolean,
	ownerId: string,
	addReadme: boolean
}

export const createLibrary = async ({ library, authHeader }: { library: Library, authHeader }) =>
	await fetchAPI.post(`${env.PUBLIC_FLOGRAM_API_URL}/libraries/`, library, { ...authHeader });


// new services
//
// export const getDirectoryStructureById = async ({ directoryID }: { directoryID: string }) =>
// 	await fetchAPI.get(`/api/repository/${directoryID}`);
//
// export const getDirectoryStructureByPath = async ({ path }: { path: string[] }) =>
// 	await fetchAPI.post(`/api/repository`, { path });
//


export interface Repository {
	directoryStructure: any[];
}

export const getLibraryByName = async ({ name }: { name: string }): Promise<Repository | null> =>
	await fetchAPI.post(`/api/repository`, { name });


export const updateLibraryName = async ({ oldName, newName, authHeader }: { oldName: string, newName : string, authHeader }) =>
	await fetchAPI.post(`${env.PUBLIC_FLOGRAM_API_URL}/libraries/update-config`, { oldName, newName }, { ...authHeader });
