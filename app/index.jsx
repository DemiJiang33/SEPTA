import "babel-polyfill";
import es6Promise from 'es6-promise';
es6Promise.polyfill();

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';

import Routes from './components/routes.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';

ReactDOM.render(
	<BrowserRouter>
	  <Routes />
	</BrowserRouter>
	,document.getElementById("app")
	);
