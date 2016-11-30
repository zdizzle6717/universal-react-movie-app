'use strict';

module.exports = [
	{
		'name': 'public',
		'roleFlags': 0,
		'homeState': '/'
	},
	{
		'name': 'siteAdmin',
		'roleFlags': 1,
		'homeState': '/'
	},
	{
		'name': 'movieAdmin',
		'roleFlags': 2,
		'homeState': '/movies'
	},
	{
		'name': 'directorAdmin',
		'roleFlags': 4,
		'homeState': '/directors'
	},
];
