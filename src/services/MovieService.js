'use strict';

import axios from 'axios';

export default {
	getMovie: (id) => {
		return axios.get('movies/' + id).then((response) => {
			return response.data;
		})
	},
	getMovies: () => {
		return axios.get('movies').then((response) => {
			return response.data;
		})
	},
	createMovie: (data) => {
		return axios.post('movies', data).then((response) => {
			return response.data;
		})
	},
	updateMovie: (id, data) => {
		data = cleanData(data);
		data.File = cleanData(data.File);
		return axios.put('movies/' + id, data).then((response) => {
			return response.data;
		})
	},
	removeMovie: (id) => {
		return axios.delete('movies/' + id).then((response) => {
			return response.data;
		})
	},
}

function cleanData(data) {
	delete data.id;
	delete data.Director
	delete data.MovieId
	delete data.createdAt
	delete data.updatedAt

	return data;
}
