import React from "react";

class Detour extends React.Component{

	render(){
	

		return(
			<div ref="detour">
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Location: '+'</strong>'+ this.props.detour.start_location}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Date: '+'</strong>'+ this.props.detour.start_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'End Location: '+'</strong>'+ this.props.detour.end_location}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'End Date: '+'</strong>'+ this.props.detour.end_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Reason for Detour: '+'</strong>'+ this.props.detour.reason}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Details: '+'</strong>'+ this.props.detour.current_message}} />
			<hr/>
			</div>
			);
	}
}

export default Detour;