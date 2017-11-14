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
			bt: '',
			title: 'Bus/Trolley '
		}
	}

	componentDidMount(){
		var bt;

		var route = this.props.match.params.route;
		this.setState({route: route});

		const array = [10,11,13,15,34,36,101,102];
		Array.prototype.contains = function(obj) {
			var i = this.length;
			while (i--) {
				if (this[i] == obj) {
					return true;
				}
			}
			return false;
		}
		if(array.contains(route)){
			bt = "trolley";
			this.setState({
				bt: bt,
				title: "Trolley "
			});
		}else{
			bt = "bus";
			this.setState({
				bt: bt,
				title: "Bus "
			});
		}

		//console.log(route);
		var url = "https://www3.septa.org/hackathon/TransitView/?route=" + route;

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

		var url2 = "https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=" +bt+"_route_" + route;

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
		    <Clock title = {this.state.title} />
		    <Search buses={this.state.buses} route={this.state.route} 
		    alerts={this.state.alerts} bt={this.state.bt} />
		    <SocialMedia />
		    </div>
			)
	}
}

export default Bus;