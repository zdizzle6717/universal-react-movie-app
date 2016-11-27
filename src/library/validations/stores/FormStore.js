'use strict';

import AppDispatcher from '../../../dispatcher';
import FormConstants from '../constants/FormConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'form:change';

let _inputs = [];
let _validity = {};

function setInput(input) {
	if (!input.form) {
		return;
	}
	let inputExists = false;
	for (let i = 0; i < _inputs.length; i++) {
		if (_inputs[i].name === input.name && _inputs[i].form === input.form) {
			inputExists = true;
			_inputs[i] = input;
			return setValidity(input.form);
		}
	}
	if (!inputExists) {
		_inputs.push(input);
		return setValidity(input.form);
	}
}

function removeInput(input) {
	let showError = true;
	for (let i = 0; i < _inputs.length; i++) {
		if (_inputs[i].name === input.name && _inputs[i].form === input.form) {
			showError = false;
			_inputs.splice(i, 1);
			return setValidity(input.form);
		}
	}
	if (showError) {
		throw 'Error: Failed to remove input on componentWillUnmount (FormStore.js)'
	}
}

function setValidity(formName) {
	_validity[formName] = true;
	for (let i = 0; i < _inputs.length; i++) {
		if (_inputs[i].valid === false && _inputs[i].form === formName) {
			_validity[formName] = false;
			return _validity[formName];
		}
	}
	if (_validity[formName]) {
		return _validity[formName];
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

	getValidity(formName) {
		return _validity[formName];
	}

	reset() {
		_inputs = [];
		_validity = {};
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
