import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';
import MovieActions from '../../actions/MovieActions';
import MovieStore from '../../stores/MovieStore';

export default class MoviePage extends React.Component {
    constructor() {
        super();

        this.state = {
            movie: {
                Director: {}
            },
            newMovie: false
        }

		this.onChange = this.onChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }

	componentWillMount() {
		MovieStore.addChangeListener(this.onChange);
	}

    componentDidMount() {
        document.title = "React Movie App | Edit Movie";
		if (this.props.params.movieId) {
			MovieActions.getMovie(this.props.params.movieId);
		} else {
			this.setState({
				newMovie: true
			});
		}
    }

	componentWillUnmount() {
		MovieStore.removeChangeListener(this.onChange);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.movieId) {
			MovieActions.getMovie(nextProps.params.movieId);
		}
	}

	onChange() {
		this.setState({
			movie: MovieStore.getMovie(this.props.params.movieId)
		})
	}

	handleInputChange(e) {
		let provider = this.state.provider;
		provider[e.target.name] = e.target.value;
		this.setState({
			provider: provider
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.newProvider) {
			ProviderActions.createProvider(this.state.provider).then(() => {
				browserHistory.push('/providers/edit/' + this.state.movie.id);
			});
		} else {
			ProviderActions.updateProvider(this.state.provider.id, this.state.provider).then((response) => {
				browserHistory.push('/providers');
			});
		}
	}

    render() {
        return (
			<div className="row">
			    <h1>ReactJs, Hapi.js & PostgreSQL</h1>
			    <h3 className="push-bottom-2x">Dynamic Movie App:
					<strong className="animate"> {this.state.newMovie ? 'Add New Movie' : `Edit Movie (ID: ${this.state.movie.id})`}</strong>
			    </h3>

			    <form name="movieForm" noValidate>
			        <div className="row">
			            <div className="medium-4 columns">
			                <label className="required">Title
			                    <input type="text" value={this.state.movie.title} placeholder="" required />
			                </label>
			            </div>
			            <div className="medium-4 columns">
			                <label className="required">Director ID
			                    <select value={this.state.movie.DirectorId}></select>
			                </label>
			            </div>
			            <div className="medium-1 columns text-center">
			                <strong>-OR-</strong>
			            </div>
			            <div className="medium-3 columns text-center">
			                <label className="hidden">Spacer</label>
			                <button className="button small-12"><i className='fa fa-plus'></i> Add New Director</button>
			            </div>
			        </div>
			        <fieldset className="small-12 columns animate">
			            <legend>Director Info</legend>
			            <div className="row">
			                <div className="medium-6 columns">
			                    <label className="required">First Name
			                        <input type="text" value={this.state.movie.Director.firstName} placeholder="" required />
			                    </label>
			                </div>
			                <div className="medium-6 columns">
			                    <label className="required">Last Name
			                        <input type="text" value={this.state.movie.Director.lastName} placeholder="" required />
			                    </label>
			                </div>
			            </div>
			            <div className="row">
			                <div className="medium-12 columns">
			                    <label className="required">Bio
			                        <textarea value={this.state.movie.Director.bio} placeholder="" rows="2" required></textarea>
			                    </label>
			                </div>
			            </div>
			        </fieldset>
			        <div className="row">
			            <div className="medium-4 columns">
			                <label className="required">Year
			                    <input type="number" value={this.state.movie.year} placeholder="" min="1800" max="3000" required />
			                </label>
			            </div>
			            <div className="medium-4 columns">
			                <label className="required">Genre
			                    <input type="text" value={this.state.movie.genre} placeholder="" required />
			                </label>
			            </div>
			            <div className="medium-4 columns">
			                <label className="required">Rating
			                    <input type="number" value={this.state.movie.rating} placeholder="" min="1" max="5" required />
			                </label>
			            </div>
			        </div>
			        <div className="row">
			            <div className="medium-6 columns">
			                <label className="required">Movie Cover Upload
			                    <div file-upload ratio="334:500" model="this.state.movie.coverImg" param="'movies'"></div>
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
			                    <textarea value={this.state.movie.synopsis} placeholder="Enter a condensed plot summary..." rows="2" required></textarea>
			                </label>
			            </div>
			        </div>
			        <div className="row">
			            <div className="medium-12 columns">
			                <label className="required">Plot/Description
			                    <textarea value={this.state.movie.description} placeholder="Enter a full description of extended plot summary..." rows="4" required></textarea>
			                </label>
			            </div>
			        </div>
			        <div className="row text-right">
			            <div className="medium-12 columns">
			                <div className="button animate" type="button">{this.state.newMovie ? 'Add New Movie' : 'Update Movie'}</div>
			            </div>
			        </div>
			    </form>
			</div>
		);
    }
}
