'use strict';

import AppDispatcher from '../dispatcher';
import DirectorConstants from '../constants/DirectorConstants';
import DirectorService from '../services/DirectorService';

export default {
    getDirectors: () => {
        return DirectorService
            .getDirectors()
            .then(directors => {
                AppDispatcher.dispatch({
                    actionType: DirectorConstants.GET_DIRECTORS,
                    directors: directors
                });
				return directors;
            });
    },

    getDirector: (id) => {
        return DirectorService
            .getDirector(id)
            .then(director => {
                AppDispatcher.dispatch({
                    actionType: DirectorConstants.GET_DIRECTOR,
                    director: director
                });
				return director;
            });
    },

	createDirector: (data) => {
        return DirectorService
            .createDirector(data)
            .then(director => {
                AppDispatcher.dispatch({
                    actionType: DirectorConstants.CREATE_DIRECTOR,
                    director: director
                });
				return director;
            });
    },

	updateDirector: (id, data) => {
        return DirectorService
            .updateDirector(id, data)
            .then(director => {
                AppDispatcher.dispatch({
                    actionType: DirectorConstants.UPDATE_DIRECTOR,
                    director: director
                });
				return director;
            });
    },

	removeDirector: (id) => {
        return DirectorService
            .removeDirector(id)
            .then(director => {
                AppDispatcher.dispatch({
                    actionType: DirectorConstants.REMOVE_DIRECTOR,
                    id: id
                });
				return director;
            });
    }
};
