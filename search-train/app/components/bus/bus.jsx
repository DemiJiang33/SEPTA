import React from "react";
import fetchJsonp from "fetch-jsonp";

import Clock from '../clock.jsx';
import Header from '../header.jsx';
import SocialMedia from '../social_media.jsx';

import Search from './search.jsx';

class Bus extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			buses: [],
			alerts:[],
			route: '',
			bt: ''
		}
	}

	componentDidMount(){
		var bt = this.props.match.params.bt;
		this.setState({bt: bt});
		var route = this.props.match.params.route;
		this.setState({route: route});

		//console.log(route);
		var url = "http://www3.septa.org/hackathon/TransitView/?route=" + route;

		//get the detail of TransitView API data
		fetchJsonp(url)
		.then(
			response =>{
				return response.json()
			}).then(
			json =>{
				//console.log(json.bus);
				this.setState({buses: json.bus});
			});

		var url2 = "http://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=" +bt+"_route_" + route;

		//get the detail of Alerts API data
		fetchJsonp(url2)
		.then(
			response =>{
				return response.json()
			}).then(
			json =>{
				//console.log(json);
				this.setState({alerts: json[0]});
			});
	}

	render(){

		return(
			<div>
			<Header />
		    <Clock />
		    <Search buses={this.state.buses} route={this.state.route} 
		    alerts={this.state.alerts} bt={this.state.bt} />
		    <SocialMedia />
		    </div>
			)
	}
}

export default Bus;