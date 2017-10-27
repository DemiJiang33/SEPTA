import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './components/app.jsx';
import Schedule from './components/schedule.jsx';
import Advisory from './components/advisory.jsx';
import Alert from './components/alert.jsx';

ReactDOM.render(
	<BrowserRouter>
	<div>
	<Switch>
	<Route path = "/" component={App} />
	</Switch>
	</div>
	</BrowserRouter>
	,document.getElementById("app")
	);
