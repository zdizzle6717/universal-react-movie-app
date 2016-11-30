import AppDispatcher from '../../../dispatcher';
import UserConstants from '../constants/UserConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'user:change';

let _users = [];
let _user = {};
let _isAuthenticated = false;
let _previousRoute = null;

function setUsers(users) {
	if (users) {
		_users = users;
	}
}

function setUser(user) {
	if (user) {
		_user = user;
		_isAuthenticated = true;
		sessionStorage.setItem('user', JSON.stringify(user));
		console.log('Auth credentials changed.');
	}
}

function logoutUser() {
	_user = {};
	_isAuthenticated = false;
	sessionStorage.removeItem('user');
	return _isAuthenticated;
}

function removeUser(id) {
	let index = _users.findIndex((user) => user.id === id);

	if (index !== -1) {
		_users.splice(index, 1);
	}
	return _users;
}

class UserStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

	setPreviousRoute(route) {
		_previousRoute = route;
	}

	getPreviousRoute() {
		return _previousRoute;
	}

    getUsers() {
        return _users;
    }

    getUser() {
        return _user;
    }

	checkAuthentication() {
		return _isAuthenticated;
	}

}

const UserStore = new UserStoreClass();

UserStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
        case UserConstants.CREATE_USER:
            setUser(action.user);
            UserStore.emitChange();
            break;

		case UserConstants.AUTHENTICATE_USER:
            setUser(action.user);
            UserStore.emitChange();
            break;

		case UserConstants.SET_USER:
            setUser(action.user);
            UserStore.emitChange();
            break;

		case UserConstants.LOGOUT_USER:
            logoutUser();
            UserStore.emitChange();
            break;

		case UserConstants.GET_USER:
            setUser(action.user);
            UserStore.emitChange();
            break;

        case UserConstants.GET_USERS:
            setUsers(action.users);
            UserStore.emitChange();
            break;

        case UserConstants.UPDATE_USER:
            setUser(action.user);
            UserStore.emitChange();
            break;

        case UserConstants.REMOVE_USER:
            removeUser(action.id);
            UserStore.emitChange();
            break;

        default:
    }

});

export default UserStore;
