import React from "react";
import {Link} from 'react-router-dom';

import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';
import detourIcon from '../../../images/detour-icon.png';
import pinIcon from '../../../images/pin-icon.png';

class RouteStatus extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		const styleAlert={
			visibility: this.props.statusRoute.isalert == 'Y' ? 'visible' : 'hidden'
		}

		const styleAdvisory={
			visibility: this.props.statusRoute.isadvisory == 'Yes' ? 'visible' : 'hidden'
		}

		const styleDetour={
			visibility: this.props.statusRoute.isdetour == 'Y' ? 'visible' : 'hidden'
		}


		return(
			<li>
			<Link to={'/bus_trolley/'+this.props.statusRoute.route_name}>
			<center>
			<span style = {{fontSize: 'large'}}>{this.props.statusRoute.route_name}</span>
			<img style={styleAlert} src={alertIcon} alt="alertIcon" />
			<img style={styleDetour} src={detourIcon} alt="detourIcon" /> 
			<img style={styleAdvisory} src={advisoryIcon} alt="advisoryIcon" /> 
			<img src={pinIcon} alt="pinIcon" /> 
			</center>
			</Link>
			<hr/>
			</li>

			)
	}
}

export default RouteStatus;