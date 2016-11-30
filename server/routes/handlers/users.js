'use strict';

const models = require('../../models');
const fs = require('fs-extra');
const env = require('../../config/envVariables.js');
const Boom = require('boom');
const createUserToken = require('../../utils/createUserToken');
const userFunctions = require('../../utils/userFunctions');

let users = {
	create: function(req, res) {
		userFunctions.hashPassword(req.payload.password, (err, hash) => {
			let siteAdmin = req.payload.role === 'siteAdmin' ? true : false;
			let movieAdmin = req.payload.role === 'movieAdmin' ? true : false;
			let directorAdmin = req.payload.role === 'directorAdmin' ? true : false;
			models.User.create({
	                email: req.payload.email,
	                username: req.payload.username,
					password: hash,
					siteAdmin: siteAdmin,
					movieAdmin: movieAdmin,
					contactAdmin: contactAdmin
	            })
				.then(function(user) {
					res({
						id: user.id,
						email: user.email,
						username: user.username,
						roleFlags: userFunctions.getUserRoleFlags(user),
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
			id: req.pre.user.id,
			email: req.pre.user.email,
			username: req.pre.user.username,
			roleFlags: userFunctions.getUserRoleFlags(req.pre.user),
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
