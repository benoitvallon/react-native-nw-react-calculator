'use strict';

var App = require('../common/components/App');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router
var Route = ReactRouter.Route;

var content = document.getElementById('content');

ReactDOM.render((
  <Router>
    <Route path="/" component={App} />
  </Router>
), content);
