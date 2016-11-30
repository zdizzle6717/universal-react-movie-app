'use strict';

export default [
	{
		'route': '/',
		'view': 'index'
	},
	{
		'route': '/login',
		'view': 'login'
	},
	{
		'route': '/register',
		'view': 'register'
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
