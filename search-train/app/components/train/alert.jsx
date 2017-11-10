import React from "react";

class Alert extends React.Component{

	render(){
		const title ={
			textAlign:"center",
			marginBottom: "1px",
			marginTop: "1px"
		}

		return(
			<div>
			<h4 className="well well-sm" style ={title}>
			<img src='../images/alert-top-icon.png' />  <strong>Alert for Line # {this.props.train.line}</strong></h4>
			<p dangerouslySetInnerHTML={{__html: this.props.train.alert}} />
			</div>
			);
	}
}

export default Alert;