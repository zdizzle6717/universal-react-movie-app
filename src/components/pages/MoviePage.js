import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';
import movies from '../../data/movies';

export default class MoviePage extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
  	  document.title = "React Movie App | Movie";
    }

  render() {
	  let routeId = this.props.params.movieId;
	  let movie = movies.filter((movie) => movie.id == routeId)[0];
	  if (!movie) {
		  return <NotFoundPage/>;
	  }
    return (
		<div className="row">
		    <h1>ReactJs, Hapi.js & PostgreSQL</h1>
		    <h3 className="push-bottom-2x">Dynamic Movie App: <strong>{movie.title}</strong></h3>
		    <h5>ID: {movie.id} | Director: {movie.Director.firstName} {movie.Director.lastName} | {movie.year} | {movie.genre} |
		        {movie.rating}<i className="fa fa-star"></i>
		    </h5>
			<div className="medium-3 columns">
				<a href={`/uploads/movies/${movie.coverImg}`} target="_blank"><img src={`/uploads/movies/${movie.coverImg}`}/></a>
			</div>
			<div className="medium-9 columns">
				<label><u>Storyline</u></label>
				<p className="text-justify">
					{movie.description}
				</p>
			</div>
		</div>
    );
  }
}
