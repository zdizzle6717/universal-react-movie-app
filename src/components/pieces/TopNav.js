'use strict';

import React from 'react';
import classNames from 'classnames';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Link, browserHistory } from 'react-router';
import UserStore from '../../library/authentication/stores/UserStore';
import UserActions from '../../library/authentication/actions/UserActions';

export default class TopNav extends React.Component {
	constructor() {
		super();

		this.state = {
			authenticated: false,
			showMobileMenu: false
		}

		this.onUserChange = this.onUserChange.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentWillMount() {
		this.setState({
			authenticated: UserStore.checkAuthentication()
		});
		UserStore.addChangeListener(this.onUserChange);
	}

	componentWillUnmount() {
		UserStore.removeChangeListener(this.onUserChange);
	}

	onUserChange() {
		this.setState({
			authenticated: UserStore.checkAuthentication()
		});
	}

	toggleMenu() {
		this.setState({
			showMobileMenu: !this.state.showMobileMenu
		});
	}

	closeMenu() {
		this.setState({
			showMobileMenu: false
		});
	}

	logout() {
		UserActions.logout();
		this.setState({
			authenticated: false
		})
		this.showAlert('logoutSuccess')
		browserHistory.push('/');
	}

	showAlert(selector) {
		const alerts = {
			'logoutSuccess': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Logout Success',
					message: 'You have been successfully logged out.',
					type: 'success',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

	render() {
		let menuClasses = classNames({
			'menu-group': true,
			'show': this.state.showMobileMenu
		})

		let backdropClasses = classNames({
			'menu-backdrop': true,
			'show': this.state.showMobileMenu
		})

	    return (
			<div className="nav">
				<div className="home-link">
					<Link key="home" to="/" className="home-link" activeClassName="active" onClick={this.closeMenu}>React & Hapi Js Demo</Link>
				</div>
				<div className="menu-toggle" onClick={this.toggleMenu}>
					<i className="fa fa-bars"></i>
				</div>
				<div className={menuClasses} onClick={this.closeMenu}>
					<ul className="main-menu">
						<li className="">
							<Link key="movies" to="/movies" className="menu-link" activeClassName="active">Movies</Link>
						</li>
						<li className="">
							<Link key="directors" to="/directors" className="menu-link" activeClassName="active">Directors</Link>
						</li>
						<li className="">
							<a href="http://www.react.zackanselm.com:8080/api/documentation" target="_blank">Api Guide</a>
						</li>
						<li className="">
							<a href="https://github.com/zdizzle6717/universal-react-movie-app" target="_blank">Git</a>
						</li>
					</ul>
					<ul className="login-menu">
						{
							this.state.authenticated ?
							<li className="login-link">
								<a className="menu-link" onClick={this.logout}>Logout</a>
							</li> :
							<li className="login-link">
								<Link key="login" to="/login" className="menu-link" activeClassName="active">Login/Register</Link>
							</li>
						}
					</ul>
				</div>
				<div className={backdropClasses} onClick={this.closeMenu}></div>
			</div>
	    );
	}
}
