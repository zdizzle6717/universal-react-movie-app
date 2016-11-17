'use strict';

import React from 'react';
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class FileUpload extends React.Component {
	// TODO: Add validation functionality, drag & drop, etc.

	constructor() {
		super();

		this.state = {
			files: [],
			valid: true,
			touched: false,
			pristine: true
		};

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.uploadAndValidateFiles = this.uploadAndValidateFiles.bind(this);
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

	validateInit(props) {
		let validity = props.required ? (this.state.files.length >= props.required ? true : false) : true;
		this.setState({
			valid: validity,
			pristine: !props.fileName
		});
		let input = {
			name: props.name,
			valid: validity
		};
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	uploadAndValidateFiles(e) {
		e.preventDefault();
		// TODO: Upload file to server, then validate response

		let files = this.state.files;
		for (let i = 0; i < e.target.files.length; i++) {
			files.push(e.target.files[i]);
		}
		console.log(files);
		let validity = this.props.required ? (files.length >= this.props.required ? true : false) : true;
		if (!validity) {
			this.setState({
				messageText: 'At least 1 file is required'
			})
		} else {
			this.updateMessageText();
		}
		this.setState({
			files: files,
			valid: validity,
			pristine: false
		});
		let input = {
			name: files[0].name,
			valid: validity,
			initial: false
		}
		FormActions.addInput(input);
		this.props.handleFileUpload(e);
	}

	updateMessageText() {
		let newText;
		if (this.props.required > 1) {
			newText = this.props.validateMessage || `At least ${this.props.required} files are required.`;
		}
		if (this.props.required === 1) {
			newText = this.props.validateMessage || `At least 1 file is required.`;
		}
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
			'file-upload': true,
			'valid': this.state.valid,
			'invalid': !this.state.valid,
			'touched': this.state.touched,
			'untouched': !this.state.touched,
			'pristine': this.state.pristine,
			'focused': this.state.focused,
			'blurred': this.state.blurred,
			'dirty': !this.state.pristine
		});

		let errorClasses = classNames({
			'file-upload-errors': true,
			'invalid': !this.state.valid,
			'dirty': !this.state.pristine
		});

		let fileListClasses = classNames({
			'file-list': true,
			'show': this.state.files.length > 0
		})

		return (
			<div className="upload-container">
				<div className={validationClasses}>
					<label htmlFor={this.props.name}>Choose File</label>
					<input type="file" name={this.props.name} id={this.props.name} onChange={this.uploadAndValidateFiles} onClick={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur} accept={this.props.accept} multiple={this.props.multiple}/>
				</div>
				<div className={fileListClasses}>
					<table>
						<thead>
							<tr>
								<th>File Name</th>
								<th>Type</th>
								<th>Delete?</th>
							</tr>
						</thead>
						<tbody>
							{this.state.files.map((file, i) => <tr key={i} {...file} >
								<td>{file.name}</td>
								<td></td>
								<td></td>
							</tr>)}
						</tbody>
					</table>
				</div>
				<div className={errorClasses}>
					{this.state.messageText}
				</div>
			</div>
		)
	}
}

FileUpload.propTypes = {
	name: React.PropTypes.string.isRequired,
	fileName: React.PropTypes.string,
	validateMessage: React.PropTypes.string,
	handleFileUpload: React.PropTypes.func.isRequired,
	accept: React.PropTypes.string,
	multiple: React.PropTypes.bool,
	required: React.PropTypes.number,
	disabled: React.PropTypes.bool
}
