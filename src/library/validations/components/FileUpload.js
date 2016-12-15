'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import accepts from 'attr-accept';
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';
import { addErrorMessage, removeErrorMessage } from '../utils/updateErrorMessages';

// TODO: Test and code cleanup
// TODO: Drag & Drop functionality

export default class FileUpload extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'name': null,
			'value': null,
			'formName': null,
			'valid': true,
			'initial': true,
			'file': {},
			'files': [],
			'filesUploaded': [],
			'formName': '',
			'maxFiles': props.maxFiles,
			// File size is multiplied to allow input in MB's
			'minSize': props.minSize * Math.pow(1024, 2),
			'maxSize': props.maxSize * Math.pow(1024, 2),
			'showFileList': false,
			'touched': false,
			'pristine': true,
			'errors': [],
			'focused': false,
			'blurred': false
		};

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.toggleFileList = this.toggleFileList.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateFiles = this.validateFiles.bind(this);
		this.updateErrorMessages = this.updateErrorMessages.bind(this);
		this.verifyFileType = this.verifyFileType.bind(this);
	}

	componentDidMount() {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('.form').getAttribute('name');
		if (this.props.singleFile && this.props.multiple) {
			throw new Error(' Oops! If singleFile prop is true, multiple prop must be false. (FileUpload.js)')
		}
		if (this.props.required) {
			if (this.props.required > this.state.maxFiles) {
				throw new Error(' Oops! Total required files must be less than the max total files allows. (FileUpload.js)');
			}
		}
		let input = {
			'name': this.props.name,
			'value': this.props.value,
			'formName': formName
		};
		this.updateErrorMessages(input, (this.props.required ? false : true), 'filesRequired', 'This is a required field.');
		input = Object.assign(this.state, input);
		this.setState(input);
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	// Accounts for initial data check and conditionally required inputs
	componentWillReceiveProps(nextProps) {
		let initialValue = this.props.singleFile ? (nextProps.value ? nextProps.value.name : false) : (nextProps.value ? nextProps.value[0] : false);
		if (this.state.initial && this.state.pristine && initialValue) {
			this.validateInit(nextProps);
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

	// This checks the validation of any input containing data on first render
	validateInit(props) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('.form').getAttribute('name');
		let input = {
			'name': props.name,
			'initial': false
		};
		if (this.props.singleFile) {
			input.file = props.value || {};
			this.updateErrorMessages(input, (props.required ? !!input.file : true), 'filesRequired', 'This is a required field.');
		} else {
			input.files = props.value || [];
			let message = props.required > 1 ? `At least ${props.required} files are required.` : `At least 1 file is required`;
			this.updateErrorMessages(input, (props.required ? (input.files.length >= props.required ? true : false) : true), 'filesRequired', message);
		}
		input.value = props.value;
		input = Object.assign(this.state, input);
		this.setState(input);
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	validateFiles(e) {
		e.preventDefault();
		let input = {
			'name': e.target.name,
			'initial': false,
			'pristine': false
		}
		let newFile = e.target.files[0];
		let newFiles = e.target.files;
		let unAcceptedFileType = false;
		let unAcceptedFileSize = false;

		// Verify accepted file types if any are set
		if (this.props.accept) {
			for (let i = 0; i < newFiles.length; i++) {
				if (!this.verifyFileType(newFile) || !this.verifyFileType(newFiles[i])) {
					unAcceptedFileType = true;
					return;
				}
			}
		}
		this.updateErrorMessages(input, !unAcceptedFileType, 'unAcceptedFileType', `Accepted file type(s): ${this.props.accept}`);

		// Verify file size restrictions if any are set (props should be set in mb)
		for (let i = 0; i < newFiles.length; i++) {
			if (newFiles[i].size < this.state.minSize || newFiles[i].size > this.state.maxSize ||
				newFile.size < this.state.minSize || newFile.size > this.state.maxSize) {
				unAcceptedFileSize = true;
				return;
			}
		}
		this.updateErrorMessages(input, !unAcceptedFileSize, 'unAcceptedFileSize', `File size must be between ${this.state.minSize / Math.pow(1024, 2)}MB and ${this.state.maxSize / Math.pow(1024, 2)}MB`);

		if (this.props.singleFile) {
			let existingFile = this.state.file;
			if (existingFile.name && newFile.name === existingFile.name) {
				let replaceFile = window.confirm(`A file with the name already exists. Overwrite this file?`);
				if (replaceFile) {
					this.props.handleFileUpload(newFile);
				}
			} else {
				this.props.handleFileUpload(newFile);
			}
			if (!this.state.showFileList) {
				this.toggleFileList();
			}
			this.updateErrorMessages(input, (this.props.required ? newFile.name : true), 'filesRequired', 'This is a required field.');
			input.value = newFile;
			input.file = newFile;
			input = Object.assign(this.state, input);
			this.setState(input);
			FormActions.addInput(input);
		} else {
			let existingFiles = this.state.files;
			let existingFileNames = existingFiles.map((file) => {
				return file.name
			});
			let filesToUpload = [];
			let filesUploaded = this.state.filesUploaded;

			// Show error and cancel upload if max files allowed is exceeded
			if (this.state.files.length + newFiles.length > this.state.maxFiles) {
				this.updateErrorMessages(input, (this.state.files.length + newFiles.length <= this.state.maxFiles), 'maxFilesExceeded', `Max file count is ${this.state.maxFiles}.`);
				return;
			}

			// Update new file list and check for duplicate file names
			// BUG: Selecting 2 consecutive files (in Google Chrome) of the same name and file size seems to skip this step ???
			for (let i = 0; i < newFiles.length; i++) {
				if (existingFiles.length === 0) {
					existingFiles.push(newFiles[i]);
				} else {
					if (existingFileNames.indexOf(newFiles[i].name) !== -1) {
						let replaceFile = window.confirm(`A file with the name already exists. Overwrite this file?`);
						if (replaceFile) {
							existingFiles[existingFileNames.indexOf(newFiles[i].name)] = newFiles[i];
							filesToUpload.push(newFiles[i]);
						}
					} else {
						existingFiles.push(newFiles[i]);
					}
				}
			}

			// Send all new files to parent component where upload will be handled
			existingFiles.forEach((file) => {
				if (existingFileNames.indexOf(file.name) === -1) {
					filesToUpload.push(file);
					filesUploaded.push(file);
				}
			});
			if (filesToUpload.length > 0) {
				this.props.handleFileUpload(filesToUpload);
			}

			// This is simply a name change to be more explicit/organized
			let updatedFiles = existingFiles;

			// Update state of validity
			let message = this.props.required > 1 ? `At least ${this.props.required} files are required.` : `At least 1 file is required`;
			this.updateErrorMessages(input, (this.props.required ? (existingFiles.length >= this.props.required ? true : false) : true), 'filesRequired', message);

			if (!this.state.showFileList) {
				this.toggleFileList();
			}
			input.value = updatedFiles;
			input.filesUploaded = filesUploaded;
			input.files = updatedFiles;
			input = Object.assign(this.state, input);
			this.setState(input);
			FormActions.addInput(input);
		}
	}

	verifyFileType(file) {
		return accepts(file, this.props.accept);
	}

	handleRemoveFile(index) {
		let input;
		if (this.props.singleFile) {
			input = {
				'name': this.props.name,
				'value': {},
				'file': {}
			};
			this.updateErrorMessages(input, (this.props.required ? false : true), 'filesRequired', 'This is a required field.');
		} else {
			let files = this.state.files;
			files.splice(index, 1);
			input = {
				'name': this.props.name,
				'value': files
			};
			let message = this.props.required > 1 ? `At least ${this.props.required} files are required.` : `At least 1 file is required.`;
			this.updateErrorMessages(input, (this.props.required ? (files.length >= this.props.required ? true : false) : true), 'filesRequired', message);
		}
		this.updateErrorMessages(input, true, 'maxFilesExceeded', null);
		input = Object.assign(this.state, input);
		this.setState(input);
		FormActions.addInput(input);
	}

	updateErrorMessages(input, condition, key, text) {
		let newErrorMessages;
		if (!condition) {
			let errorText = this.props.validateMessage || text || defaultValidations[this.props.validate].message;
			newErrorMessages = addErrorMessage(this.state.errors, key, errorText);
		} else {
			newErrorMessages = removeErrorMessage(this.state.errors, key);
		}
		input.errors = newErrorMessages;
		input.valid = newErrorMessages.length === 0;
		input = Object.assign(this.state, input);
		this.setState(input);
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	handleMouseDown() {
		let input = Object.assign(this.state, {'touched': true});
		this.setState(input);
		FormActions.addInput(input);
	}

	handleFocus() {
		let input = Object.assign(this.state, {'focused': true, 'blurred': false});
		this.setState(input);
		FormActions.addInput(input);
	}

	handleBlur() {
		let input = Object.assign(this.state, {'focused': false, 'blurred': true});
		this.setState(input);
		FormActions.addInput(input);
	}

	toggleFileList(e) {
		if (e) {
			e.preventDefault();
		}
		let input = Object.assign(this.state, {'showFileList': !this.state.showFileList});
		this.setState(input);
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
			'dirty': !this.state.pristine
		});

		let fileContainerClasses = classNames({
			'file-container': true,
			'show':  this.state.maxFiles > 1
		});

		let fileListClasses = classNames({
			'file-list': true,
			'show': this.state.showFileList
		});

		return (
			<div className="upload-container">
				<div className={validationClasses}>
					<label htmlFor={this.props.name} onMouseDown={this.handleMouseDown} >Browse Files...</label>
					<div className="file-count">{this.props.singleFile ? (this.state.file.name ? 1 : 0) : this.state.files.length || 0}{this.props.required ? '/' : ''}
						{this.props.singleFile && this.props.required ? 1 : (!this.props.singleFile && this.props.required ? this.props.required : '')}</div>
					<input type="file" name={this.props.name} id={this.props.name} onChange={this.validateFiles} onFocus={this.handleFocus} onBlur={this.handleBlur} accept={this.props.accept} multiple={this.props.multiple}/>
				</div>
				<div className="file-info">
					<div className={fileContainerClasses}>
						<button className="button info toggle-list" onClick={this.toggleFileList}>
							{ this.state.showFileList ? <span className="fa fa-minus"></span> : <span className="fa fa-plus"></span>} { this.state.showFileList ? 'Hide File List' : 'Show File List'}
						</button>
						{
							!this.props.singleFile &&this.state.files.length < 1 && this.state.showFileList ||
							this.props.singleFile && !this.state.file.name && this.state.showFileList ?
							<div className="help-text">Drag & drop files or click above to browse for files</div> :
							<div className={fileListClasses}>
								<table className="file-list-table">
		 							<thead>
		 								<tr>
		 									<th>File Name</th>
		 									<th>Type</th>
		 									<th>Size</th>
		 									<th className="remove-file-header">Delete?</th>
		 								</tr>
		 							</thead>
									{
										this.props.singleFile ?
										<tbody>
			 								<tr>
			 									<td>{this.state.file.name}</td>
			 									<td>{this.state.file.type}</td>
			 									<td>{(this.state.file.size / Math.pow(1024, 2)).toFixed(2)}MB</td>
			 									<td className="remove-file"><span className="fa fa-times" onClick={this.handleRemoveFile.bind(this)}></span></td>
			 								</tr>
			 							</tbody> :
										<tbody>
 			 								{this.state.files.map((file, i) => <tr key={i} name="file.name">
 			 									<td>{file.name}</td>
 			 									<td>{file.type}</td>
 			 									<td>{(file.size / Math.pow(1024, 2)).toFixed(2)}MB</td>
 			 									<td className="remove-file"><span className="fa fa-times" onClick={this.handleRemoveFile.bind(this, i)}></span></td>
 			 								</tr>)}
 			 							</tbody>
									}
		 						</table>
								<div className={errorClasses}>
									{this.state.errors.map((error, i) => <div key={i}>{error.message}</div>)}
								</div>
							</div>
						}
					</div>
				</div>
				<div className={errorClasses}>
					{this.state.errors.map((error, i) => <div key={i}>{error.message}</div>)}
				</div>
			</div>
		)
	}
}

FileUpload.propTypes = {
	'name': React.PropTypes.string.isRequired,
	'fileName': React.PropTypes.string,
	'validateMessage': React.PropTypes.string,
	'handleFileUpload': React.PropTypes.func.isRequired,
	'accept': React.PropTypes.string,
	'singleFile': React.PropTypes.bool.isRequired,
	'multiple': React.PropTypes.bool,
	'maxFiles': React.PropTypes.number,
	'minSize': React.PropTypes.number,
	'maxSize': React.PropTypes.number,
	'preserveState': React.PropTypes.bool,
	'required': React.PropTypes.number,
	'disabled': React.PropTypes.bool
}

FileUpload.defaultProps = {
	'maxFiles': 5,
	'minSize': 0,
	'maxSize': 100,
	'preserveState': false
};
