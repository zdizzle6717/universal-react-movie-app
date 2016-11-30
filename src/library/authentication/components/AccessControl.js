'use strict';

import React from 'react';
import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

export default class AccessControl extends React.Component {

	constructor() {
		super();

		this.state = {
			authorized: false
		}

		this.onUserChange = this.onUserChange.bind(this);
	}

	componentWillMount() {
		this.setState({
			authorized: UserStore.checkAuthorization(this.props.access)
		});
		UserStore.addChangeListener(this.onUserChange);
	}

	componentWillUnmount() {
		UserStore.removeChangeListener(this.onUserChange);
	}

	onUserChange() {
		this.setState({
			authorized: UserStore.checkAuthorization(this.props.access)
		});
	}

	render() {
		return (
			<div className="access-control">
				{ this.state.authorized && this.props.children }
			</div>
		)
	}
}
