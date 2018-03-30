import React from "react";
import {Link} from 'react-router-dom';

import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';
import detourIcon from '../../../images/detour-icon.png';
import pinIcon from '../../../images/pin-icon.png';

class LineStatus extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			statusLine: props.statusLine
		}
	}

	render(){
		//console.log(this.state.statusLine);

		const styleAlert={
			visibility: this.state.statusLine.current_message ? 'visible' : 'hidden'
		}

		const styleAdvisory={
			visibility: this.state.statusLine.advisory_message ? 'visible' : 'hidden'
		}

		const styleDetour={
			visibility: this.state.statusLine.detour_message ? 'visible' : 'hidden'
		}

		return(
			<li>
			<Link to={'/regionalrail/'+this.props.statusLine.route_name}>
			<span style = {{fontSize: 'large'}}>{this.props.statusLine.route_name}</span>
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

export default LineStatus;