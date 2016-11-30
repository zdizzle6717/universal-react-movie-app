'use strict';

const models = require('../../models');
const fs = require('fs-extra');
const env = require('../../config/envVariables.js');
const Boom = require('boom');

let files = {
    upload: function(request, reply) {
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

module.exports = files;
