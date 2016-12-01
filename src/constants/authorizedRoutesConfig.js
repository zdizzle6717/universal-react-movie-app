'use strict';

module.exports = [
	{
		'name': 'movieEdit',
		'path': '/movies/edit/',
		'accessControl': ['movieAdmin', 'siteAdmin']
	},
	{
		'name': 'movieCreate',
		'path': '/movies/create',
		'accessControl': ['movieAdmin', 'siteAdmin']
	},
	{
		'name': 'directorEdit',
		'path': '/directors/edit/',
		'accessControl': ['directorAdmin', 'siteAdmin']
	},
	{
		'name': 'movieEdit',
		'path': '/directors/create',
		'accessControl': ['directorAdmin', 'siteAdmin']
	},
];
