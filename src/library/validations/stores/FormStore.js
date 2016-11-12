'use strict';

import AppDispatcher from '../../../dispatcher';
import FormConstants from '../constants/FormConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'form:change';

let _inputs = [];
let _validity = false;

function setInputs(input) {
	_inputs[input.name] = input;
	setValidity();
}

function setValidity() {
	_validity = true;
	for (let i in _inputs) {
		if (_inputs[i].valid === false) {
			_validity = false;
			break;
		}
	}
	return _validity;
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
            setInputs(action.input);
            FormStore.emitChange();
            break;

        default:
    }

});

export default FormStore;
