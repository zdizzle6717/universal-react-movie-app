'use strict';

import BaseUrl from '../baseUrl';
import axios from 'axios';

export default {
	getDirector: (id) => {
		return axios.get(BaseUrl + 'directors/' + id).then((response) => {
			return response.data;
		})
	},
	getDirectors: () => {
		return axios.get(BaseUrl + 'directors').then((response) => {
			return response.data;
		})
	},
	createDirector: (data) => {
		return axios.post(BaseUrl + 'directors', data).then((response) => {
			return response.data;
		})
	},
	updateDirector: (id, data) => {
		data = cleanData(data);
		return axios.put(BaseUrl + 'directors/' + id, data).then((response) => {
			return response.data;
		})
	},
	removeDirector: (id) => {
		return axios.delete(BaseUrl + 'directors/' + id).then((response) => {
			return response.data;
		})
	},
}

function cleanData(data) {
	delete data.id;
	delete data.Movies
	delete data.createdAt
	delete data.updatedAt

	return data;
}
