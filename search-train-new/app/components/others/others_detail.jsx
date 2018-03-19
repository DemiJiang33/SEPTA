import React from "react";

import OthersAdvisory from './others_advisory.jsx';
import OthersMap from './others_map.jsx'

import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';
import detourIcon from '../../../images/detour-icon.png'

import advisoryTopIcon from '../../../images/advisory-top-icon.png';
import alertTopIcon from '../../../images/alert-top-icon.png';
import detourTopIcon from '../../../images/detour-top-icon.png';

class OthersDetail extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const divStyle = {
			border: '1px solid #cccccc',
		}

		const title ={
			textAlign:"center",
			marginTop: '1px',
			marginBottom: '1px'
		}

		var displayAlert;
		var displayDetour;
		var displayAdvisory;
		if(typeof this.props.status != 'undefined' && this.props.status){
			if(this.props.status.current_message){
				displayAlert = 'block'
			}else{
				displayAlert ='none'
			}
			if(this.props.status.detour_message){
				displayDetour = 'block'
			}else{
				displayDetour ='none'
			}
			if(this.props.status.advisory_message){
				displayAdvisory = 'block'
			}else{
				displayAdvisory ='none'
			}
		}else{
			displayAlert ='none';
			displayDetour ='none';
			displayAdvisory ='none';
		}

		const alertStyle ={
			display: displayAlert,
			//border: '1px solid #4d0000',
			marginTop: '1px',
			marginBottom: '1px'
		}

		const detourStyle ={
			display: displayDetour,
			//border: '1px solid #4d0000',
			marginTop: '1px',
			marginBottom: '1px'
		}

		const advisoryStyle ={
			display: displayAdvisory,
			//border: '1px solid #4d0000',
			marginTop: '1px',
			marginBottom: '1px'
		}

		return(
			<div>
			<OthersMap line = {this.props.line} />

			<div style={divStyle}>

            <h4 className="well well-sm" style ={title}>
            <strong>Line {this.props.status.route_name}&nbsp;</strong>
            {(displayAlert=='block') && <a>
			<img src={alertIcon} />
			</a>}
			{(displayDetour=='block') && <a>
			<img src={detourIcon} />
			</a>}
			{(displayAdvisory=='block') && <a>
			<img src={advisoryIcon} />
			</a>}
            </h4>

            <div id="alertDiv" style={alertStyle}>
			<h4 className="well well-sm" style ={title}>
			<img src={alertTopIcon} />  <strong> Alert for line # {this.props.status.route_name}</strong></h4>
			<p dangerouslySetInnerHTML={{__html: this.props.status.current_message}} />
			</div>

			<div id="detourDiv" style={detourStyle}>
			<h4 className="well well-sm" style ={title}>
			<img src={detourTopIcon} /> <strong> Detours for line # {this.props.status.route_name} </strong></h4>
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Location: '+'</strong>'+ this.props.status.detour_start_location}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Date: '+'</strong>'+ this.props.status.detour_start_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'End Date: '+'</strong>'+ this.props.status.detour_end_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Reason for Detour: '+'</strong>'+ this.props.status.detour_reason}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Details: '+'</strong>'+ this.props.status.detour_message}} />
			</div>

			<div id="advisoryDiv" style={advisoryStyle}>
			<h4 className="well well-sm" style ={title}>
			<img src={advisoryTopIcon} /><strong> Advisory for line # {this.props.status.route_name}</strong>
			</h4>
			<OthersAdvisory advisory={this.props.status.advisory_message} />
			</div>

			</div>

			</div>
			)
	}
}

export default OthersDetail;