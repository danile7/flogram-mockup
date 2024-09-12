import { env } from '$env/dynamic/public';
import fetchAPI from '$lib/services/fetchAPI';
import type { AIGenerateInpputType } from '$lib/types';

export const runBots = async ({oldEnglish, newEnglish, oldCode}:{oldEnglish:string, newEnglish : string, oldCode: string}) =>
	await fetchAPI.post(`${env.PUBLIC_FLOGRAM_AI_TO_CODE_API_URL}/englishIntoCode`, { oldEnglish, newEnglish, oldCode });

export const runBotsFromCodeToText = async (userInput: string) =>
	await fetchAPI.post(`${env.PUBLIC_FLOGRAM_AI_API_URL}/runBotsToText`, { userInput });

// export const runCodeGenerateBot = async (input:AIGenerateInpputType) =>
// 	await fetchAPI.post(`${env.PUBLIC_FLOGRAM_AI_CODE_GENERATE_BOT_URL}/englishIntoCode`,  input);


export const runCodeGenerateBot = async (input:AIGenerateInpputType) =>
	await fetchAPI.post(`${env.PUBLIC_FLOGRAM_AI_CODE_GENERATE_BOT_URL}/freeModel`,  input);

export const runTextGenerateBot = async (input:AIGenerateInpputType) =>
	await fetchAPI.post(`${env.PUBLIC_FLOGRAM_AI_CODE_GENERATE_BOT_URL}/codeIntoEnglish`,  input);