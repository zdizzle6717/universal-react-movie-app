'use strict';

const models = require('../../models');
const fs = require('fs-extra');
const env = require('../../config/envVariables.js');
const Boom = require('boom');

let movies = {
    get: function(req, res) {
        models.Movie.find({
                where: {
                    id: req.params.id
                },
				include: [
					{model: models.Director},
					{model: models.File},
				]
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
                description: req.payload.description,
                synopsis: req.payload.synopsis,
                rating: req.payload.rating
            })
			.then(function(movie) {
		        models.File.create({
						MovieId: movie.id,
		                name: req.payload.File.name,
		                type: req.payload.File.type,
		                size: req.payload.File.size
		            })
					.then(function(movie) {
						models.Movie.find({
								where: {
									id: movie.id
								},
								include: [
									{model: models.Director},
									{model: models.File},
								]
							}).then((movie) => {
								res(movie).code(200);
							});
		            })
		            .catch(function() {
		                res().code(406);
		            });
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
					models.File.find({
			                where: {
			                    MovieId: movie.id
			                }
			            }).then((file) => {
							file.updateAttributes({
									name: req.payload.File.name,
									type: req.payload.File.type,
									size: req.payload.File.size
					            }).then(() => {
									movie.updateAttributes({
				                        title: req.payload.title,
				                        year: req.payload.year,
				                        DirectorId: req.payload.DirectorId,
				                        genre: req.payload.genre,
				                        synopsis: req.payload.synopsis,
				                        description: req.payload.description,
				                        rating: req.payload.rating
				                    }).then(function(movie) {
										models.Movie.find({
								                where: {
								                    id: movie.id
								                },
												include: [
													{model: models.Director},
													{model: models.File},
												]
								            }).then((movie) => {
												res(movie).code(200);
											})
				                    }).catch(function() {
				                        res().code(406);
				                    });
								})
						})
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

module.exports = movies;
