/**
 * busRoutes.jsx file
 * This is the bus/trolley part of the system status
 *
 */
import React from "react";
import fetchJsonp from "fetch-jsonp";

import RouteStatus from './route_status.jsx'

import busStatus from '../../../images/bus-status.png';
import trolleyStatus from '../../../images/trolley-status.png';

class BusRoutes extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			statusRoutes: []
		};
	}

	componentDidMount(){
		var url = "https://www3.septa.org/api/Alerts/index.php";
		//get the detail of Alert data
		fetchJsonp(url,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			this.setState({statusRoutes: json});
			});
	}

	render(){
		if(!this.state.statusRoutes){
			<div>Loading...</div>
		}

		return(
			<div>

			{this.props.showBus && <div>
			<div >
			<center>
			<h3><img src={busStatus} alt="busStatus" />Bus Routes</h3>
			<hr/>
			</center>
			</div>
			<ul className="route-status">
			{this.state.statusRoutes.map(function(statusRoute,i){
				if(statusRoute.mode == 'Bus'){
					return(
					<RouteStatus statusRoute={statusRoute} key={i} />
					)
				}
				
			})}
			<br className="brHidden" />
			<br className="brHidden" />
			<br className="brHidden" />
			<br className="brHidden" />
			<br className="brHidden" />
			<br className="brHidden" />
			</ul>
			<br/>
			</div>}

			{this.props.showTrolley && <div>
			<div >
			<center>
			<h3><img src={trolleyStatus} alt="trolleyStatus" />Trolley Lines</h3>
			<hr/>
			</center>
			</div>
			<ul className="trolley-status">
			{this.state.statusRoutes.map(function(statusRoute,i){
				if(statusRoute.mode == 'Trolley'){
					return(
					<RouteStatus statusRoute={statusRoute} key={i} />
					)
				}
				
			})}
			</ul>
			<br/>
			</div>}

			</div>
			)
	}
}

export default BusRoutes;