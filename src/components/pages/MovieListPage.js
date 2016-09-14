import React from 'react';
import { Link } from 'react-router';
import MovieRow from '../pieces/MovieRow';
import movies from '../../data/movies';

export default class MovieListPage extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
  	  document.title = "React Movie App | Movies";
    }

  render() {
    return (
		<div className="row">
  	      <h1>ReactJs, Hapi.js & PostgreSQL</h1>
  	      <h3 className="push-bottom-2x">Dynamic Movie App: <strong>All Movies</strong></h3>
  	      <div className="row">
  	          <div className="small-12 medium-4 large-4 columns">
  	              <button type="button" className="button small-12 large-6"><i className="fa fa-plus"></i> Add New Movie</button>
  	          </div>
  	          <div className="small-12 medium-4 large-4 columns medium-offset-4 large-offset-4">
  	              <input type="search" placeholder="Enter search terms..." />
  	          </div>
  	      </div>
  	      <div className="small-12">
  	          <p className="filterCount"></p>
  	          <table className="stack hover text-center">
  	              <thead>
  	                  <tr>
  	                      <th className="text-center" width="200">Title</th>
  	                      <th className="text-center" width="150">Year</th>
  	                      <th className="text-center">Synopsis</th>
  	                      <th className="text-center" width="250">Directed By</th>
  	                      <th className="text-center" width="150">View/Edit</th>
  	                  </tr>
  	              </thead>
  	              <tbody>
  	                  {movies.map((movie, i) =>
						  <MovieRow key={i} {...movie} synopsis={movie.synopsis.substring(0, 70) + '...'} fullName={movie.Director.firstName + ' ' + movie.Director.lastName}></MovieRow>
					  )}
  	              </tbody>
  	          </table>
  	      </div>
  	      <div className="small-12 medium-6 large-3 medium-offset-6 large-offset-9 text-right">
  	          <label>Sort by:
  	              <select id="orderParams">
  	                  <option value="title">Title</option>
  	                  <option value="year">Year</option>
  	                  <option value="Director.lastName">Director</option>
  	                  <option value="-createdAt">Date of Entry</option>
  	                  <option value="-updatedAt">Last Updated</option>
  	              </select>
  	          </label>
  	      </div>
  	  </div>
    );
  }
}
