import React from 'react';
import { Link } from 'react-router';
import MovieActions from '../../actions/MovieActions';
import MovieStore from '../../stores/MovieStore';

export default class MoviePage extends React.Component {
	constructor() {
		super();

		this.state = {
            movie: {},
			director: {}
        }

        this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
        MovieStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "React Movie App | Movie";
        MovieActions.getMovie(this.props.params.movieId);
    }

    componentWillUnmount() {
        MovieStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            movie: MovieStore.getMovie(this.props.params.movieId)
        });
		this.setState({
            director: MovieStore.getMovie(this.props.params.movieId).Director
        });
    }

	render() {
	    return (
			<div className="row">
				<div className="small-12 columns">
					<h1>ReactJs, Hapi.js & PostgreSQL</h1>
				    <h3 className="push-bottom-2x">Dynamic Movie App: <strong>{this.state.movie.title}</strong></h3>
				    <h5>ID: {this.state.movie.id} | Director: {this.state.director.firstName} {this.state.director.lastName} | {this.state.movie.year} | {this.state.movie.genre} | {this.state.movie.rating}<i className="fa fa-star"></i>
				    </h5>
				</div>
				{
					this.state.movie.File ?
					<div className="medium-3 columns">
						<a href={`/uploads/movies/${this.state.movie.File.name}`} target="_blank"><img src={`/uploads/movies/${this.state.movie.File.name}`}/></a>
					</div> :
					null
				}

				<div className="medium-9 columns">
					<label><u>Storyline</u></label>
					<p className="text-justify">
						{this.state.movie.description}
					</p>
				</div>
			</div>
		);
  	}
}
