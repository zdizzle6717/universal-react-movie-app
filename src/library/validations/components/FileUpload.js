'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import accepts from 'attr-accept';
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';
import { addErrorMessage, removeErrorMessage } from '../utils/updateErrorMessages';

export default class FileUpload extends React.Component {
	// TODO: Drag & Drop functionality

	constructor() {
		super();

		this.state = {
			initial: true,
			file: {},
			files: [],
			filesUploaded: [],
			form: '',
			maxFiles: 5,
			minSize: 0,
			maxSize: 100,
			showErrors: false,
			showFileList: false,
			valid: true,
			touched: false,
			pristine: true,
			errors: []
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
		let formName = elem.closest('form').getAttribute('name');
		if (this.props.singleFile && this.props.multiple) {
			throw new Error(' Oops! If singleFile prop is true, multiple prop must be false. (FileUpload.js)')
		}
		this.state.maxFiles = this.props.maxFiles ? this.props.maxFiles : this.state.maxFiles;
		// File size is multiplied to display in MB
		this.state.minSize = this.props.minSize ? this.props.minSize * Math.pow(1024, 2) : this.state.minSize * Math.pow(1024, 2);
		this.state.maxSize = this.props.maxSize ? this.props.maxSize * Math.pow(1024, 2) : this.state.maxSize * Math.pow(1024, 2);
		let validity = true;
		if (this.props.required) {
			if (this.props.required > this.state.maxFiles) {
				throw new Error(' Oops! Total required files must be less than the max total files allows. (FileUpload.js)');
			}
			validity = false
		}
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

	// This checks the validation of any input containing data on first render
	// TODO: Set state to the current files already in the model
	validateInit(props) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = elem.closest('form').getAttribute('name');
		let validity;
		if (this.props.singleFile) {
			// TODO: Set 'file' to an object with the current file
			let file = props.value ? props.value : {};
			let validity = props.required ? !!file : true;
			this.setState({
				name: props.name,
				file: file,
				valid: validity,
				initial: false
			});
		} else {
			// TODO: Set 'files' to an array of objects with the current files
			let files = props.value || [];
			let validity = props.required ? (files.length >= props.required ? true : false) : true;
			this.setState({
				name: props.name,
				files: files,
				valid: validity,
				initial: false
			});
		}
		let input = {
			name: props.name,
			value: props.value,
			valid: validity,
			form: formName
		};
		setTimeout(() => {
			FormActions.addInput(input);
		});
	}

	validateFiles(e) {
		e.preventDefault();
		this.setState({
			pristine: false
		});

		let newFile = e.target.files[0];
		let newFiles = e.target.files;
		let errorMessageFileType;
		let errorMessageFileSize;
		let unAcceptedFileType = false;
		let unAcceptedFileSize = false;

		// Verify accepted file types if any are set
		if (this.props.accept) {
			for (let i = 0; i < newFiles.length; i++) {
				if (!this.verifyFileType(newFile) || !this.verifyFileType(newFiles[i])) {
					unAcceptedFileType = true;
					errorMessageFileType = `Accepted file type(s): ${this.props.accept}`;
					this.updateErrorMessages('add', 'unAcceptedFileType', errorMessageFileType);
					this.setState({
						showErrors: true
					});
					return;
				}
			}
		}
		if (!unAcceptedFileType) {
			this.updateErrorMessages('remove', 'unAcceptedFileType', null);
		}

		// Verify file size restrictions if any are set (props should be set in mb)
		for (let i = 0; i < newFiles.length; i++) {
			if (newFiles[i].size < this.state.minSize || newFiles[i].size > this.state.maxSize ||
				newFile.size < this.state.minSize || newFile.size > this.state.maxSize) {
				unAcceptedFileSize = true;
				errorMessageFileSize = `File size must be between ${this.state.minSize / Math.pow(1024, 2)}MB and ${this.state.maxSize / Math.pow(1024, 2)}MB`;
				this.updateErrorMessages('add', 'unAcceptedFileSize', errorMessageFileSize);
				this.setState({
					showErrors: true
				});
				return;
			}
		}
		if (!unAcceptedFileSize) {
			this.updateErrorMessages('remove', 'unAcceptedFileSize', null);
		}

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
			let validity = this.props.required ? newFile.name : true;
			if (!validity) {
				let message = 'This is a required field.';
				this.updateErrorMessages('add', 'filesRequired', message);
			} else {
				this.updateErrorMessages('remove', 'filesRequired', null);
			}
			let input = {
				name: e.target.name,
				value: newFile,
				valid: validity,
				form: this.state.form,
				initial: false
			}
			FormActions.addInput(input);
			this.setState({
				name: this.props.name,
				file: newFile,
				valid: validity,
				pristine: false
			})
		} else {
			let existingFiles = this.state.files;
			let existingFileNames = existingFiles.map((file) => {
				return file.name
			});
			let filesToUpload = [];
			let filesUploaded = this.state.filesUploaded;

			// Show error and cancel upload if max files allowed is exceeded
			if (this.state.files.length + newFiles.length > this.state.maxFiles) {
				let message = `Max file count is ${this.state.maxFiles}.`;
				this.updateErrorMessages('add', 'maxFilesExceeded', message);
				this.setState({
					showErrors: true
				});
				return;
			} else {
				this.updateErrorMessages('remove', 'maxFilesExceeded', null);
			}

			// Update new file list and check for duplicate file names
			// TODO: BUG Selecting 2 consecutive files (in Google Chrome) of the same name and file size seems to skip this step ???
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
			let validity = this.props.required ? (existingFiles.length >= this.props.required ? true : false) : true;
			if (!validity) {
				let message = this.props.required > 1 ? `At least ${this.props.required} files are required.` : `At least 1 file is required`;
				this.updateErrorMessages('add', 'filesRequired', message);
			} else {
				this.updateErrorMessages('remove', 'filesRequired', null);
			}
			if (!this.state.showFileList) {
				this.toggleFileList();
			}
			let input = {
				name: e.target.name,
				value: updatedFiles,
				valid: validity,
				form: this.state.form,
				initial: false
			}
			FormActions.addInput(input);
			this.setState({
				filesUploaded: filesUploaded,
				name: this.props.name,
				files: updatedFiles,
				valid: validity,
				pristine: false
			});
		}
	}

