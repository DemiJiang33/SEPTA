import React from "react";
//Detour is used to get the one detour message of the specific bus/trolley
class Detour extends React.Component{

	render(){
		var displayhr;
		if(this.props.id == (this.props.length - 1 )){
			displayhr = 'none'
		}else{
			displayhr = 'block'
		}

		const style={
			display: displayhr
		}

		return(
			<div ref="detour">
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Location: '+'</strong>'+ this.props.detour.start_location}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Start Date: '+'</strong>'+ this.props.detour.start_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'End Location: '+'</strong>'+ this.props.detour.end_location}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'End Date: '+'</strong>'+ this.props.detour.end_date_time}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Reason for Detour: '+'</strong>'+ this.props.detour.reason}} />
			<p dangerouslySetInnerHTML={{__html: '<strong>'+ 'Details: '+'</strong>'+ this.props.detour.current_message}} />
			{/*<p> {this.props.id} </p>*/}
			<hr style={style} />
			</div>
			);
	}
}

export default Detour;