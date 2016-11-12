'use strict';

import React from 'react';
import defaultValidations from '../constants/defaultValidations'
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class Select extends React.Component {
	constructor() {
        super();

        this.state = {
			valid: true,
			touched: false,
			pristine: true
        };

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInput = this.validateInput.bind(this);
    }

	componentWillReceiveProps(nextProps) {
		if (this.state.pristine) {
			this.validateInit(nextProps);
		}
	}

	validateInit(props) {
		let validity = props.required ? (props.value ? true : false) : true;
		this.setState({
			valid: validity,
			pristine: !props.value
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
		let validity = this.props.required ? (e.target.value ? true : false) : true;
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
				<select className={validationClasses} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.validateInput} onClick={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur}>
					{this.props.children}
				</select>
			</div>
		)
	}
}

Select.propTypes = {
	name: React.PropTypes.string.isRequired,
	validateMessage: React.PropTypes.string,
	handleInputChange: React.PropTypes.func.isRequired
}
