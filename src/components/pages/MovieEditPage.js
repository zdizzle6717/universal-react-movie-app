import React from 'react';
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
            newMovie: false,
			showNewDirector: false
        }

		this.onMovieChange = this.onMovieChange.bind(this);
		this.onDirectorChange = this.onDirectorChange.bind(this);
		this.toggleNewDirector = this.toggleNewDirector.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDirectorChange = this.handleDirectorChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

	componentWillMount() {
		MovieStore.addChangeListener(this.onMovieChange);
		DirectorStore.addChangeListener(this.onDirectorChange);
	}

    componentDidMount() {
        document.title = "React Movie App | Edit Movie";
		if (this.props.params.movieId) {
			MovieActions.getMovie(this.props.params.movieId).catch(() => {
				this.showAlert('movieNotFound');
				browserHistory.push('/movies');
			});
			DirectorActions.getDirectors()
		} else {
			this.setState({
				newMovie: true
			});
		}
    }

	componentWillUnmount() {
		MovieStore.removeChangeListener(this.onMovieChange);
		DirectorStore.removeChangeListener(this.onDirectorChange);
	}

	onMovieChange() {
		this.setState({
			movie: MovieStore.getMovie(this.props.params.movieId)
		});
	}

	onDirectorChange() {
		this.setState({
			directors: DirectorStore.getDirectors()
		});
	}

	toggleNewDirector(e) {
		e.preventDefault();
		this.setState({
			showNewDirector: !this.state.showNewDirector
		})
	}

	handleInputChange(e) {
		let movie = this.state.movie;
		movie[e.target.name] = e.target.value;
		this.setState({
			movie: movie
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

	handleFileUpload(e) {
		let movie = this.state.movie;
		if (e.target.files.length > 0) {
			movie[e.target.name] = e.target.files[0].name;
			this.setState({
				movie: movie
			})
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		let self = this;
		let movie = this.state.movie;
		let director = this.state.director;
		let newMovie = this.state.newMovie;
		if (this.state.showNewDirector) {
			DirectorActions.createDirector(director).then((response) => {
				console.log(response);
				movie.DirectorId = response.id;
				saveMovie(movie, newMovie);
			})
		} else {
			saveMovie(movie, newMovie);
		}

		function saveMovie(movie, newMovie) {
			if (newMovie) {
				MovieActions.createMovie(movie).then(() => {
					self.showAlert('movieCreated');
					browserHistory.push('/movies/edit/' + movie.id);
				});
			} else {
				MovieActions.updateMovie(movie.id, movie).then(() => {
					self.showAlert('movieUpdated');
					browserHistory.push('/movies');
				});
			}
		}
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
			    <h1>ReactJs, Hapi.js & PostgreSQL</h1>
			    <h3 className="push-bottom-2x">Dynamic Movie App:
					<strong className="animate"> {this.state.newMovie ? 'Add New Movie' : `Edit Movie (ID: ${this.state.movie.id})`}</strong>
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
											<Input type="text" name="directorfirstName" value={this.state.director.firstName} handleInputChange={this.handleInputChange} validate="name" required={true}/>
					                    </label>
					                </div>
					                <div className="medium-6 columns">
					                    <label className="required">Last Name
											<Input type="text" name="directorlastName" value={this.state.director.lastName} handleInputChange={this.handleInputChange} validate="name" required={true}/>
					                    </label>
					                </div>
					            </div>
					            <div className="row">
					                <div className="medium-12 columns">
					                    <label className="required">Bio
					                        <TextArea name="directorBio" value={this.state.director.bio} handleInputChange={this.handleInputChange} placeholder="Enter a director biography..." rows="2" required={true}/>
					                    </label>
					                </div>
					            </div>
					        </fieldset>
						</div>
					}
			        <div className="row">
			            <div className="medium-4 columns">
			                <label className="required">Year
								<Input type="number" name="year" value={this.state.movie.year} handleInputChange={this.handleInputChange} validate="numbersOnly" required={true}/>
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
			                <label>Movie Cover Upload
			                    <FileUpload name="movieCover" value={this.state.movie.coverImg} handleFileUpload={this.handleFileUpload} multiple={false} accept="image/*"></FileUpload>
			                </label>
			            </div>
			            <div className="medium-6 columns">
			                <label className="required">Cover Image Name
			                    <input type="text" value={this.state.movie.coverImg} placeholder="" disabled required />
			                </label>
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
		);
    }
}
