import type { GetObjectCommandOutput, ListObjectsCommandOutput, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import * as awsSDK from '@aws-sdk/client-s3';
import type { DirectoryNode, FileSystemTree } from '@webcontainer/api';
import fetchAPI from '../services/fetchAPI';

const {
	S3Client,
	PutObjectCommand,
	ListObjectsCommand,
	GetObjectCommand,
	GetObjectAclCommand,
	DeleteObjectCommand
} = awsSDK;


const s3Client = new S3Client({
	endpoint: import.meta.env.VITE_DO_S3_ENDPOINT,
	region: 'us-east-1',
	credentials: {
		accessKeyId: import.meta.env.VITE_DO_S3_ACCESS_KEY as string,
		secretAccessKey: import.meta.env.VITE_DO_S3_SECRET_ACCESS_KEY as string
	}
});

interface UploadToS3Params {
	key: string;
	body: string | Uint8Array | Buffer | Blob;
	metadata?: Record<string, string>;
}

export async function uploadToS3({ key, body, metadata = {} }: UploadToS3Params): Promise<PutObjectCommandOutput> {
	const params = {
		Bucket: import.meta.env.VITE_DO_S3_BUCKET as string,
		Key: key,
		Body: body,
		ACL: 'private',
		Metadata: metadata
	};
	try {
		const data = await s3Client.send(new PutObjectCommand(params));
		console.log(`Successfully uploaded object: ${params.Bucket}/${params.Key}`);
		return data;
	} catch (error) {
		console.error('Error uploading to S3:', error);
		throw error;
	}
}

interface ListFilesInS3Params {
	prefix: string;
	onlyFiles?: boolean;
	showPrivate?: boolean;
}

export async function listFilesInS3({
																			prefix,
																			onlyFiles = true,
																			showPrivate = false
																		}: ListFilesInS3Params): Promise<ListObjectsCommandOutput['Contents']> {
	const params = {
		Bucket: import.meta.env.VITE_DO_S3_BUCKET as string,
		Prefix: prefix
	};

	try {
		const data = await s3Client.send(new ListObjectsCommand(params));
		const contents = data.Contents || [];
		let returnValue = [];

		if (onlyFiles) {
			// Return all items (both directories and files)
			returnValue = [...contents];
		} else {
			// Filter out directories (assuming directory items end with '/')
			returnValue = contents.filter(item => !item.Key?.endsWith('/'));
		}

		returnValue = await filterByAccessType(returnValue, showPrivate);

		return returnValue;
	} catch (error) {
		console.error('Error listing S3 files:', error);
		throw error;
	}
}

async function filterByAccessType(files: ListObjectsCommandOutput['Contents'], showPrivate: boolean): Promise<ListObjectsCommandOutput['Contents']> {
	const filteredFiles: ListObjectsCommandOutput['Contents'] = [];

	for (const file of files) {
		if (file.Key) {
			const acl = await s3Client.send(new GetObjectAclCommand({
				Bucket: import.meta.env.VITE_DO_S3_BUCKET as string,
				Key: file.Key
			}));

			const isPublic = acl.Grants?.some(grant => grant.Grantee?.URI === 'http://acs.amazonaws.com/groups/global/AllUsers' && grant.Permission === 'READ');

			if (isPublic || showPrivate) {
				// Include public files by default, and private files if showPrivate is true
				filteredFiles.push(file);
			}
		}
	}

	return filteredFiles;
}

interface GetFileFromS3Params {
	key: string;
}

export async function getFileFromS3({ key }: GetFileFromS3Params): Promise<GetObjectCommandOutput['Body'] | undefined> {
	const params = {
		Bucket: import.meta.env.VITE_DO_S3_BUCKET as string,
		Key: key
	};
	try {
		const data = await s3Client.send(new GetObjectCommand(params));
		return data.Body;
	} catch (error) {
		console.error('Error getting S3 file:', error);
		throw error;
	}
}

export const downloadService = ({
																	user,
																	project
																}) => fetchAPI.get(`/api/download-files/flogram-repositories?user=${encodeURIComponent(user)}&project=${project}`);

export const handleDownloadProjectData = ({ files, user, project }) => {

	const project_files: FileSystemTree = {};

	files.forEach(({ key, content }) => {
		key = key.replace(`flogram-repositories/${user}/${project}/v.latest/`, './');
		const path = key.split('/').slice(1);
		let subtree = project_files;

		for (let i = 0; i < path.length; i++) {
			const part = path[i];
			const is_directory = i !== path.length - 1;

			if (is_directory) {
				if (!subtree[part]) {
					subtree[part] = {
						directory: {}
					};
				}
				subtree = (subtree[part] as DirectoryNode).directory;
			} else {
				subtree[part] = {
					file: {
						contents: content
					}
				};
			}
		}
	});

	const templates = Object.keys(project_files);

	const default_project_files: FileSystemTree = project_files as FileSystemTree;

	return {
		templates,
		project_files: {
			directory: { ...default_project_files }
		}
	};
};

export const listProjects = async (user: string) => {

	const prefix = `flogram-repositories/${user}/`;

	const params = {
		Bucket: import.meta.env.VITE_DO_S3_BUCKET as string,
		Prefix: prefix,
		Delimiter: '/'
	};

	try {
		const data = await s3Client.send(new ListObjectsCommand(params));

		const folders = data.CommonPrefixes?.map((item) => {
			return item.Prefix?.replace(prefix, '').replace('/', '');
		}).filter(Boolean);

		return folders || [];
	} catch (error) {
		console.error('Error listing S3 files:', error);
		throw error;
	}
};

export async function downloadProject() {

	const user = 'jason';
	const project = 'loading-project-sample';
	const response = await downloadService({ user, project });

	if (response.status !== 200) {
		throw new Error('Failed to download project files');
	}

	const { body: { files } } = response;

	const project_files: FileSystemTree = {};
	files.forEach(({ key, content }) => {
		const path = key.split('/').slice(1);
		let subtree = project_files;

		for (let i = 0; i < path.length; i++) {
			const part = path[i];
			const is_directory = i !== path.length - 1;

			if (is_directory) {
				if (!subtree[part]) {
					subtree[part] = {
						directory: {}
					};
				}
				subtree = (subtree[part] as DirectoryNode).directory;
			} else {
				subtree[part] = {
					file: {
						contents: content
					}
				};
			}
		}
	});


	const templates = Object.keys(project_files);

	const default_project_files: FileSystemTree = project_files as FileSystemTree;

	return {
		templates,
		project_files: default_project_files
	};
}

export async function deleteFileOrFolder(path: string, deletePrefix: string): Promise<void> {
	const fullPath = `${deletePrefix}/${path}`;

	try {
		// List all objects with the given prefix (which includes both files and folders)
		const listParams = {
			Bucket: import.meta.env.VITE_DO_S3_BUCKET as string,
			Prefix: fullPath
		};

		const listCommand = new ListObjectsCommand(listParams);
		const listResponse = await s3Client.send(listCommand);

		// Log the contents of the response for debugging
		console.log('Full List Response:', JSON.stringify(listResponse, null, 2));

		if (listResponse.Contents && listResponse.Contents.length > 0) {
			// Delete each file or folder item returned by the list command
			for (const item of listResponse.Contents) {
				console.log('Deleting item:', item.Key);
				const deleteParams = {
					Bucket: import.meta.env.VITE_DO_S3_BUCKET as string,
					Key: item.Key as string
				};
				await s3Client.send(new DeleteObjectCommand(deleteParams));
				console.log('Deleted:', item.Key);
			}
		} else {
			// If no contents were returned, it's likely a single file (or an empty folder)
			const deleteParams = {
				Bucket: import.meta.env.VITE_DO_S3_BUCKET as string,
				Key: fullPath
			};
			await s3Client.send(new DeleteObjectCommand(deleteParams));
			console.log('Deleted file:', fullPath);
		}
	} catch (error) {
		console.error('Error deleting file or folder:', error);
		throw new Error(`Failed to delete ${path}: ${error.message}`);
	}
}

export const uploadProjects = async (files: any, prefix = '', uploadPrefix) => {
	for (const [key, value] of Object.entries(files)) {

		const path = `${prefix}${key}`;
		if (value.file) {
			// Ensure that the file contents are properly handled as a Uint8Array
			const fileContents = new Uint8Array(value.file.contents.buffer);

			// Upload the file without setting unnecessary metadata
			console.log('uploading file...', uploadPrefix + '/' + path);
			await uploadToS3({
				key: uploadPrefix + '/' + path,
				body: fileContents // Contents is a Uint8Array
			});
		} else if (value.directory) {
			// Recursively upload directory contents
			console.log('this is dir...', path);
			await uploadProjects(value.directory, `${path}/`, uploadPrefix);

		}
	}
};