	updateErrorMessages(action, key, text) {
		let newErrorMessages;
		if (action === 'add') {
			newErrorMessages = addErrorMessage(this.state.errors, key, text);
		} else if (action === 'remove') {
			newErrorMessages = removeErrorMessage(this.state.errors, key);
		} else {
			throw new Error(': Action must either be a string of \'add\' or \'remove.\'');
		}
		this.setState({
			errors: newErrorMessages,
			showErrors: newErrorMessages.length > 0
		});
	}

	verifyFileType(file) {
		return accepts(file, this.props.accept);
	}

	handleRemoveFile(index) {
		if (this.props.singleFile) {
			let file = this.state.file;
			let validity = this.props.required ? false : true;
			if (!validity) {
				let message = 'This is a required field.';
				this.updateErrorMessages('add', 'filesRequired', message);
			} else {
				this.updateErrorMessages('remove', 'filesRequired', null);
			}
			this.updateErrorMessages('remove', 'maxFilesExceeded', null);
			let input = {
				name: this.props.name,
				value: {},
				valid: validity,
				form: this.state.form,
				initial: false
			}
			FormActions.addInput(input);
			this.setState({
				file: {},
				valid: validity
			})
		} else {
			let files = this.state.files;
			files.splice(index, 1);
			let validity = this.props.required ? (files.length >= this.props.required ? true : false) : true;
			if (!validity) {
				let message = this.props.required > 1 ? `At least ${this.props.required} files are required.` : `At least 1 file is required.`;
				this.updateErrorMessages('add', 'filesRequired', message);
			} else {
				this.updateErrorMessages('remove', 'filesRequired', null);
			}
			this.updateErrorMessages('remove', 'maxFilesExceeded', null);
			let input = {
				name: this.props.name,
				value: files,
				valid: validity,
				form: this.state.form,
				initial: false
			}
			FormActions.addInput(input);
			this.setState({
				files: files,
				valid: validity
			})
		}
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

	toggleFileList(e) {
		if (e) {
			e.preventDefault();
		}
		this.setState({
			showFileList: !this.state.showFileList
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
			'show': this.state.showErrors,
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
					<label htmlFor={this.props.name}>Browse Files...</label>
					<div className="file-count">{this.props.singleFile ? (this.state.file.name ? 1 : 0) : this.state.files.length || 0}{this.props.required ? '/' : ''}
						{this.props.singleFile && this.props.required ? 1 : (!this.props.singleFile && this.props.required ? this.props.required : '')}</div>
					<input type="file" name={this.props.name} id={this.props.name} onChange={this.validateFiles} onClick={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur} accept={this.props.accept} multiple={this.props.multiple}/>
				</div>
				<div className="file-info">
					<div className={fileContainerClasses}>
						<button className="button info toggle-list" onClick={this.toggleFileList}>
							{ this.state.showFileList ? <span className="fa fa-minus"></span> : <span className="fa fa-plus"></span>} { this.state.showFileList ? 'Hide File List' : 'Show File List'}
						</button>
						{
							!this.props.singleFile &&this.state.files.length < 1 && this.state.showFileList ||
							this.props.singleFile && !this.state.file.name && this.state.showFileList ?
							<div className="help-text">Click above to browse for files or drag & drop files</div> :
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
 			 								{this.state.files.map((file, i) => <tr key={i} {...file} >
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
	name: React.PropTypes.string.isRequired,
	fileName: React.PropTypes.string,
	validateMessage: React.PropTypes.string,
	handleFileUpload: React.PropTypes.func.isRequired,
	accept: React.PropTypes.string,
	singleFile: React.PropTypes.bool.isRequired,
	multiple: React.PropTypes.bool,
	maxFiles: React.PropTypes.number,
	minSize: React.PropTypes.number,
	maxSize: React.PropTypes.number,
	required: React.PropTypes.number,
	disabled: React.PropTypes.bool
}
