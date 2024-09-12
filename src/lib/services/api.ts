import axios from 'axios';

export const axiosInstance = axios.create({
	headers: {
		'Content-Type': 'application/json'
	}
});

export const get = async (url, params = {}) => {
	try {
		const response = await axiosInstance.get(url, { ...params });
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const post = async (url, data = {}) => {
	try {
		const response = await axiosInstance.post(url, data);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const put = async (url, data = {}) => {
	try {
		const response = await axiosInstance.put(url, data);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const del = async (url) => {
	try {
		const response = await axiosInstance.delete(url);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

const handleError = (error) => {
	console.error('API call failed:', error);
	// You can add more error handling logic here
	throw error;
};
