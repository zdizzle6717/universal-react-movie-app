'use strict';

import BaseUrl from '../baseUrl';
import axios from 'axios';

export default {
	getMovie: (id) => {
		return axios.get(BaseUrl + 'movies/' + id).then((response) => {
			return response.data;
		})
	},
	getMovies: () => {
		return axios.get(BaseUrl + 'movies').then((response) => {
			return response.data;
		})
	},
	createMovie: (data) => {
		return axios.post(BaseUrl + 'movies', data).then((response) => {
			return response.data;
		})
	},
	updateMovie: (id, data) => {
		data = cleanData(data);
		data.File = cleanData(data.File);
		return axios.put(BaseUrl + 'movies/' + id, data).then((response) => {
			return response.data;
		})
	},
	removeMovie: (id) => {
		return axios.delete(BaseUrl + 'movies/' + id).then((response) => {
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
