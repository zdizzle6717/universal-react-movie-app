'use strict';

import React from 'react';
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

export default class Form extends React.Component {
	constructor() {
        super();

		this.state = {
			valid: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
    }

	componentWillMount() {
		FormStore.addChangeListener(this.onChange);
	}

	componentDidMount() {

	}

	componentWillUnmount() {
		FormStore.removeChangeListener(this.onChange);
	}

	onChange() {
		this.setState({
            valid: FormStore.getValidity()
        });
    }

	handleSubmit(e) {
		this.props.handleSubmit(e);
	}

	render() {
		return (
			<form name={this.props.name}>
				{this.props.children}
				<div className="row">
					<div className="form-group small-12 medium-6 columns">
						<button className="button info" onClick={this.handleSubmit} disabled={!this.state.valid}>{this.props.submitText}</button>
					</div>
				</div>
			</form>
		);
	}
}
