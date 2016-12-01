'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');

module.exports = [
	// Movies
    {
        method: 'GET',
        path: '/api/movies/{id}',
        handler: handlers.movies.get,
		config: {
            tags: ['api'],
            description: 'Get one movie by id',
            notes: 'Get one movie by id',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
            cors: {
                origin: ['*']
            }
        }
    },
    {
        method: 'GET',
        path: '/api/movies',
        handler: handlers.movies.getAll,
		config: {
            tags: ['api'],
            description: 'Get all movies',
            notes: 'Get all movies',
            cors: {
                origin: ['*']
            }
        }
    },
    {
        method: 'POST',
        path: '/api/movies',
        handler: handlers.movies.create,
		config: {
            tags: ['api'],
            description: 'Add a new movie ',
            notes: 'Add a new movie',
            validate: {
                payload: {
                    title: Joi.string().required(),
                    year: Joi.number().required(),
                    genre: Joi.string(),
                    rating: Joi.number(),
                    synopsis: Joi.string(),
                    description: Joi.string(),
                    DirectorId: Joi.number().required(),
					File: Joi.object().keys({
					    name: Joi.string().required(),
					    type: Joi.string().required(),
						size: Joi.number().required()
					})
                }
            },
			auth: {
				strategy: 'jsonWebToken',
				scope: ['movieAdmin', 'siteAdmin']
			},
            cors: {
                origin: ['*']
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/movies/{id}',
        handler: handlers.movies.update,
		config: {
            tags: ['api'],
            description: 'Update a movie by id',
            notes: 'Update a movie by id',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    title: Joi.string().required(),
                    year: Joi.number().required(),
                    genre: Joi.string(),
                    rating: Joi.number(),
                    synopsis: Joi.string(),
                    description: Joi.string(),
                    DirectorId: Joi.number().required(),
					File: Joi.object().keys({
					    name: Joi.string().required(),
					    type: Joi.string().required(),
						size: Joi.number().required()
					})
                }
            },
			auth: {
				strategy: 'jsonWebToken',
				scope: ['movieAdmin', 'siteAdmin']
			},
            cors: {
                origin: ['*']
            }
        }
    },
    {
        method: 'DELETE',
        path: '/api/movies/{id}',
        handler: handlers.movies.delete,
		config: {
            tags: ['api'],
            description: 'Delete a movie by id',
            notes: 'Delete a movie by id',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
			auth: {
				strategy: 'jsonWebToken',
				scope: ['movieAdmin', 'siteAdmin']
			},
            cors: {
                origin: ['*']
            }
        }
    }
];
