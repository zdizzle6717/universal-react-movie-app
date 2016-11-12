'use strict';

import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import TopNav from './pieces/TopNav';
import Alerts from '../library/alerts'
import { Loader, LoaderActions, LoaderStore } from '../library/loader';
import Animation from 'react-addons-css-transition-group';

let timer;
let numLoadings = 0;
let _timeout = 350;

// Global axios interceptor
axios.interceptors.request.use(function (config) {
	numLoadings++;

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
	if (numLoadings === 0) { return error; }

	if (numLoadings < 2) {
		clearTimeout(timer);
		LoaderActions.hideLoader();
	}
	numLoadings--;
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
