'use strict';

import React from 'react';
import { Router, browserHistory } from 'react-router';
import AlertActions from '../library/alerts/actions/AlertActions';
import routes from '../routes';
import UserStore from '../library/authentication/stores/UserStore';

export default class AppRoutes extends React.Component {
	constructor() {
		super();

		this.state = {
			authenticated: false
		}

		this.onUserChange = this.onUserChange.bind(this);
		this.onViewChange = this.onViewChange.bind(this);
		this.showAlert = this.showAlert.bind(this);
	}

	componentWillMount() {
		UserStore.addChangeListener(this.onUserChange);
		setTimeout(() => {
			let viewListener = browserHistory.listen((location) => {
				this.onViewChange(location);
			});
		});
	}

	onViewChange(location) {
		let restrictedRoutes = [
			'/directors/edit/',
			'/directors/create',
			'/movies/edit/',
			'/movies/create'
		]
		if (!this.state.authenticated) {
			restrictedRoutes.forEach((route) => {
				if (location.pathname.indexOf(route) !== -1) {
					this.showAlert('notAuthenticated');
					UserStore.setPreviousRoute(location.pathname);
					browserHistory.push('/login');
				}
			})
		}
	}

	onUserChange() {
		this.setState({
			authenticated: UserStore.checkAuthentication()
		})
	}

	componentWillUnmount() {
		viewListener();
		UserStore.removeChangeListener(this.onUserChange);
	}

	showAlert(selector) {
		const alerts = {
			'notAuthenticated': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Not Authenticated',
					message: 'Please login or register to continue.',
					type: 'info',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

	render() {
		return (
			<Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
		);
	}
}
