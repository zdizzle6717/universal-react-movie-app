'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import AlertActions from '../library/alerts/actions/AlertActions';
import TopNav from './pieces/TopNav';
import Alerts from '../library/alerts'
import { Loader, LoaderActions, LoaderStore } from '../library/loader';
import Animation from 'react-addons-css-transition-group';
import UserStore from '../library/authentication/stores/UserStore';
import UserActions from '../library/authentication/actions/UserActions';

let timer;
let numLoadings = 0;
let _timeout = 350;

// Global axios config
axios.defaults.baseURL = 'http://www.react.zackanselm.com:8080/api/';

// Global axios interceptor
axios.interceptors.request.use(function (config) {
	numLoadings++;

	let token = UserStore.getUser().id_token;

	if (token) {
	    config.headers.authorization = 'Bearer ' + token;
	}

	if (numLoadings < 2) {
		timer = setTimeout(() => {
			LoaderActions.showLoader();
		}, _timeout);
	}

    return config;
});
axios.interceptors.response.use(function (response) {
	if (numLoadings === 0) { return response; }

	if (numLoadings < 2) {
		clearTimeout(timer);
		LoaderActions.hideLoader();
	}
	numLoadings--;
    return response;
}, (error) => {
	if (error.response.data.statusCode === 401) {
		AlertActions.addAlert({
			show: true,
			title: 'Not Authenticated',
			message: 'Please login or register to continue.',
			type: 'info',
			delay: 3000
		});
		UserStore.setRedirectRoute(location.pathname);
		browserHistory.push('/login');
	}
	if (numLoadings === 0) {
		return error.response;
	}

	if (numLoadings < 2) {
		clearTimeout(timer);
		LoaderActions.hideLoader();
	}
	numLoadings--;

	return Promise.reject(error.response.data);
});

export default class Layout extends React.Component {
	constructor() {
        super();

        this.state = {
            showLoader: false
        }

		this.onChange = this.onChange.bind(this);
    }

	componentWillMount() {
        LoaderStore.addChangeListener(this.onChange);
		if (typeof sessionStorage !== 'undefined') {
			let storedUser = JSON.parse(sessionStorage.getItem('user'));
			if (storedUser) {
				UserActions.setUser(storedUser);
			}
		}
    }

	componentWillUnmount() {
        LoaderStore.removeChangeListener(this.onChange);
    }

    onChange() {
		this.setState({
            showLoader: LoaderStore.getLoader()
        });
    }

	render() {
		let path = this.props.location.pathname;

		return (
			<div>
				<header>
				    <TopNav></TopNav>
				</header>
					<Animation transitionName="view" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500} component='div' className='content-container'>
						{React.cloneElement(this.props.children, { key: path })}
					</Animation>
					<Alerts></Alerts>
					<Loader loading={this.state.showLoader}></Loader>
				<footer>ReactJs app with server side routing and RESTful API built on HapiJS and PostgreSQL</footer>
			</div>
		);
	}
}
