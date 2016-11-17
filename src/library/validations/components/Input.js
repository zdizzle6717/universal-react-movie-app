'use strict';

import React from 'react';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class Input extends React.Component {
	// TODO: Show message text as an array of validation messages
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
			messageText: 'Invalid Entry'
        };

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.updateMessageText = this.updateMessageText.bind(this);
    }

	componentDidMount() {
		this.updateMessageText();
		let validity = this.props.required ? false : true;
		this.setState({
			valid: validity
		});
		let input = {
			name: this.props.name,
			value: this.props.value,
			valid: validity
		};
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.initial && this.state.pristine && nextProps.value) {
			this.validateInit(nextProps);
		}
	}

	componentWillUnmount() {
		let input = {
			name: this.props.name
		}
		setTimeout(() => {
			FormActions.removeInput(input);
		});
	}

	// This checks the validation of any input containing data on first render
	validateInit(props) {
		let type = props.validate;
		let value = props.value;
		let empty = props.required ? (value ? false : true) : false;
		let validity = defaultValidations[type].regex.test(value)  && !empty;
		this.setState({
			initial: false,
			valid: validity
		});
		let input = {
			name: props.name,
			value: value,
			valid: validity,
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
		if (empty) {
			this.setState({
				messageText: 'Required Field'
			})
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
	disabled: React.PropTypes.bool
}
