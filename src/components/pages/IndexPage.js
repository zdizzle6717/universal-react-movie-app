'use strict';

import React from 'react';
import AlertActions from '../../library/alerts/actions/AlertActions';
import Modal from '../../library/modal';
import MovieRow from '../pieces/MovieRow';
import MovieActions from '../../actions/MovieActions';
import MovieStore from '../../stores/MovieStore';
import DirectorRow from '../pieces/DirectorRow';
import DirectorActions from '../../actions/DirectorActions';
import DirectorStore from '../../stores/DirectorStore';

export default class IndexPage extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: [],
			directors: [],
			movieModalIsOpen: false,
			directorModalIsOpen: false,
			modalData: {}
        }
        this.onChange = this.onChange.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }

    componentWillMount() {
        MovieStore.addChangeListener(this.onChange);
        DirectorStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "React Movie App | Home";
        MovieActions.getMovies();
        DirectorActions.getDirectors();
    }

    componentWillUnmount() {
        MovieStore.removeChangeListener(this.onChange);
        DirectorStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
			movies: MovieStore.getMovies(),
			directors: DirectorStore.getDirectors(),
		})
    }

	removeMovie(id) {
		MovieActions.removeMovie(id).then(() => {
			this.showAlert('movieDeleted');
		});
	}

	removeDirector(id) {
		DirectorActions.removeDirector(id).then(() => {
			this.showAlert('directorDeleted');
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
			},
			'directorDeleted': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Director Deleted',
					message: 'A director was successfully deleted.',
					type: 'info',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

	openModal(data, type) {
		this.setState({
			modalData: data
		})
		this.toggleModal(type);
	}

	toggleModal(type) {
		if (type === 'movie') {
			this.setState({
				movieModalIsOpen: !this.state.movieModalIsOpen
			});
		}
		if (type === 'director') {
			this.setState({
				directorModalIsOpen: !this.state.directorModalIsOpen
			});
		}
	}

	handleModalSubmit(type) {
		if (type === 'movie') {
			this.removeMovie(this.state.modalData.id);
		}
		if (type === 'director') {
			this.removeDirector(this.state.modalData.id);
		}
		this.toggleModal(type);
	}

    render() {
		return (
			<div className="row">
				<div className="small-12 columns push-bottom-4x">
					<h1>ReactJs, Hapi.js, PostgreSQL</h1>
				    <h5 className="text-justify">This <strong>S</strong>ingle <strong>P</strong>age <strong>A</strong>pplication demonstrates the rapid speed of a ReactJs frontend and a <strong>REST</strong>ful API.
				    The site is hosted on an <strong>A</strong>mazon <strong>W</strong>eb <strong>S</strong>ervices EC2 server running <strong>nginx</strong> on an Ubuntu 16.0.4 OS. This particular stack utilizes <strong>hapi.js</strong> with a <strong>postgreSQL</strong> database
				     for an effectively scaleable, team-compatible <strong>API</strong>.  The front-end is rendered on the server side allowing for unique meta data respective to each page and excellent SEO.</h5>
				</div>
			    <div className="small-12 columns push-bottom-4x">
					<h4 className="push-bottom-2x">Movies</h4>
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
							{this.state.movies.map((movie, i) =>
	  						  <MovieRow key={i} {...movie} removeMovie={this.openModal.bind(this, movie, 'movie')} synopsis={movie.synopsis.substring(0, 70) + '...'} fullName={movie.Director.firstName + ' ' + movie.Director.lastName}></MovieRow>
	  					  )}
			            </tbody>
			        </table>
			    </div>
				<div className="small-12 columns push-bottom-4x">
					<h4 className="push-bottom-2x">Directors</h4>
                    <table className="stack hover text-center">
                        <thead>
                            <tr>
                                <th className="text-center" width="200">FirstName</th>
                                <th className="text-center" width="150">LastName</th>
                                <th className="text-center">Bio</th>
                                <th className="text-center" width="150">View/Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.directors.map((director, i) => <DirectorRow
								key={i} {...director}
								bio={director.bio.substring(0, 70) + '...'}
								removeDirector={this.openModal.bind(this, director, 'director')}
							></DirectorRow>)}
                        </tbody>
                    </table>
                </div>
				<Modal name="movieModal" modalIsOpen={this.state.movieModalIsOpen} handleSubmit={this.handleModalSubmit.bind(this, 'movie')} handleClose={this.toggleModal.bind(this, 'movie')} title="Remove Movie">Are you sure you want to delete {this.state.modalData.title}'s data'?</Modal>
				<Modal name="directorModal" modalIsOpen={this.state.directorModalIsOpen} handleSubmit={this.handleModalSubmit.bind(this, 'director')} handleClose={this.toggleModal.bind(this, 'director')} title="Remove Contact">Are you sure you want to delete {this.state.modalData.firstName} {this.state.modalData.lastName}?</Modal>
			</div>
	    );
	}
}
