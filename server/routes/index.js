'use strict';

let api = require('./api');
let Joi = require('joi');
let models = require('../models');
const userFunctions = require('../utils/userFunctions');

module.exports = [

    // Base Route
    {
        method: 'GET',
        path: '/api',
        handler: function(req, res) {
            res({
                'api': 'Hello world!'
            });
        }
    },

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
			handler: api.users.create,
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
			handler: api.users.authenticate,
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
			}
		}
	},
	{
		method: 'GET',
		path: '/api/users',
		handler: api.users.getAll,
		config: {
			tags: ['api'],
            description: 'Get all users',
            notes: 'Get all users',
			auth: {
		      strategy: 'jsonWebToken',
		      scope: ['admin']
		    }
		}
	},

	// File Upload
    {
		method: 'POST',
        path: '/api/files/{path}',
        handler: api.files.create,
        config: {
            payload: {
                output: 'stream',
                maxBytes: 209715200,
                parse: true,
                allow: 'multipart/form-data'
            },
            tags: ['api'],
            description: 'Upload a new file',
            notes: 'Upload a new file',
			cors: {
                origin: ['*']
            }
        }
    },

    // Directors
    {
        method: 'GET',
        path: '/api/directors/{id}',
        handler: api.directors.get,
		config: {
			tags: ['api'],
			description: 'Get one director by id',
			notes: 'Get one director by id',
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
        path: '/api/directors',
        handler: api.directors.getAll,
		config: {
            tags: ['api'],
            description: 'Get all directors',
            notes: 'Get all directors',
            cors: {
                origin: ['*']
            }
        },
    },
    {
        method: 'POST',
        path: '/api/directors',
        handler: api.directors.create,
		config: {
            tags: ['api'],
            description: 'Add a new director',
            notes: 'Add a new director',
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    bio: Joi.string().required()
                }
            },
            cors: {
                origin: ['*']
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/directors/{id}',
        handler: api.directors.update,
		config: {
            tags: ['api'],
            description: 'Update a director by id',
            notes: 'Update a director by id',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    bio: Joi.string().required()
                }
            },
            cors: {
                origin: ['*']
            }
        },
    },
    {
        method: 'DELETE',
        path: '/api/directors/{id}',
        handler: api.directors.delete,
		config: {
            tags: ['api'],
            description: 'Delete a director by id',
            notes: 'Delete a director by id',
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


    // Movies
    {
        method: 'GET',
        path: '/api/movies/{id}',
        handler: api.movies.get,
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
        handler: api.movies.getAll,
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
        handler: api.movies.create,
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
                    coverImg: Joi.string(),
                    synopsis: Joi.string(),
                    description: Joi.string(),
                    DirectorId: Joi.number().required()
                }
            },
            cors: {
                origin: ['*']
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/movies/{id}',
        handler: api.movies.update,
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
					coverImg: Joi.string(),
                    synopsis: Joi.string(),
                    description: Joi.string(),
                    DirectorId: Joi.number().required()
                }
            },
            cors: {
                origin: ['*']
            }
        }
    },
    {
        method: 'DELETE',
        path: '/api/movies/{id}',
        handler: api.movies.delete,
		config: {
            tags: ['api'],
            description: 'Delete a movie by id',
            notes: 'Delete a movie by id',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
            cors: {
                origin: ['*']
            }
        }
    }
];
