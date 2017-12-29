import React from "react";

import detourTopIcon from '../../../images/detour-top-icon.png';

class DetourTrolley extends React.Component{

	render(){
		const title ={
			textAlign:"center",
			marginBottom: "1px",
			marginTop: "1px"
		}

		var bt;
		if((this.props.bt)== "bus"){
			bt = "Bus";
		}else{
			bt = "Trolley";
		}

		var alerts;
		if(typeof this.props.alerts != 'undefined' && this.props.alerts){
			alerts = this.props.alerts;
		}else{
			alerts = '';
		}

		return(
			<div>
			<h4 className="well well-sm" style ={title}>
			<img src={detourTopIcon} />  <strong>Detours for {bt} # {this.props.route}</strong></h4>
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Location: '+'</strong>'+ alerts.detour_start_location}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Date: '+'</strong>'+ alerts.detour_start_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'End Date: '+'</strong>'+ alerts.detour_end_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Reason for Detour: '+'</strong>'+ alerts.detour_reason}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Details: '+'</strong>'+ alerts.detour_message}} />
			<hr/>
			</div>
			);
	}
}

export default DetourTrolley;