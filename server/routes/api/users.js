'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');
const userFunctions = require('../../utils/userFunctions');

module.exports = [
	// Users
	{
		method: 'POST',
		path: '/api/users',
		config: {
			pre: [
				{
					method: userFunctions.verifyUniqueUser
				}
			],
			handler: handlers.users.create,
			tags: ['api'],
            description: 'Register a new user',
            notes: 'Register a new user',
			validate: {
				payload: {
					username: Joi.string().alphanum().min(2).max(300).required(),
					email: Joi.string().email().required(),
					password: Joi.string().required()
				}
			},
			cors: {
                origin: ['*']
            }
		}
	},
	{
		method: 'POST',
		path: '/api/users/authenticate',
		config: {
			pre: [
				{
					method: userFunctions.verifyCredentials, assign: 'user'
				}
			],
			handler: handlers.users.authenticate,
			tags: ['api'],
            description: 'Authenticate an existing user',
            notes: 'Authenticate an existing user',
			validate: {
				payload: Joi.alternatives().try(
				  Joi.object({
				    username: Joi.string().alphanum().min(2).max(30).required(),
				    password: Joi.string().required()
				  }),
				  Joi.object({
				    username: Joi.string().email().required(),
				    password: Joi.string().required()
				  })
				)
			},
			cors: {
                origin: ['*']
            }
		}
	},
	{
		method: 'GET',
		path: '/api/users',
		handler: handlers.users.getAll,
		config: {
			tags: ['api'],
            description: 'Get all users',
            notes: 'Get all users',
			auth: {
		      strategy: 'jsonWebToken',
		      scope: ['admin']
		    }
		}
	}
];
