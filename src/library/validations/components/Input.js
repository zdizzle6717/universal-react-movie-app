'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class Input extends React.Component {
	// TODO: Show message text as an array of validation messages
	// TODO: Set invalid if min/max is not met
	// NOTE: this.state.initial represents an input that already has a value but has not yet been validated

	constructor(props, context) {
        super(props, context);

        this.state = {
			initial: true,
            valid: true,
			touched: false,
			pristine: true,
			focused: false,
			blurred: false,
			messageText: 'Invalid Entry',
			form: ''
        };

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.updateMessageText = this.updateMessageText.bind(this);
    }

	componentWillMount() {
	}

	componentDidMount() {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('form').getAttribute('name');
		this.updateMessageText();
		let validity = this.props.required ? false : true;
		this.setState({
			valid: validity,
			form: formName
		});
		let input = {
			name: this.props.name,
			value: this.props.value,
			form: formName,
			valid: validity
		};
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	// Accounts for initial data check and conditionally required inputs
	componentWillReceiveProps(nextProps) {
		if (this.state.initial && this.state.pristine && nextProps.value || this.props.required !== nextProps.required) {
			this.validateInit(nextProps);
		}
	}

	// This will update validation in the case that an input is conditionally visible
	componentWillUnmount() {
		let input = {
			name: this.props.name,
			form: this.state.form
		}
		setTimeout(() => {
			FormActions.removeInput(input);
		});
	}

	// This checks the validation of any input containing data on first render
	validateInit(props) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('form').getAttribute('name');
		let type = props.validate;
		let value = props.value;
		let empty = props.required ? (value ? false : true) : false;
		let validity = defaultValidations[type].regex.test(value)  && !empty;
		validity = props.inputMatch ? (value === props.inputMatch && validity) : validity;
		this.setState({
			initial: false,
			valid: validity
		});
		let input = {
			name: props.name,
			value: value,
			valid: validity,
			form: formName,
			initial: false
		};
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
		if (empty) {
			this.setState({
				messageText: 'Required Field'
			})
		} else if (this.props.inputMatch) {
			if (value !== this.props.inputMatch) {
				this.setState({
					messageText: 'Fields Do Not Match'
				})
			} else {
				this.updateMessageText();
			}
		} else {
			this.updateMessageText();
		}
		this.setState({
			valid: validity,
			pristine: false
		});
		let input = {
			name: e.target.name,
			value: e.target.value,
			valid: validity,
			form: this.state.form,
			initial: false
		}
		FormActions.addInput(input);
		this.props.handleInputChange(e);
	}

	updateMessageText() {
		let newText = this.props.validateMessage || defaultValidations[this.props.validate].message;
		this.setState({
			messageText: newText
		});
	}

	handleMouseDown() {
		this.setState({
			touched: true
		})
	}

	handleFocus() {
		this.setState({
			focused: true,
			blurred: false
		})
	}

	handleBlur() {
		this.setState({
			focused: false,
			blurred: true
		})
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
	type: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	min: React.PropTypes.string,
	max: React.PropTypes.string,
	validate: React.PropTypes.string.isRequired,
	validateMessage: React.PropTypes.string,
	handleInputChange: React.PropTypes.func.isRequired,
	required: React.PropTypes.bool,
	disabled: React.PropTypes.bool,
	inputMatch: React.PropTypes.string
}
