import React from "react";
import {Link} from 'react-router-dom';

import suspendedIcon from '../../../images/suspended-icon.png';
import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';
import detourIcon from '../../../images/detour-icon.png';
import pinIcon from '../../../images/pin-icon.png';

class LineStatus extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		//console.log(this.state.statusLine);

		const styleAlert={
			visibility: this.props.statusLine.isalert == 'Y' ? 'visible' : 'hidden'
		}

		const styleAdvisory={
			visibility: this.props.statusLine.isadvisory == 'Yes' ? 'visible' : 'hidden'
		}

		const styleDetour={
			visibility: this.props.statusLine.isdetour == 'Y' ? 'visible' : 'hidden'
		}

		const alertSuspended = this.props.statusLine.issuppend == 'Y' ? suspendedIcon : alertIcon

		return(
			<li>
			<Link to={'/regionalrail/'+this.props.statusLine.route_name}>
			<span style = {{fontSize: 'large', marginLeft: '10px'}}>
			{this.props.statusLine.route_name}</span>
			<span style = {{float: 'right'}}>
			<img style={styleAlert} src={alertSuspended} alt="alertIcon" />
			<img style={styleDetour} src={detourIcon} alt="detourIcon" /> 
			<img style={styleAdvisory} src={advisoryIcon} alt="advisoryIcon" /> 
			<img src={pinIcon} alt="pinIcon" />
			</span>
			</Link>
			<hr/>
			</li>
			)
	}
}

export default LineStatus;