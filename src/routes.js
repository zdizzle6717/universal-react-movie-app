import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/pages/IndexPage';
import MovieListPage from './components/pages/MovieListPage';
import MoviePage from './components/pages/MoviePage';
import DirectorListPage from './components/pages/DirectorListPage';
import NotFoundPage from './components/pages/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="movies" component={MovieListPage}/>
    <Route path="movies/:id" component={MoviePage}/>
    <Route path="directors" component={DirectorListPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
