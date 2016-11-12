'use strict';

import React from 'react';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class Input extends React.Component {
	// TODO: Show message text as an array of validation messages

	constructor() {
        super();

        this.state = {
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
		this.handleInputChange = this.handleInputChange.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.updateMessageText = this.updateMessageText.bind(this);
    }

	componentDidMount() {
		this.updateMessageText();
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.pristine) {
			this.validateInit(nextProps);
		}
	}

	handleInputChange(e) {
		this.validateInput(e);
	}

	validateInit(props) {
		let type = props.validate;
		let value = props.value;
		let empty = props.required ? (value ? false : true) : false;
		let validity = defaultValidations[type].regex.test(value)  && !empty;
		this.setState({
			valid: validity,
			pristine: empty
		});
		let input = {
			name: props.name,
			valid: validity
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
				<input className={validationClasses} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.handleInputChange} onMouseDown={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
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
	validate: React.PropTypes.string.isRequired,
	validateMessage: React.PropTypes.string,
	handleInputChange: React.PropTypes.func.isRequired,
	required: React.PropTypes.bool
}
