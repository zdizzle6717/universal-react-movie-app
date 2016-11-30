'use strict';

const models = require('../../models');
const fs = require('fs-extra');
const env = require('../../config/envVariables.js');
const Boom = require('boom');

let users = {
	create: function(req, res) {
		userFunctions.hashPassword(req.payload.password, (err, hash) => {
			models.User.create({
	                email: req.payload.email,
	                username: req.payload.username,
					password: hash
	            })
				.then(function(user) {
					res({
						id_token: createToken(user)
					}).code(201);
				})
				.catch(function(response) {
					throw Boom.badRequest(response);
				})
		});
	},
	authenticate: function(req, res) {
		res({
			id_token: createToken(req.pre.user)
		}).code(201);
	},
	getAll: function(req, res) {
		models.User.findAll({
			attributes: ['username', 'email', 'createdAt'],
			limit: 50,
			order: '"updatedAt" DESC'
		})
		.then(function(users) {
			res(users).code(200);
		});
	}
};

module.exports = users;
