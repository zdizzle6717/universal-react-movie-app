'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class CheckBox extends React.Component {
	// NOTE: An initial state value should be set in the parent component (true/false)

	constructor() {
        super();

		this.state = {
			checked: false,
			initial: true,
			valid: true,
			touched: false,
			pristine: true,
			form: ''
		}

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInputChange = this.validateInputChange.bind(this);
    }

	componentDidMount() {
		// TODO: If new form, set the model value by triggering this.props.handleInputChange(e)
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('form').getAttribute('name');
		let validity = this.props.required ? false : true;
		this.setState({
			checked: this.props.value || false,
			valid: validity,
			form: formName
		});
		let input = {
			name: this.props.name,
			value: this.props.value || false,
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

	validateInit(props) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('form').getAttribute('name');
		let validity = props.required ? (props.value ? true : false) : true;
		this.setState({
			checked: props.value,
			initial: false,
			valid: validity
		});
		let input = {
			name: props.name,
			value: props.value,
			valid: validity,
			form: formName,
			initial: false
		};
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	validateInputChange(e) {
		// We are validating for the new value, so some booleans may seem to be reversed
		let validity = this.props.required ? (!this.state.checked ? true : false) : true;
		this.setState({
			checked: !this.state.checked,
			valid: validity,
			pristine: false
		});
		let input = {
			name: this.props.name,
			value: !this.state.checked,
			valid: validity,
			form: this.state.form,
			initial: false
		}
		FormActions.addInput(input);
		this.props.handleInputChange(e);
	}

	handleMouseDown() {
		this.setState({
			touched: true
		})
	}

	handleFocus() {
		this.setState({
			focused: true
		})
	}

	handleBlur() {
		this.setState({
			focused: false,
			blurred: true
		})
	}

	render() {
		// TODO: These may not necessarily be needed
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
				<input className={validationClasses} name={this.props.name} id={this.props.name} type="checkbox" checked={this.state.checked} onClick={this.handleMouseDown} onChange={this.validateInputChange} onFocus={this.handleFocus} onBlur={this.handleBlur} disabled={this.props.disabled}/>
				<label className={this.props.required ? 'required' : ''} htmlFor={this.props.name}>{this.props.label}</label>
			</div>
		)
	}
}

CheckBox.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.bool,
	label: React.PropTypes.string.isRequired,
	validateMessage: React.PropTypes.string,
	handleInputChange: React.PropTypes.func.isRequired,
	required: React.PropTypes.bool,
	disabled: React.PropTypes.bool
}
