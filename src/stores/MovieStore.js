'use strict';

import AppDispatcher from '../dispatcher';
import MovieConstants from '../constants/MovieConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _movie = {};
let _movies = [];

function setMovie(movie) {
	_movie = movie;
}

function setMovies(movies) {
	_movies = movies;
}

function removeMovie(id) {
	let index = _movies.findIndex((movie) => movie.id === id);

	if (index !== -1) {
		_movies.splice(index, 1);
	}
	return _movies;
}

class MovieStoreClass extends EventEmitter {

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback)
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback)
	}

	getMovies() {
		return _movies;
	}

	getMovie() {
		return _movie;
	}
}

const MovieStore = new MovieStoreClass();

MovieStore.dispatchToken = AppDispatcher.register((action) => {

	switch(action.actionType) {
		case MovieConstants.GET_MOVIE:
			setMovie(action.movie);
			MovieStore.emitChange();
			break

		case MovieConstants.GET_MOVIES:
			setMovies(action.movies);
			MovieStore.emitChange();
			break

		case MovieConstants.CREATE_MOVIE:
			setMovie(action.movie);
			MovieStore.emitChange();
			break

		case MovieConstants.UPDATE_MOVIE:
			setMovie(action.movie);
			MovieStore.emitChange();
			break

		case MovieConstants.REMOVE_MOVIE:
			removeMovie(action.id);
			MovieStore.emitChange();
			break

		default:
	}
});

export default MovieStore;
