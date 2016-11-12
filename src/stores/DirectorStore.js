'use strict';

import AppDispatcher from '../dispatcher';
import DirectorConstants from '../constants/DirectorConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _director = {};
let _directors = [];

function setDirector(director) {
	_director = director;
}


function setDirectors(directors) {
	_directors = directors;
}

function removeDirector(id) {
	let index = _directors.findIndex((director) => director.id === id);

	if (index !== -1) {
		_directors.splice(index, 1);
	}
	return _directors;
}

class DirectorStoreClass extends EventEmitter {

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback)
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback)
	}

	getDirectors() {
		return _directors;
	}

	getDirector() {
		return _director;
	}
}

const DirectorStore = new DirectorStoreClass();

DirectorStore.dispatchToken = AppDispatcher.register((action) => {

	switch(action.actionType) {
		case DirectorConstants.GET_DIRECTOR:
			setDirector(action.director);
			DirectorStore.emitChange();
			break

		case DirectorConstants.GET_DIRECTORS:
			setDirectors(action.directors);
			DirectorStore.emitChange();
			break

		case DirectorConstants.CREATE_DIRECTOR:
			setDirector(action.director);
			DirectorStore.emitChange();
			break

		case DirectorConstants.UPDATE_DIRECTOR:
			setDirector(action.director);
			DirectorStore.emitChange();
			break

		case DirectorConstants.REMOVE_DIRECTOR:
			removeDirector(action.id);
			DirectorStore.emitChange();
			break

		default:
	}
});

export default DirectorStore;
