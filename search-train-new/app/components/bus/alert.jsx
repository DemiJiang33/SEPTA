import React from "react";
import alertTopIcon from '../../../images/alert-top-icon.png';

class Alert extends React.Component{

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
			<img src={alertTopIcon} />  <strong> Alert for {bt} # {this.props.route}</strong></h4>
			<p dangerouslySetInnerHTML={{__html: alerts.current_message}} />
			</div>
			);
	}
}

export default Alert;