import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';
import DirectorActions from '../../actions/DirectorActions';
import DirectorStore from '../../stores/DirectorStore';

export default class DirectorPage extends React.Component {
	constructor() {
		super();

		this.state = {
            director: {}
        }

        this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
        DirectorStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "Sandbox | Director";
        DirectorActions.getDirector(this.props.params.directorId);
    }

    componentWillUnmount() {
        DirectorStore.removeChangeListener(this.onChange);
    }

    componentWillReceiveProps(nextProps) {
        DirectorActions.getDirector(nextProps.params.id)
    }

    onChange() {
        this.setState({
            director: DirectorStore.getDirector(this.props.params.directorId)
        });
    }


  render() {
	  return (
			<div className="row">
			    <h1>ReactJs, Hapi.js & PostgreSQL</h1>
			    <h3 className="push-bottom-2x">Dynamic Movie App: <strong>{this.state.director.firstName} {this.state.director.lastName}</strong></h3>
			    <h5>ID: {this.state.director.id}</h5>
			    <label><u>Bio</u></label>
			    <p className="text-justify">
			        {this.state.director.bio}
			    </p>
			</div>
    	);
	}
}
