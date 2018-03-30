import React from "react";
import fetchJsonp from "fetch-jsonp";
import {Link} from 'react-router-dom';
import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';
import detourIcon from '../../../images/detour-icon.png';
import pinIcon from '../../../images/pin-icon.png';

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

class RouteStatus extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			route: props.route,
			status: ''
		}
	}

	componentDidMount(){
		var bt;
		var route = this.state.route;
		if(array.contains(route)){
			bt = "trolley";
		}else{
			bt = "bus";
		}

		var routeN;
		if (route == '15B'){
			routeN = '15b';
		}else if (route == '36B'){
			routeN = '36b';
		}else{
			routeN = route;
		}

		var url = "https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=" +bt+"_route_" + routeN;

		//get the detail of Alert data
		fetchJsonp(url,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			this.setState({status: json});
			});
	}

	render(){

		if(!this.state.status){
			return <li>Loading...</li>;
		}

		const styleAlert={
			visibility: this.state.status[0].current_message ? 'visible' : 'hidden'
		}

		const styleAdvisory={
			visibility: this.state.status[0].advisory_message ? 'visible' : 'hidden'
		}

		const styleDetour={
			visibility: this.state.status[0].detour_message ? 'visible' : 'hidden'
		}


		return(
			<li>
			<Link to={'/bus_trolley/'+this.props.route}>
			<span style = {{fontSize: 'large'}}>{this.props.route}</span>
			<img style={styleAlert} src={alertIcon} />
			<img style={styleDetour} src={detourIcon} /> 
			<img style={styleAdvisory} src={advisoryIcon} /> 
			<img src={pinIcon} /> 
			</Link>
			<hr/>
			</li>

			)
	}
}

export default RouteStatus;