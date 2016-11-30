'use strict';

let handlers = require('./handlers');
let Joi = require('joi');
let models = require('../models');

module.exports = []
	.concat(require('./api/directors'))
	.concat(require('./api/files'))
	.concat(require('./api/movies'))
	.concat(require('./api/users'));
