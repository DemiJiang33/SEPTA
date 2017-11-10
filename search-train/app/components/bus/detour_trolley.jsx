import React from "react";

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

		return(
			<div>
			<h4 className="well well-sm" style ={title}>
			<img src='../images/detour-top-icon.png' />  <strong>Detours for {bt} # {this.props.route}</strong></h4>
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Location: '+'</strong>'+ this.props.alerts.detour_start_location}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Date: '+'</strong>'+ this.props.alerts.detour_start_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'End Date: '+'</strong>'+ this.props.alerts.detour_end_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Reason for Detour: '+'</strong>'+ this.props.alerts.detour_reason}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Details: '+'</strong>'+ this.props.alerts.detour_message}} />
			<hr/>
			</div>
			);
	}
}

export default DetourTrolley;