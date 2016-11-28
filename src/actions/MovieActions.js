'use strict';

import AppDispatcher from '../dispatcher';
import MovieConstants from '../constants/MovieConstants';
import MovieService from '../services/MovieService';

export default {
	getMovie: (id) => {
        return MovieService
            .getMovie(id)
            .then(movie => {
                AppDispatcher.dispatch({
                    actionType: MovieConstants.GET_MOVIE,
                    movie: movie
                });
            });
    },

    getMovies: () => {
        return MovieService
            .getMovies()
            .then(movies => {
                AppDispatcher.dispatch({
                    actionType: MovieConstants.GET_MOVIES,
                    movies: movies
                });
            });
    },

	createMovie: (data) => {
        return MovieService
            .createMovie(data)
            .then(movie => {
                AppDispatcher.dispatch({
                    actionType: MovieConstants.CREATE_MOVIE,
                    movie: movie
                });
            });
    },

	updateMovie: (id, data) => {
        return MovieService
            .updateMovie(id, data)
            .then(movie => {
                AppDispatcher.dispatch({
                    actionType: MovieConstants.UPDATE_MOVIE,
                    movie: movie
                });
            });
    },

	removeMovie: (id) => {
        return MovieService
            .removeMovie(id)
            .then(movie => {
                AppDispatcher.dispatch({
                    actionType: MovieConstants.REMOVE_MOVIE,
                    id: id
                });
            });
    }
}
