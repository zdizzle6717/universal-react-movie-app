'use strict';

import axios from 'axios';

export default {
	getDirector: (id) => {
		return axios.get('directors/' + id).then((response) => {
			return response.data;
		})
	},
	getDirectors: () => {
		return axios.get('directors').then((response) => {
			return response.data;
		})
	},
	createDirector: (data) => {
		return axios.post('directors', data).then((response) => {
			return response.data;
		})
	},
	updateDirector: (id, data) => {
		data = cleanData(data);
		return axios.put('directors/' + id, data).then((response) => {
			return response.data;
		})
	},
	removeDirector: (id) => {
		return axios.delete('directors/' + id).then((response) => {
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
