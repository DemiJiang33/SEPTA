import React from "react";
import {Route, Switch} from 'react-router-dom';

import AppTrain from './app_train.jsx';
import AppBusTrolley from './app_bus_trolley.jsx';
import App from './app.jsx';
import SystemStatus from './systemStatus/system_status.jsx';
import OthersIndex from './others/others_index.jsx';
import NTAIndex from './nta/nta_index.jsx';

const Routes = () => (
	<Switch>
	  <Route path='/bus_trolley/:route/:route2/:route3' component={AppBusTrolley} />
	  <Route path='/bus_trolley/:route/:route2' component={AppBusTrolley} />
	  <Route path='/bus_trolley/:route' component={AppBusTrolley} />
	  <Route path='/bus_trolley' component={AppBusTrolley} />
	  <Route path = "/regionalrail" component={AppTrain} />
	  <Route path = "/systemstatus" component={SystemStatus} />
	  <Route path = "/others" component={OthersIndex} />
	  <Route path = "/nta" component={NTAIndex} />
	  <Route path = "/" component={App} />
	</Switch>
	)

export default Routes;