export interface ConfigSharingType {
	allowRW: boolean;
	profiles: string[];
}

export interface ConfigType {
	version: string;
	title: string;
	readOnly: boolean;
	maxReqSize: number;
	hasPassword: boolean;
	sharing: ConfigSharingType;
}

export interface FileType {
	uuid: string;
	mimeType: string;
	isDir: boolean;
	isRoot: boolean;
	isLink: boolean;
	icon: string[];
	name: string;
	path: string;
	size: string;
	numSize: number;
	chDate: string;
	numChDate: number;
	owner: string;
	group: string;
	permissions: string;
	id: string;
}

export interface MuleType {
	items: FileType[];
	files: FileType[];
}
