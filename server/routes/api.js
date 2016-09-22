'use strict';

const models = require('../models');
const fs = require('fs-extra');
const env = require('../config/envVariables.js');
const Boom = require('boom');
const createToken = require('../utils/createToken');
const userFunctions = require('../utils/userFunctions');

// App users
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
}

// File Upload Route Configs
let files = {
    create: function(request, reply) {
        let data = request.payload;
        if (data.file) {
            let name = Date.now() + '-' + data.file.hapi.filename;
            let path = env.uploadPath + request.params.path + '/' + name;
            let file = fs.createWriteStream(path);

            file.on('error', function(err) {
                console.error(err);
            });

            data.file.pipe(file);

            data.file.on('end', function(err) {
                let response = {
                    filename: name,
                    headers: data.file.hapi.headers,
                    status: 200,
                    statusText: 'File uploaded successfully!'
                };
                reply(JSON.stringify(response));
            });
        }
        else {
            let response = {
                filename: data.file.hapi.filename,
                headers: data.file.hapi.headers,
                status: 400,
                statusText: 'There was an error uploading your file. Max sure the dimensions are 800px by 530px.'
            };
            reply(JSON.stringify(response));
        }
    }
};

// Director Route Configs
let directors = {
    get: function(req, res) {
        models.Director.find({
                where: {
                    id: req.params.id
                },
				include: [models.Movie]
            })
            .then(function(director) {
				if (director) {
					res(director).code(200);
				}
				else {
					res().code(404);
				}
            });
    },
    getAll: function(req, res) {
        models.Director.findAll({
			limit: 50,
			order: '"updatedAt" DESC'
		})
            .then(function(directors) {
                res(directors).code(200);
            });
    },
    create: function(req, res) {
        models.Director.create({
                firstName: req.payload.firstName,
                lastName: req.payload.lastName,
                bio: req.payload.bio
            })
            .then(function(director) {
                res(director).code(200);
            });
    },
    update: function(req, res) {
        models.Director.find({
                where: {
                    id: req.params.id
                }
            })
            .then(function(director) {
                if (director) {
                    director.updateAttributes({
                        firstName: req.payload.firstName,
                        lastName: req.payload.lastName,
                        bio: req.payload.bio
                    }).then(function(director) {
                        res(director).code(200);
                    });
                }
                else {
                    res().code(404);
                }
            });
    },
    delete: function(req, res) {
        models.Director.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function(director) {
                if (director) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};


// Movie Route Configs
let movies = {
    get: function(req, res) {
        models.Movie.find({
                where: {
                    id: req.params.id
                },
				include: [models.Director]
            })
            .then(function(movie) {
                if (movie) {
                    res(movie).code(200);
                }
                else {
                    res().code(404);
                }
            });
    },
    getAll: function(req, res) {
        models.Movie.findAll({
			include: [models.Director],
			limit: 50,
			order: '"updatedAt" DESC'
		})
        .then(function(movies) {
	    	res(movies).code(200);
		});
    },
    create: function(req, res) {
        models.Movie.create({
                title: req.payload.title,
                year: req.payload.year,
                director: req.payload.director,
                DirectorId: req.payload.DirectorId,
                genre: req.payload.genre,
                coverImg: req.payload.coverImg,
                description: req.payload.description,
                synopsis: req.payload.synopsis,
                rating: req.payload.rating
            })
            .then(function(movie) {
                res(movie).code(200);
            })
            .catch(function() {
                res().code(406);
            });
    },
    update: function(req, res) {
        models.Movie.find({
                where: {
                    id: req.params.id
                }
            })
            .then(function(movie) {
                if (movie) {
                    movie.updateAttributes({
                        title: req.payload.title,
                        year: req.payload.year,
                        DirectorId: req.payload.DirectorId,
                        genre: req.payload.genre,
                        coverImg: req.payload.coverImg,
                        synopsis: req.payload.synopsis,
                        description: req.payload.description,
                        rating: req.payload.rating
                    }).then(function(movie) {
                        res(movie).code(200);
                    }).catch(function() {
                        res().code(406);
                    });
                }
                else {
                    res().code(404);
                }
            });
    },
    delete: function(req, res) {
        models.Movie.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function(movie) {
                if (movie) {
                    res().code(200);
                }
                else {
                    res().code(404);
                }
            });
    }
};


module.exports = {
	users,
	files,
    directors,
    movies
};
