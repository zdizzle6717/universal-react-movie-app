'use strict';
let axios = require('axios');

let directorStore = {
	getAll: getAll
};

function getAll() {
	return axios.get('http://www.demo.zackanselm.com:3001/api/directors')
		.then(function(response) {
			return response.data;
		});
}

module.exports = directorStore;
