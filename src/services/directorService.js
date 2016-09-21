'use strict';
let axios = require('axios');

let directorService = {
	get: get,
	getAll: getAll
};

function get(id) {
	return axios.get('http://www.demo.zackanselm.com:3001/api/directors/' + id)
		.then(function(response) {
			return response.data;
		});
}

function getAll() {
	return axios.get('http://www.demo.zackanselm.com:3001/api/directors')
		.then(function(response) {
			return response.data;
		});
}

module.exports = directorService;
