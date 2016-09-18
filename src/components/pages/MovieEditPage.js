import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';
import movies from '../../data/movies';

export default class MoviePage extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
  	  document.title = "React Movie App | Movie Edit";
    }

  render() {
	  let newMovie = false;
	  let routeId = this.props.params.movieId;
	  let movie = movies.filter((movie) => movie.id == routeId)[0];
	  if (!movie) {
		  movie = {};
		  newMovie = true;
	  }
    return (
		<div className="row">
		    <h1>ReactJs, Hapi.js & PostgreSQL</h1>
		    <h3 className="push-bottom-2x">Dynamic Movie App:
		        <strong className="animate">Add New Movie</strong>
		        <strong className="animate">Edit Movie (ID: {movie.id})</strong>
		    </h3>

		    <form name="movieForm" novalidate>
		        <div className="row">
		            <div className="medium-4 columns">
		                <label className="required">Title
		                    <input type="text" value={movie.title} placeholder="" required />
		                </label>
		            </div>
		            <div className="medium-4 columns">
		                <label className="required">Director ID
		                    <select value={movie.DirectorId}></select>
		                </label>
		            </div>
		            <div className="medium-1 columns text-center">
		                <strong>-OR-</strong>
		            </div>
		            <div className="medium-3 columns text-center">
		                <label className="hidden">Spacer</label>
		                <button className="button small-12"><i className="fa fa-plus"></i><i className="fa fa-minus"></i> Add New Director</button>
		            </div>
		        </div>
		        <fieldset className="small-12 columns animate">
		            <legend>Director Info</legend>
		            <div className="row">
		                <div className="medium-6 columns">
		                    <label className="required">First Name
		                        <input type="text" value={movie.Director.firstName} placeholder="" required />
		                    </label>
		                </div>
		                <div className="medium-6 columns">
		                    <label className="required">Last Name
		                        <input type="text" value={movie.Director.lastName} placeholder="" required />
		                    </label>
		                </div>
		            </div>
		            <div className="row">
		                <div className="medium-12 columns">
		                    <label className="required">Bio
		                        <textarea value={movie.Director.bio} placeholder="" rows="2" required></textarea>
		                    </label>
		                </div>
		            </div>
		        </fieldset>
		        <div className="row">
		            <div className="medium-4 columns">
		                <label className="required">Year
		                    <input type="number" value={movie.year} placeholder="" min="1800" max="3000" required />
		                </label>
		            </div>
		            <div className="medium-4 columns">
		                <label className="required">Genre
		                    <input type="text" value={movie.genre} placeholder="" required />
		                </label>
		            </div>
		            <div className="medium-4 columns">
		                <label className="required">Rating
		                    <input type="number" value={movie.rating} placeholder="" min="1" max="5" required />
		                </label>
		            </div>
		        </div>
		        <div className="row">
		            <div className="medium-6 columns">
		                <label className="required">Movie Cover Upload
		                    <div file-upload ratio="334:500" model="movie.coverImg" param="'movies'"></div>
		                </label>
		            </div>
		            <div className="medium-6 columns">
		                <label className="required">Cover Image Name
		                    <input type="text" value={movie.coverImg} placeholder="" disabled required />
		                </label>
		            </div>
		        </div>
		        <div className="row">
		            <div className="medium-12 columns">
		                <label className="required">Synopsis
		                    <textarea value={movie.synopsis} placeholder="Enter a condensed plot summary..." rows="2" required></textarea>
		                </label>
		            </div>
		        </div>
		        <div className="row">
		            <div className="medium-12 columns">
		                <label className="required">Plot/Description
		                    <textarea value={movie.description} placeholder="Enter a full description of extended plot summary..." rows="4" required></textarea>
		                </label>
		            </div>
		        </div>
		        <div className="row text-right">
		            <div className="medium-12 columns">
		                <div className="button animate" type="button">Add New Movie</div>
		                <div className="button animate" type="button">Update Movie</div>
		            </div>
		        </div>
		    </form>
		</div>

    );
  }
}
