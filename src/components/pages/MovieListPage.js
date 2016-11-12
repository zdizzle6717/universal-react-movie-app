'use strict';

import React from 'react';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import AlertActions from '../../library/alerts/actions/AlertActions';
import Modal from '../../library/modal';
import MovieRow from '../pieces/MovieRow';
import MovieActions from '../../actions/MovieActions';
import MovieStore from '../../stores/MovieStore';

export default class MovieListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            movies: [],
			movieModalIsOpen: false,
			modalData: {}
        }
        this.onChange = this.onChange.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

	componentWillMount() {
		MovieStore.addChangeListener(this.onChange);
	}

    componentDidMount() {
        document.title = "React Movie App | Movies";
        MovieActions.getMovies();
    }

	componentWillUnmount() {
		MovieStore.removeChangeListener(this.onChange);
	}

	onChange() {
		this.setState({
			movies: MovieStore.getMovies()
		})
	}

	removeMovie(id) {
		MovieActions.removeMovie(id).then(() => {
			this.showAlert('movieDeleted');
		});
	}

	showAlert(selector) {
		const alerts = {
			'movieDeleted': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Movie Deleted',
					message: 'A movie was successfully deleted.',
					type: 'info',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

	openModal(data) {
		this.setState({
			modalData: data
		})
		this.toggleModal();
	}

	toggleModal() {
		this.setState({
			movieModalIsOpen: !this.state.movieModalIsOpen
		});
	}

	handleModalSubmit() {
		this.removeMovie(this.state.modalData.id);
		this.toggleModal();
	}

	handleSort(e) {
		let searchParam = e.target.value;
		let movies = this.state.movies;
		let newOrder = movies.sort(function(a, b) {
			a = a[searchParam].toLowerCase();
			b = b[searchParam].toLowerCase();
		    if(a < b) return -1;
		    if(a > b) return 1;
		    return 0;
		});
		this.setState({
			movies: newOrder
		})
	}

	handleFilter(e) {
		let searchParam = e.target.value.toLowerCase();
		let movies = MovieStore.getMovies();
		let filteredMovies = movies.filter((movie) => {
			if (JSON.stringify(movie).toLowerCase().indexOf(searchParam) > -1) {
				return true;
			} else {
				return false;
			};
		});
		this.setState({
			movies: filteredMovies
		});
	}

    render() {
        return (
			<div>
				<div className="row">
					<div className="small-12 columns">
						<h1>ReactJs, Hapi.js & PostgreSQL</h1>
		                <h3 className="push-bottom-2x">All Movies</h3>
					</div>
				</div>
	            <div className="row">
	                <div className="small-12 medium-6 large-6 columns">
						<Link key="createMovie" to="/movies/create">
							<button type="button" className="button primary small-12 medium-8 large-6">
	                            <i className="fa fa-plus"></i> Add New Movie</button>
						</Link>
	                </div>
	                <div className="small-12 medium-6 columns">
						<div className="small-12 medium-8 medium-offset-4 large-6 large-offset-6">
							<div className="search-input">
								<input type="search" placeholder="Enter search terms..." onChange={this.handleFilter}/>
								<span className="fa fa-search search-icon"></span>
							</div>
						</div>
	                </div>
	            </div>
				<div className="row">
	                <div className="small-12 columns">
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
	                            {this.state.movies.map((movie, i) => <MovieRow
									key={i} {...movie}
									synopsis={movie.synopsis.substring(0, 70) + '...'}
									fullName={movie.Director.firstName + ' ' + movie.Director.lastName}
									removeMovie={this.openModal.bind(this, movie)}
								></MovieRow>)}
	                        </tbody>
	                    </table>
	                </div>
	                <div className="small-12 medium-6 large-3 medium-offset-6 large-offset-9 columns text-right">
	                    <label>Sort by:
	                        <select id="orderParams" onChange={this.handleSort}>
	                            <option value="title">Title</option>
	                            <option value="year">Year</option>
	                            <option value="createdAt">Date of Entry</option>
	                            <option value="updatedAt">Last Updated</option>
	                        </select>
	                    </label>
	                </div>
					<Modal key="movieModal" name="movieModal" modalIsOpen={this.state.movieModalIsOpen} handleSubmit={this.handleModalSubmit.bind(this)} handleClose={this.toggleModal.bind(this)} title="Remove Movie">Are you sure you want to delete {this.state.modalData.title}'s data'?</Modal>
	            </div>
			</div>
        );
    }
}
