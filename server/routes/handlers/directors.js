'use strict';

const models = require('../../models');
const fs = require('fs-extra');
const env = require('../../config/envVariables.js');
const Boom = require('boom');

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

module.exports = directors;
