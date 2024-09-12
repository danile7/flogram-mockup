export type LibraryType = {
	id: number;
	name: string;
	description: string;
	labels: LabelType[];
	comments: LibraryCommentType[];
	isPublic: boolean;
	isTopRanked: boolean;
	votes: number;
	downloads: number;
	ownerId: number;
};

export type LabelType = {
	name: string;
	bgColor: string;
	color: string;
	libraryId: number;
};

export type LibraryCommentType = {
	comment: string;
	libraryId: number;
	authorId: number;
};

export interface File {
	path: string;
	type: string;
	data: string;
}

export enum SaveOption {
	SAVE_N_PUSH,
	SAVE_LOCALLY
}
