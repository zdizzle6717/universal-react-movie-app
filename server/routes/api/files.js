'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');

module.exports = [
	// Files
    {
		method: 'POST',
        path: '/api/files/{path}',
        handler: handlers.files.upload,
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
			auth: {
				strategy: 'jsonWebToken',
				scope: ['movieAdmin', 'siteAdmin']
			},
			cors: {
                origin: ['*']
            }
        }
    },
];
