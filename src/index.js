import App from './common/components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

// CSS
require('normalize.css');
require('./styles/main.css');

var content = document.getElementById('content');

ReactDOM.render((
  <HashRouter>
    <Route path="/" component={App} />
  </HashRouter>
), content);
