import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Form, Input, TextArea, Select, FileUpload } from '../../library/validations'
import MovieActions from '../../actions/MovieActions';
import MovieStore from '../../stores/MovieStore';
import DirectorActions from '../../actions/DirectorActions';
import DirectorStore from '../../stores/DirectorStore';

export default class MoviePage extends React.Component {
    constructor() {
        super();

        this.state = {
            movie: {},
			director: {},
			directors: [],
			file: {},
            newMovie: false,
			showNewDirector: false
        }

		this.onMovieChange = this.onMovieChange.bind(this);
		this.onDirectorsChange = this.onDirectorsChange.bind(this);
		this.toggleNewDirector = this.toggleNewDirector.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDirectorInputChange = this.handleDirectorInputChange.bind(this);
		this.handleDirectorChange = this.handleDirectorChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

	componentWillMount() {
		MovieStore.addChangeListener(this.onMovieChange);
		DirectorStore.addChangeListener(this.onDirectorsChange);
	}

    componentDidMount() {
        document.title = "React Movie App | Edit Movie";
		DirectorActions.getDirectors();
		if (this.props.params.movieId) {
			MovieActions.getMovie(this.props.params.movieId).catch(() => {
				this.showAlert('movieNotFound');
				browserHistory.push('/movies');
			});
		} else {
			this.setState({
				newMovie: true
			});
		}
    }

	componentWillUnmount() {
		MovieStore.removeChangeListener(this.onMovieChange);
		DirectorStore.removeChangeListener(this.onDirectorsChange);
	}

	onMovieChange() {
		this.setState({
			movie: MovieStore.getMovie(this.props.params.movieId)
		});
	}

	onDirectorsChange() {
		this.setState({
			directors: DirectorStore.getDirectors()
		});
	}

	toggleNewDirector(e) {
		e.preventDefault();
		if (this.state.showNewDirector) {
			this.setState({
				showNewDirector: !this.state.showNewDirector
			})
		} else {
			let movie = this.state.movie;
			movie.DirectorId = '';
			this.setState({
				showNewDirector: !this.state.showNewDirector,
				movie: movie
			})
		}
	}

	handleInputChange(e) {
		let movie = this.state.movie;
		movie[e.target.name] = e.target.value;
		this.setState({
			movie: movie
		})
	}

	handleDirectorInputChange(e) {
		let director = this.state.director;
		director[e.target.name] = e.target.value;
		this.setState({
			director: director
		})
	}

	handleDirectorChange(e) {
		let movie = this.state.movie;
		movie[e.target.name] = e.target.value;
		this.setState({
			movie: movie
		})
		if (e.target.value && this.state.showNewDirector) {
			this.setState({
				showNewDirector: false
			})
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		let self = this;
		let movie = this.state.movie;
		let director = this.state.director;
		let newMovie = this.state.newMovie;
		if (this.state.file.name) {
			this.uploadFile().then((response) => {
				movie.File.name = response.data.filename;
			}).then(() => {
				if (this.state.showNewDirector) {
					DirectorActions.createDirector(director).then(() => {
						movie.DirectorId = DirectorStore.getDirector().id;
						saveMovie(movie, newMovie);
					});
				} else {
					saveMovie(movie, newMovie);
				}
			})
		} else {
			if (this.state.showNewDirector) {
				DirectorActions.createDirector(director).then(() => {
					movie.DirectorId = DirectorStore.getDirector().id;
					saveMovie(movie, newMovie);
				});
			} else {
				saveMovie(movie, newMovie);
			}
		}

		function saveMovie(movie, newMovie) {
			if (newMovie) {
				MovieActions.createMovie(movie).then((response) => {
					self.showAlert('movieCreated');
					browserHistory.push('/movies');
				});
			} else {
				MovieActions.updateMovie(movie.id, movie).then(() => {
					self.showAlert('movieUpdated');
					browserHistory.push('/movies');
				});
			}
		}
	}

	handleFileUpload(files) {
		let movie = this.state.movie;
		movie.File = {
			name: files[0].name,
			size: files[0].size,
			type: files[0].type
		}
		this.setState({
			movie: movie,
			file: files[0]
		})
	}

	uploadFile() {
		let file = this.state.file;
		let data = new FormData();
		data.size = file.size;
		data.type = file.type;
		let config = {
				onUploadProgress: function(progressEvent) {
					let percentCompleted = progressEvent.loaded / progressEvent.total;
				}
			}
		data.append('file', file);
		return axios.post('http://www.react.zackanselm.com:8080/api/files/movies', data, config);
	}

	showAlert(selector) {
		const alerts = {
			'movieNotFound': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Movie Not Found',
					message: 'A movie with that ID was not found.',
					type: 'error',
					delay: 3000
				});
			},
			'movieCreated': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Movie Created',
					message: 'A new movie was successfully created.',
					type: 'success',
					delay: 3000
				});
			},
			'movieUpdated': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Director Updated',
					message: `${this.state.movie.title} was updated successfully.`,
					type: 'success',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

    render() {
        return (
			<div className="row">
				<div className="small-12 columns">
					<h1>ReactJs, Hapi.js & PostgreSQL</h1>
					<h3 className="push-bottom-2x">Dynamic Movie App:
						<strong className="animate"> {this.state.newMovie ? 'Add New Movie' : `Edit Movie (ID: ${this.state.movie.id || ''})`}</strong>
					</h3>

					<Form name="movieForm" submitText={this.state.newMovie ? 'Add New Movie' : 'Update Movie'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="medium-4 columns">
								<label className="required">Title
									<Input type="text" name="title" value={this.state.movie.title} handleInputChange={this.handleInputChange} validate="allCharacters" required={true}/>
								</label>
							</div>
							<div className="medium-4 columns">
								<label className="required">Director
									<Select name="DirectorId" value={this.state.movie.DirectorId} handleInputChange={this.handleDirectorChange} required={!this.state.showNewDirector}>
										<option value="">--Select--</option>
										{this.state.directors.map((director, i) => <option key={i} value={director.id}>{director.firstName} {director.lastName}</option>)}
									</Select>
								</label>
							</div>
							<div className="medium-1 columns text-center">
								<strong>-OR-</strong>
							</div>
							<div className="medium-3 columns text-center">
								<label className="hidden">Spacer</label>
								<button className="button primary small-12" onClick={this.toggleNewDirector}><i className={ this.state.showNewDirector ? 'fa fa-minus' : 'fa fa-plus' }></i> Add New Director</button>
							</div>
						</div>
						{
							this.state.showNewDirector &&
							<div className="row">
								<fieldset className="small-12 columns animate">
									<legend>Director Info</legend>
									<div className="row">
										<div className="medium-6 columns">
											<label className="required">First Name
												<Input type="text" name="firstName" value={this.state.director.firstName} handleInputChange={this.handleDirectorInputChange} validate="name" required={true}/>
											</label>
										</div>
										<div className="medium-6 columns">
											<label className="required">Last Name
												<Input type="text" name="lastName" value={this.state.director.lastName} handleInputChange={this.handleDirectorInputChange} validate="name" required={true}/>
											</label>
										</div>
									</div>
									<div className="row">
										<div className="medium-12 columns">
											<label className="required">Bio
												<TextArea name="bio" value={this.state.director.bio} handleInputChange={this.handleDirectorInputChange} placeholder="Enter a director biography..." rows="2" required={true}/>
											</label>
										</div>
									</div>
								</fieldset>
							</div>
						}
						<div className="row">
							<div className="medium-4 columns">
								<label className="required">Year
									<Input type="number" name="year" value={this.state.movie.year} handleInputChange={this.handleInputChange} min="1855" max="2555" validate="numbersOnly" required={true}/>
								</label>
							</div>
							<div className="medium-4 columns">
								<label className="required">Genre
									<Input type="text" name="genre" value={this.state.movie.genre} handleInputChange={this.handleInputChange} validate="allCharacters" required={true}/>
								</label>
							</div>
							<div className="medium-4 columns">
								<label className="required">Rating
									<Input type="number" name="rating" value={this.state.movie.rating} handleInputChange={this.handleInputChange} min="1" max="5" validate="numbersOnly" required={true}/>
								</label>
							</div>
						</div>
						<div className="row">
							<div className="medium-6 columns">
								<label>Movie Cover Upload</label>
								<FileUpload name="movieCover" value={this.state.movie.File} handleFileUpload={this.handleFileUpload} multiple={false} singleFile={true} maxSize={1} accept="image/*" required={1}></FileUpload>
							</div>

						</div>
						<div className="row">
							<div className="medium-12 columns">
								<label className="required">Synopsis
									<TextArea name="synopsis" value={this.state.movie.synopsis} handleInputChange={this.handleInputChange} placeholder="Enter a condensed plot summary..." rows="2" required={true} />
								</label>
							</div>
						</div>
						<div className="row">
							<div className="medium-12 columns">
								<label className="required">Plot/Description
									<TextArea name="description" value={this.state.movie.description} handleInputChange={this.handleInputChange} placeholder="Enter a full description of extended plot summary..." rows="4" required={true} />
								</label>
							</div>
						</div>
					</Form>
				</div>
			</div>
		);
    }
}
