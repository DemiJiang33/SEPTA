/**
 * others_status.jsx file
 * This is the status of specific one of others(subway, cct and etc.)
 *
 */
import React from "react";
import {Link} from 'react-router-dom';

import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';
import detourIcon from '../../../images/detour-icon.png';

class OthersStatus extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		const styleAlert={
			visibility: this.props.statusOther.isalert == 'Y' ? 'visible' : 'hidden'
		}

		const styleAdvisory={
			visibility: this.props.statusOther.isadvisory == 'Yes' ? 'visible' : 'hidden'
		}

		const styleDetour={
			visibility: this.props.statusOther.isdetour == 'Y' ? 'visible' : 'hidden'
		}


		return(
			<li>
			<Link to={'/others/'+this.props.statusOther.route_id}>
			<center>
			<span style = {{fontSize: 'large'}}>{this.props.statusOther.route_name}</span>
			<img style={styleAlert} src={alertIcon} alt="alertIcon" />
			<img style={styleDetour} src={detourIcon} alt="detourIcon" /> 
			<img style={styleAdvisory} src={advisoryIcon} alt="advisoryIcon" /> 
			</center>
			</Link>
			<hr/>
			</li>

			)
	}
}

export default OthersStatus;