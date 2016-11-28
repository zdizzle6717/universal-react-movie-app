'use strict';

import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

export default class TopNav extends React.Component {
	constructor() {
		super();

		this.state = {
			showMobileMenu: false
		}

		this.toggleMenu = this.toggleMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
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
						<li className="login-link">
							<Link key="login" to="/login" className="menu-link" activeClassName="active">Login/Register</Link>
						</li>
					</ul>
				</div>
				<div className={backdropClasses} onClick={this.closeMenu}></div>
			</div>
	    );
	}
}
