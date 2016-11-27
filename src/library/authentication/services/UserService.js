'use strict';
let axios = require('axios');

export default {
	create: (credentials) => {
		return axios.post('http://localhost:8080/api/users', credentials)
			.then(function(response) {
				return response.data;
			});
	},
	authenticate: (credentials) => {
		return axios.post('http://localhost:8080/api/users/authenticate', credentials)
			.then(function(response) {
				return response.data;
			});
	},
};
