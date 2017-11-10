import React from "react";

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

		return(
			<div>
			<h4 className="well well-sm" style ={title}>
			<img src='../images/alert-top-icon.png' />  <strong>Alert for {bt} # {this.props.route}</strong></h4>
			<p dangerouslySetInnerHTML={{__html: this.props.alerts.current_message}} />
			</div>
			);
	}
}

export default Alert;