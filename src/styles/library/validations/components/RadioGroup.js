'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class RadioGroup extends React.Component {
	// NOTE: An initial state value of type 'string' should be set in the parent component

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
		this.setState({
			checked: this.props.value || this.props.options[0]
		});
	}

	componentDidMount() {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('form').getAttribute('name');
		let validity = this.props.required ? false : true;
		this.setState({
			checked: this.props.value || this.props.options[0],
			valid: validity,
			form: formName
		});
		let input = {
			name: this.props.name,
			checked: this.props.value || this.props.options[0],
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

	validateInputChange(option, e) {
		let validity = this.props.required ? (e.target.value ? true : false) : true;
		this.setState({
			checked: option,
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
				<label htmlFor={this.props.name}>{this.props.label}</label>
				{this.props.options.map((option) => <div key={option} className="radio-group">
					<input name={this.props.name} value={option} type="radio" checked={this.state.checked === option} onChange={this.validateInputChange.bind(this, option)}/> <label htmlFor={option} onClick={this.validateInputChange.bind(this, option)}>{option}</label>
				</div>)}
			</div>
		)
	}
}

RadioGroup.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string,
	label: React.PropTypes.string.isRequired,
	validateMessage: React.PropTypes.string,
	handleInputChange: React.PropTypes.func.isRequired,
	required: React.PropTypes.bool,
	disabled: React.PropTypes.bool
}
