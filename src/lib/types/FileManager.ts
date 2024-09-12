export function isMimeTypeImage(mt: string) {
	return mt.startsWith('image/');
}

export function isMimeTypeVideo(mt: string) {
	return mt.startsWith('video/');
}

export function isMimeTypeAudio(mt: string) {
	return mt.startsWith('audio/');
}

export function isMimeTypeText(mt: string) {
	return mt.startsWith('text/');
}

export function isMimeTypePDF(mt: string) {
	return mt == 'application/pdf';
}

export function isMimeTypeSupported(mt: string) {
	return (
		isMimeTypeImage(mt) ||
		isMimeTypeVideo(mt) ||
		isMimeTypeAudio(mt) ||
		isMimeTypePDF(mt) ||
		isMimeTypeText(mt)
	);
}

export function getIcon(mimeType: string, isLink: boolean): string[] {
	const icon: string =
		mimeType == '#directory' ? 'file-manager'
			: isMimeTypeImage(mimeType) ? 'image-x-generic'
				: isMimeTypeVideo(mimeType) ? 'video-x-generic'
					: isMimeTypeAudio(mimeType) ? 'audio-x-generic'
						: isMimeTypeText(mimeType) ? 'text-x-generic'
							: isMimeTypePDF(mimeType) ? 'application-pdf'
								: 'application-octet-stream'; // this is also for links
	return mimeType == '#unresolved' ? [icon, 'invalidLink', '🔗 ']
		: isLink ? [icon, 'link', '🔗 ']
			: [icon, '', ''];
}

function sortDirs(f1: File, f2: File): number {
	const f1Dir = f1.mimeType === '#directory';
	const f2Dir = f2.mimeType === '#directory';
	return f1Dir == f2Dir ? 0 : f2Dir ? 1 : -1;
}

export class ConfigSharing {
	readonly allowRW: boolean;
	readonly profiles: string[];

	constructor(allowRW: boolean, profiles: string[]) {
		this.allowRW = allowRW;
		this.profiles = profiles;
	}
}

export class Config {
	readonly version: string;
	readonly title: string;
	readonly readOnly: boolean;
	readonly maxReqSize: number;
	readonly hasPassword: boolean;
	readonly sharing: ConfigSharing | null;

	constructor(
		version: string,
		title: string,
		readOnly: boolean,
		maxReqSize: number,
		hasPassword: boolean,
		sharing: ConfigSharing | null
	) {
		this.version = version;
		this.title = title;
		this.readOnly = readOnly;
		this.maxReqSize = maxReqSize;
		this.hasPassword = hasPassword;
		this.sharing = sharing;
	}

	static empty(): Config {
		return new Config('', '', false, -1, false, null);
	}

	static fromAny(obj: any): Config {
		const sharing: ConfigSharing | null =
			obj.sharing == null
				? null
				: new ConfigSharing(obj.sharing.allowRW, obj.sharing.profiles);
		return new Config(obj.version, obj.title, obj.readOnly, obj.maxReqSize, obj.hasPassword, sharing);
	}
}

export class File {
	readonly uuid: string;
	readonly mimeType: string;
	readonly isDir: boolean;
	readonly isRoot: boolean;
	readonly isLink: boolean;
	readonly icon: string[];
	readonly name: string;
	readonly path: string;
	readonly size: string;
	readonly numSize: number;
	readonly chDate: string;
	readonly numChDate: number;
	readonly owner: string;
	readonly group: string;
	readonly permissions: string;
	readonly id: string;

	constructor(
		isLink: boolean,
		mimeType: string,
		name: string,
		size: number,
		chDate: number,
		owner: string,
		group: string,
		permissions: string,
		path: string[],
		id: string
	) {
		this.uuid = Math.random().toString().substring(2);
		this.mimeType = mimeType;
		this.isDir = mimeType == '#directory';
		this.name = name + (this.isDir ? '/' : '');
		this.isRoot = this.isDir && this.name == '..';
		this.isLink = isLink;
		this.icon = getIcon(this.mimeType, this.isLink);
		this.size = formatBytes(size);
		this.numSize = size;
		this.chDate = new Date(chDate * 1000).toLocaleString();
		this.numChDate = chDate;
		this.owner = owner;
		this.group = group;
		this.permissions = permissions;
		this.path = path.join('') + this.name;
		this.id = id;

		// Adapted from
		// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
		function formatBytes(bytes: number, decimals: number = 2): string {
			if (bytes < 0) return '';
			if (bytes === 0) return '0 b';

			const k = 1024;
			const dm = decimals < 0 ? 0 : decimals;
			const sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

			const i = Math.floor(Math.log(bytes) / Math.log(k));

			return (
				parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
			);
		}
	}

	getWS(forDl: boolean = false): string {
		return 'testFs/' + this.path;
	}
}

export const SORTERS: { [key: string]: (f1: File, f2: File) => number } = {
	ABC: function(f1: File, f2: File): number {
		const fromDir = sortDirs(f1, f2);
		return fromDir == 0 ? f1.name.localeCompare(f2.name) : fromDir;
	},
	CBA: function(f1: File, f2: File): number {
		const fromDir = sortDirs(f1, f2);
		return fromDir == 0 ? f2.name.localeCompare(f1.name) : fromDir;
	},
	OldFirst: function(f1: File, f2: File): number {
		const fromDir = sortDirs(f1, f2);
		return fromDir == 0 ? Math.sign(f1.numChDate - f2.numChDate) : fromDir;
	},
	OldLast: function(f1: File, f2: File): number {
		const fromDir = sortDirs(f1, f2);
		return fromDir == 0 ? Math.sign(f2.numChDate - f1.numChDate) : fromDir;
	},
	SmallFirst: function(f1: File, f2: File): number {
		const fromDir = sortDirs(f1, f2);
		return fromDir == 0 ? Math.sign(f1.numSize - f2.numSize) : fromDir;
	},
	SmallLast: function(f1: File, f2: File): number {
		const fromDir = sortDirs(f1, f2);
		return fromDir == 0 ? Math.sign(f2.numSize - f1.numSize) : fromDir;
	}
};

export class Mule {
	readonly items: File[] = [];
	readonly files: File[] = []; // without dirs
	constructor(items: any[], path: string[]) {
		for (let i = 0; i < items.length; i++) {
			const nf = new File(
				items[i].isLink,
				items[i].mimeType,
				items[i].name,
				items[i].size,
				items[i].chDate,
				items[i].owner,
				items[i].group,
				items[i].permissions,
				path,
				items[i].id
			);
			this.items.push(nf);
			if (!nf.isDir) {
				this.files.push(nf);
			}
		}
		// if (path.length > 0) {
		// 	// Is not root
		// 	this.items.unshift(
		// 		new File(false, '#directory', '..', -1, 0, '--', '--', '--', path)
		// 	);
		// }
	}

	sort(sorter: (f1: File, f2: File) => number): Mule {
		this.items.sort(sorter);
		this.files.sort(sorter);
		return this;
	}

	static empty(): Mule {
		return new Mule([], []);
	}

	static fromAny(obj: any, path: string[]): Mule {
		return new Mule(obj.items, path);
	}
}
