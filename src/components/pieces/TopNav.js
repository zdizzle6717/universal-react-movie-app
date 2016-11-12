import React from 'react';
import { Link } from 'react-router';

export default class TopNav extends React.Component {
  render() {
    return (
		<ul className="menu">
			<li className="menu-text home-link">
				<Link key="home" to="/" className="home-link" activeClassName="active">React & Hapi Js Demo</Link>
				<a className="menu-toggle">
					<i className="fa fa-bars"></i>
				</a>
			</li>
			<li className="animate untoggled">
				<Link key="movies" to="/movies" activeClassName="active">Movies</Link>
			</li>
			<li className="animate untoggled">
				<Link key="directors" to="/directors" activeClassName="active">Directors</Link>
			</li>
			<li className="animate untoggled">
				<a href="http://www.react.zackanselm.com:8080/api/documentation" target="_blank">Api Guide</a>
			</li>
			<li className="animate untoggled">
				<a href="https://github.com/zdizzle6717/universal-react-movie-app" target="_blank">Git</a>
			</li>
		</ul>
    );
  }
}
