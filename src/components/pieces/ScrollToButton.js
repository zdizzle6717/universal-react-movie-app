'use strict';

import React from 'react';
import { Link } from 'react-router'

export default class ScrollToButton extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.title}</td>
				<td>{this.props.year}</td>
				<td>{this.props.synopsis}</td>
				<td>{this.props.fullName}</td>
				<td className="text-center">
					<div className="action-buttons">
						<Link key="movie" to={`/movies/view/${this.props.id}`} className="action"><i className="fa fa-search"></i></Link>
						<AccessControl access={['movieAdmin', 'siteAdmin']}>
							<Link key="movieEdit" to={`/movies/edit/${this.props.id}`} className="action"><i className="fa fa-pencil-square-o"></i></Link>
						</AccessControl>
						<AccessControl access={['movieAdmin', 'siteAdmin']}>
							<a className="action"><i className="fa fa-times" onClick={this.props.removeMovie}></i></a>
						</AccessControl>
					</div>
				</td>
			</tr>
		)
	}
}
