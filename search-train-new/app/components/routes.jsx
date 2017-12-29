import React from "react";
import {Route, Switch} from 'react-router-dom';

import AppTrain from './app_train.jsx';
import AppBusTrolley from './app_bus_trolley.jsx';
import App from './app.jsx';

const Routes = () => (
	<Switch>
	  <Route path='/bus_trolley/:route/:route2/:route3' component={AppBusTrolley} />
	  <Route path='/bus_trolley/:route/:route2' component={AppBusTrolley} />
	  <Route path='/bus_trolley/:route' component={AppBusTrolley} />
	  <Route path='/bus_trolley' component={AppBusTrolley} />
	  <Route path = "/regionalrail" component={AppTrain} />
	  <Route path = "/" component={App} />
	</Switch>
	)

export default Routes;