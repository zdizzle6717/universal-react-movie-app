'use strict';

import AppDispatcher from '../../../dispatcher';
import UserConstants from '../constants/UserConstants';
import UserService from '../services/UserService';

export default {
	create: (data) => {
        return UserService
            .create(data)
            .then(user => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.CREATE_USER,
                    user: user
                });
				return user;
            });
    },

	authenticate: (data) => {
        return UserService
            .authenticate(data)
            .then(user => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.AUTHENTCIATE_USER,
                    user: user
                });
				return user;
            });
    },

	get: (id) => {
        return UserService
            .get(id).then(user => {
				AppDispatcher.dispatch({
					actionType: UserConstants.GET_USER,
					user: user
				});
            });
    },

    getAll: () => {
        return UserService
            .getAll()
            .then(users => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.GET_USERS,
                    users: users
                });
            });
    },

	update: (id, data) => {
        return UserService
            .update(id, data)
            .then(user => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.UPDATE_USER,
                    user: user
                });
            });
    },

	remove: (id) => {
        return UserService
            .remove(id)
            .then(user => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.REMOVE_USER,
                    id: id
                });
            });
    }
}
