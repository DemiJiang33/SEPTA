import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import AppTrain from './components/app_train.jsx';
import AppBusTrolley from './components/app_bus_trolley.jsx';
import Bus from './components/bus/bus.jsx';
import App from './components/app.jsx';

ReactDOM.render(
	<BrowserRouter>
	<div>
	<Switch>
	<Route path='/:bt/:route' component={Bus}/>
	<Route path='/bus_trolley' component={AppBusTrolley}/>
	<Route path = "/regionalRail" component={AppTrain} />
	<Route path = "/" component={App} />
	</Switch>
	</div>
	</BrowserRouter>
	,document.getElementById("app")
	);
