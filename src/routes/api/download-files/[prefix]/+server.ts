import type { RequestHandler } from '@sveltejs/kit';
import { listFilesInS3, getFileFromS3 } from '$lib/util/s3Client';
import {json} from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params , url}) => {

	let prefix = params.prefix;
	let user = url.searchParams.get('user')
	let project = url.searchParams.get('project')

	prefix =`${prefix}/${user}/${project}/v.latest`;

	try {
		// List the files in the specified prefix
		const files = await listFilesInS3({ prefix, onlyFiles : false, showPrivate : true });

		// Download the content for each file
		const fileContents = await Promise.all(files.map(async (file) => {
			const contentStream = await getFileFromS3({ key: file.Key as string });
			const content = await streamToString(contentStream);

			return {
				key: file.Key,
				content,
			};
		}));

		return json({
			status: 200,
			body: { files: fileContents },
		});
	} catch (error) {
		return json({
			status: 500,
			body: { error: 'Failed to download files' },
		});
	}
};

// Utility function to convert a stream to a string
async function streamToString(stream: any): Promise<string> {
	if (!stream) return '';

	if (stream instanceof ReadableStream) {
		const reader = stream.getReader();
		const decoder = new TextDecoder();
		let result = '';
		let done = false;

		while (!done) {
			const { value, done: streamDone } = await reader.read();
			done = streamDone;
			if (value) {
				result += decoder.decode(value, { stream: true });
			}
		}
		result += decoder.decode(); // finalize the string
		return result;
	}

	// Node.js ReadableStream case
	if (typeof stream === 'object' && typeof stream.read === 'function') {
		return new Promise((resolve, reject) => {
			const chunks: Uint8Array[] = [];
			stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
			stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
			stream.on('error', reject);
		});
	}

	// Handle Blob (if used in a browser context)
	if (stream instanceof Blob) {
		return stream.text();
	}

	// If we get a buffer directly
	if (Buffer.isBuffer(stream)) {
		return stream.toString('utf-8');
	}

	// If we get Uint8Array directly
	if (stream instanceof Uint8Array) {
		return Buffer.from(stream).toString('utf-8');
	}

	// Fallback to an empty string
	return '';
}
