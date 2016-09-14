import React from 'react';
import { Link } from 'react-router';
import TopNav from './pieces/TopNav';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <header>
            <TopNav></TopNav>
        </header>
        <div className="content-container animate">{this.props.children}</div>
        <footer>ReactJs app with server side routing and RESTful API built on HapiJS and PostgreSQL</footer>
      </div>
    );
  }
}
