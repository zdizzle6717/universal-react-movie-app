'use strict';
let axios = require('axios');

let movieService = {
	get: get,
	getAll: getAll
};

function get(id) {
	return axios.get('http://www.demo.zackanselm.com:3001/api/movies/' + id)
		.then(function(response) {
			return response.data;
		});
}

function getAll() {
	return axios.get('http://www.demo.zackanselm.com:3001/api/movies')
		.then(function(response) {
			return response.data;
		});
}

module.exports = movieService;
