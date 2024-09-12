interface Headers {
	[key: string]: string;
}

let globalHeaders = {
	'Content-Type': 'application/json'
};

export const setGlobalFetchHeaders = (headers: Headers) => {
	globalHeaders = { ...globalHeaders, ...headers };
};

const fetchAPI = {
	get: async <T>(url: string, headers: Headers = {}, customFetch: typeof fetch = fetch): Promise<T> => {
		try {
			const response = await customFetch(url, {
				method: 'GET',
				headers: {
					...globalHeaders,
					...headers
				}
			});
			return await handleResponse<T>(response);
		} catch (error) {
			handleError(error);
			return Promise.reject(error);
		}
	},

	post: async <T>(url: string, body: any, headers: Headers = {}): Promise<T> => {
		try {
			console.log('POST : ', globalHeaders);
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					...globalHeaders,
					...headers
				},
				body: JSON.stringify(body)
			});
			return await handleResponse<T>(response);
		} catch (error) {
			handleError(error);
			return Promise.reject(error);
		}
	},

	put: async <T>(url: string, body: any, headers: Headers = {}): Promise<T> => {
		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					...globalHeaders,
					...headers
				},
				body: JSON.stringify(body)
			});
			return await handleResponse<T>(response);
		} catch (error) {
			handleError(error);
			return Promise.reject(error);
		}
	},

	delete: async <T>(url: string, headers: Headers = {}): Promise<T> => {
		try {
			const response = await fetch(url, {
				method: 'DELETE',
				headers: {
					...globalHeaders,
					...headers
				}
			});
			return await handleResponse<T>(response);
		} catch (error) {
			handleError(error);
			return Promise.reject(error);
		}
	}
};

const handleResponse = async <T>(response: Response): Promise<T> => {
	const contentType = response.headers.get('content-type');

	if (!response.ok) {
		const errorMessage = await parseResponseByContentType(response, contentType);
		throw new Error(errorMessage || 'Something went wrong');
	}

	return await parseResponseByContentType(response, contentType);
};

const parseResponseByContentType = async (response: Response, contentType: string | null): Promise<any> => {
	if (contentType) {
		if (contentType.includes('application/json')) {
			return await response.json();
		} else if (contentType.includes('text/html') || contentType.includes('text/plain')) {
			return await response.text();
		} else if (contentType.includes('application/octet-stream') || contentType.includes('image/')) {
			return await response.blob(); // For binary data such as images
		}
	}
	return response.text(); // Fallback to text if content type is unknown
};


const handleError = (error: any): void => {
	console.log('😒 API Call is failed. ', error);
	throw error;
};


export default fetchAPI;