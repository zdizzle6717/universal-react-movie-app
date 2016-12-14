'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

// TODO: Consider moving all of the components state to the Form Store
// TODO: Show message text as an array of validation messages
// TODO: Set invalid if min/max is not met

export default class Input extends React.Component {
	constructor(props, context) {
        super(props, context);

        this.state = {
			'name': null,
			'value': null,
			'formName': null,
			'messageText': 'Invalid Entry',
			'valid': true,
			'initial': true,
			'touched': false,
			'pristine': true,
			'focused': false,
			'blurred': false
        };

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.updateMessageText = this.updateMessageText.bind(this);
    }

	componentDidMount() {
		this.validateInit(this.props);
	}

	// Accounts for initial data returned from a service after componentDidMount and
	// re-validates when conditionally required inputs change
	componentWillReceiveProps(nextProps) {
		if (this.state.initial && this.state.pristine && nextProps.value || this.props.required !== nextProps.required) {
			this.validateInit(nextProps, true);
		}
	}

	// This will update validation in the case that an input is conditionally visible
	componentWillUnmount() {
		if (!this.props.preserveState) {
			let input = {
				'name': this.props.name,
				'formName': this.state.formName
			}
			setTimeout(() => {
				FormActions.removeInput(input);
			});
		}
	}

	// propsHaveLoaded is a check for the parent component state change after a service call is complete
	validateInit(props, propsHaveLoaded = false) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('.form').getAttribute('name');
		let existingInput = FormStore.getInput(formName, props.name);
		if (existingInput) {
			this.setState(existingInput);
			return;
		}
		let type = props.validate;
		let value = props.value;
		let empty = props.required ? (value ? false : true) : false;
		let validity = defaultValidations[type].regex.test(value)  && !empty;
		validity = props.inputMatch ? (value === props.inputMatch && validity) : validity;
		let input = {
			'name': props.name,
			'value': value,
			'formName': formName,
			'valid': validity
		};
		input = Object.assign(this.state, input);
		this.setState(input);
		if (propsHaveLoaded) {
			this.setState({
				initial: false
			})
		}
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	validateInput(e) {
		let type = this.props.validate;
		let value = e.target.value;
		let empty = this.props.required ? (value ? false : true) : false;
		let validity = defaultValidations[type].regex.test(value) && !empty;
		validity = this.props.inputMatch ? (value === this.props.inputMatch && validity) : validity;
		let input = {
			'name': e.target.name,
			'value': e.target.value,
			'valid': validity,
			'initial': false,
			'pristine': false
		}
		if (empty) {
			input.messageText = 'Required Field';
			this.setState({
				'messageText': 'Required Field'
			})
		} else if (this.props.inputMatch) {
			if (value !== this.props.inputMatch) {
				input.messageText = 'Fields Do Not Match';
				this.setState({
					'messageText': 'Fields Do Not Match'
				})
			} else {
				this.updateMessageText(input);
			}
		} else {
			this.updateMessageText(input);
		}
		input = Object.assign(this.state, input);
		this.setState(input);
		FormActions.addInput(input);
		this.props.handleInputChange(e);
	}

	updateMessageText(input) {
		let newText = this.props.validateMessage || defaultValidations[this.props.validate].message;
		input.messageText = newText;
		this.setState({
			'messageText': newText
		});
	}

	handleMouseDown() {
		let input = Object.assign(this.state, {'touched': true});
		this.setState({
			'touched': true
		});
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	handleFocus() {
		let input = Object.assign(this.state, {'focused': true, 'blurred': false});
		this.setState({
			'focused': true,
			'blurred': false
		});
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	handleBlur() {
		let input = Object.assign(this.state, {'focused': false, 'blurred': true});
		this.setState({
			'focused': false,
			'blurred': true
		});
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	render() {
		let validationClasses = classNames({
			'valid': this.state.valid,
			'invalid': !this.state.valid,
			'touched': this.state.touched,
			'untouched': !this.state.touched,
			'pristine': this.state.pristine,
			'focused': this.state.focused,
			'blurred': this.state.blurred,
			'dirty': !this.state.pristine
		});

		return (
			<div className="validate-error-element">
				<input className={validationClasses} type={this.props.type} name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} min={this.props.min} max={this.props.max} onChange={this.validateInput} onMouseDown={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur} disabled={this.props.disabled}/>
				<div className="validate-errors">
					<div className="validate-error">{this.state.messageText}</div>
				</div>
			</div>
		)
	}
}

Input.propTypes = {
	'type': React.PropTypes.string.isRequired,
	'name': React.PropTypes.string.isRequired,
	'value': React.PropTypes.string,
	'placeholder': React.PropTypes.string,
	'min': React.PropTypes.string,
	'max': React.PropTypes.string,
	'validate': React.PropTypes.string.isRequired,
	'validateMessage': React.PropTypes.string,
	'handleInputChange': React.PropTypes.func.isRequired,
	'preserveState': React.PropTypes.bool,
	'required': React.PropTypes.bool,
	'disabled': React.PropTypes.bool,
	'inputMatch': React.PropTypes.string
}

Input.defaultProps = {
	'preserveState': false
};
