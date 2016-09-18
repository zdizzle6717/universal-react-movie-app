import React from 'react';
import { Link } from 'react-router'

export default class MovieRow extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.title}</td>
				<td>{this.props.year}</td>
				<td>{this.props.synopsis}</td>
				<td>{this.props.fullName}</td>
				<td className="text-center">
					<div className="action-buttons">
						<Link key="movie" to={`/movies/${this.props.id}`} className="action"><i className="fa fa-search"></i></Link>
						<Link key="movieEdit" to={`/movies/edit/${this.props.id}`} className="action"><i className="fa fa-pencil-square-o"></i></Link>
						<a className="action"><i className="fa fa-times"></i></a>
					</div>
				</td>
			</tr>
		)
	}
}
