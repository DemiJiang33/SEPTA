/**
 * index.jsx file
 * It's the access to the Realtime App
 *
 */
import "babel-polyfill";
import es6Promise from 'es6-promise';
es6Promise.polyfill();
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

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
