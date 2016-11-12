'use strict';

import React from 'react';
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class FileUpload extends React.Component {
	constructor() {
		super();

		this.state = {
			valid: true
		};
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="file-upload">
				<input className={validationClasses} type="file" name={this.props.name} value={this.props.value} onChange={this.handleInputChange}/>
				<div className="validate-errors">
					<div className="validate-error">{this.state.messageText}</div>
				</div>
			</div>
		)
	}
}

Input.propTypes = {
	name: React.PropTypes.string.isRequired,
	validate: React.PropTypes.string.isRequired,
	validateMessage: React.PropTypes.string,
	handleInputChange: React.PropTypes.func.isRequired,
	required: React.PropTypes.bool
}
