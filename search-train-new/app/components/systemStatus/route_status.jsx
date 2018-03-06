import React from "react";
import fetchJsonp from "fetch-jsonp";
import {Link} from 'react-router-dom';
import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';
import detourIcon from '../../../images/detour-icon.png';

class RouteStatus extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			route: props.route,
			status: ''
		}
	}

	componentDidMount(){
		var route = this.state.route;
		var url = "https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=bus_route_" + route;

		//get the detail of TrainView API data
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
			return <div>Loading...</div>;
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
			<Link to={'/bus_trolley/'+this.props.route}>
			<div> <span style = {{fontSize: 'large'}}>{this.props.route}</span>
			<img style={styleAlert} src={alertIcon} />
			<img style={styleDetour} src={detourIcon} /> 
			<img style={styleAdvisory} src={advisoryIcon} /> 
			</div>
			</Link>
			)
	}
}

export default RouteStatus;