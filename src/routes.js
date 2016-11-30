import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import IndexPage from './components/pages/IndexPage';
import MoviePage from './components/pages/MoviePage';
import MovieListPage from './components/pages/MovieListPage';
import MovieEditPage from './components/pages/MovieEditPage';
import DirectorPage from './components/pages/DirectorPage';
import DirectorListPage from './components/pages/DirectorListPage';
import DirectorEditPage from './components/pages/DirectorEditPage';
import NotFoundPage from './components/pages/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegistrationPage}/>
    <Route path="movies" component={MovieListPage}/>
    <Route path="movies/view/:movieId" component={MoviePage}/>
    <Route path="movies/create" component={MovieEditPage}/>
    <Route path="movies/edit/:movieId" component={MovieEditPage}/>
    <Route path="directors" component={DirectorListPage}/>
	<Route path="directors/view/:directorId" component={DirectorPage}/>
	<Route path="directors/create" component={DirectorEditPage}/>
	<Route path="directors/edit/:directorId" component={DirectorEditPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
