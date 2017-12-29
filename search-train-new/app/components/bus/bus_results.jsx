import React from "react";

import Alert from './alert.jsx';
import Advisory from './advisory.jsx';
import Detours from './detours.jsx';
import DetourTrolley from './detour_trolley.jsx';

import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';
import detourIcon from '../../../images/detour-icon.png'

class BusResults extends React.Component{

	render(){
		if(!this.props.alerts){
			<div>Loading...</div>
		}

		//console.log(this.props.alerts);

		const title ={
			textAlign:"center",
			marginTop: '1px',
			marginBottom: '1px'
		}

		const divStyle = {
			border: '1px solid #cccccc',
		}

		var displayAlert;
		var displayDetour;
		var displayAdvisory;
		if(typeof this.props.alerts != 'undefined' && this.props.alerts){
			if(this.props.alerts.current_message){
				displayAlert = 'block'
			}else{
				displayAlert ='none'
			}
			if(this.props.alerts.detour_message){
				displayDetour = 'block'
			}else{
				displayDetour ='none'
			}
			if(this.props.alerts.advisory_message){
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

		var bt;
		if((this.props.bt)== "bus"){
			bt = "Bus";
		}else{
			bt = "Trolley";
		}

		return(
			<div>

			<div style={divStyle}>

            <h4 className="well well-sm" style ={title}>
            <strong>{bt} {this.props.route}&nbsp;</strong>
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
			<Alert route={this.props.route} bt={this.props.bt} alerts={this.props.alerts} />
			</div>
			<div id="detourDiv" style={detourStyle}>
			{(displayDetour=='block') && (this.props.bt == "bus") && <Detours route={this.props.route} bt={this.props.bt} />}
			{(this.props.bt == "trolley") && <DetourTrolley route={this.props.route} bt={this.props.bt} alerts={this.props.alerts} />}
			</div>
			<div id="advisoryDiv" style={advisoryStyle}>
			<Advisory route={this.props.route} bt={this.props.bt} alerts={this.props.alerts} />
			</div>

			</div>

			</div>
			)
	}
}

export default BusResults;