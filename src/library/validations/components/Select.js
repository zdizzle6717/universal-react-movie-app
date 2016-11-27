'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class Select extends React.Component {
	// NOTE: this.state.initial represents an input that already has a value but has not yet been validated

	constructor() {
        super();

        this.state = {
			initial: true,
			valid: true,
			touched: false,
			pristine: true,
			form: ''
        };

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInput = this.validateInput.bind(this);
    }

	componentDidMount() {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('form').getAttribute('name');
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

	componentWillReceiveProps(nextProps) {
		if (this.state.initial && this.state.pristine && nextProps.value) {
			this.validateInit(nextProps);
		}
	}

	// This will update validation in the case that an input is conditional visible
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

	validateInput(e) {
		e.preventDefault();
		let validity = this.props.required ? (e.target.value ? true : false) : true;
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
				<select className={validationClasses} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.validateInput} onClick={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur} disabled={this.props.disabled}>
					{this.props.children}
				</select>
			</div>
		)
	}
}

Select.propTypes = {
	name: React.PropTypes.string.isRequired,
	validateMessage: React.PropTypes.string,
	handleInputChange: React.PropTypes.func.isRequired,
	required: React.PropTypes.bool,
	disabled: React.PropTypes.bool
}
