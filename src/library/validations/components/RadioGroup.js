'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

// TODO: Consider moving all of the components state to the Form Store

export default class RadioGroup extends React.Component {
	constructor() {
        super();

		this.state = {
			'name': null,
			'value': '',
			'formName': null,
			'valid': true,
			'initial': true,
			'touched': false,
			'pristine': true,
			'focused': false,
			'blurred': false
		}

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInputChange = this.validateInputChange.bind(this);
    }

	componentDidMount() {
		this.validateInit(this.props);
		let e = {
			'target': {
				'value': this.props.options[0]
			}
		}
		this.props.handleInputChange(e);
	}

	// Accounts for initial data check and conditionally required inputs
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

	validateInit(props, propsHaveLoaded = false) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('.form').getAttribute('name');
		let existingInput = FormStore.getInput(formName, props.name);
		if (existingInput) {
			this.setState(existingInput);
			return;
		}
		let validity = props.required ? (props.value ? true : false) : true;
		let input = {
			'name': props.name,
			'value': props.value || props.options[0],
			'formName': formName,
			'valid': validity
		};
		this.setState(input);
		if (propsHaveLoaded) {
			input.initial = false;
			this.setState({
				'initial': false
			})
		}
		input = Object.assign(this.state, input);
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	validateInputChange(option, e) {
		let validity = this.props.required ? (e.target.value ? true : false) : true;
		let input = {
			'name': e.target.name,
			'value': option,
			'valid': validity,
			'initial': false,
			'pristine': false
		}
		input = Object.assign(this.state, input);
		this.setState(input);
		FormActions.addInput(input);
		this.props.handleInputChange(e);
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
			'validate-error-element': true,
			'radio-group': true,
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
			<div className={validationClasses}>
				<label htmlFor={this.props.name}>{this.props.label}</label>
				{this.props.options.map((option) => <div key={option} className="radio-group">
					<input name={this.props.name} id={this.props.name} value={option} type="radio" checked={this.state.value === option} onChange={this.validateInputChange.bind(this, option)}/> <label htmlFor={option} onClick={this.validateInputChange.bind(this, option)} onMouseDown={this.handleMouseDown}>{option}</label>
				</div>)}
			</div>
		)
	}
}

RadioGroup.propTypes = {
	'name': React.PropTypes.string.isRequired,
	'value': React.PropTypes.string,
	'label': React.PropTypes.string.isRequired,
	'options': React.PropTypes.array.isRequired,
	'validateMessage': React.PropTypes.string,
	'handleInputChange': React.PropTypes.func.isRequired,
	'preserveState': React.PropTypes.bool,
	'required': React.PropTypes.bool,
	'disabled': React.PropTypes.bool
}


RadioGroup.defaultProps = {
	'preserveState': false
};
