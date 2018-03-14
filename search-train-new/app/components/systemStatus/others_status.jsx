import React from "react";
import fetchJsonp from "fetch-jsonp";
import {Link} from 'react-router-dom';

import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';
import detourIcon from '../../../images/detour-icon.png';

class OthersStatus extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			line: props.line,
			status: ''
		}
	}

	componentDidMount(){
		var line = this.state.line;
		var url = "https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=" + line;
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
			<Link to={'/others/'+this.state.line}>
			<span style = {{fontSize: 'large'}}>{this.state.status[0].route_name}</span>
			<img style={styleAlert} src={alertIcon} />
			<img style={styleDetour} src={detourIcon} /> 
			<img style={styleAdvisory} src={advisoryIcon} /> 
			</Link>
			<hr/>
			</li>

			)
	}
}

export default OthersStatus;