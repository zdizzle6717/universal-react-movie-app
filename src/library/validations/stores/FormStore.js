'use strict';

import AppDispatcher from '../../../dispatcher';
import FormConstants from '../constants/FormConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'form:change';

let _inputs = [];
let _validity = false;

function setInput(input) {
	let inputExists = false;
	for (let i in _inputs) {
		if (_inputs[i].name === input.name) {
			inputExists = true;
			_inputs[i] = input;
			return setValidity();
		}
	}
	if (!inputExists) {
		_inputs.push(input);
		return setValidity();
	}
}

function removeInput(input) {
	let showError = true;
	for (let i in _inputs) {
		if (_inputs[i].name === input.name) {
			showError = false;
			_inputs.splice(i, 1);
			return setValidity();
		}
	}
	if (showError) {
		throw 'Error: Failed to remove input on componentWillUnmount'
	}
}

function setValidity() {
	_validity = true;
	for (let i in _inputs) {
		if (_inputs[i].valid === false) {
			_validity = false;
			return _validity;
		}
	}
	if (_validity) {
		return _validity;
	}
}

class FormStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getInputs() {
        return _inputs;
    }

	getValidity() {
		return _validity;
	}

}

const FormStore = new FormStoreClass();

FormStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
		case FormConstants.ADD_INPUT:
            setInput(action.input);
            FormStore.emitChange();
            break;

		case FormConstants.REMOVE_INPUT:
            removeInput(action.input);
            FormStore.emitChange();
            break;

        default:
    }

});

export default FormStore;
