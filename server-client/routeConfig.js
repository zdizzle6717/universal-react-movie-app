'use strict';

export default [
	{
		'route': '/',
		'view': 'index'
	},
	{
		'route': '/movies*',
		'view': 'movies'
	},
	{
		'route': '/directors*',
		'view': 'directors'
	}
];
