import React from "react";
import suspendedTopIcon from '../../../images/suspended-top-icon.png';
import alertTopIcon from '../../../images/alert-top-icon.png';

class Alert extends React.Component{

	render(){
		const title ={
			textAlign:"center",
			marginBottom: "1px",
			marginTop: "1px"
		}

		const alertSuspended = String(this.props.train.alert).includes('suspended') ? suspendedTopIcon : alertTopIcon

		return(
			<div>
			<h4 className="well well-sm" style ={title}>
			<img src={alertSuspended} alt="alert" />  <strong> Alert for Line # {this.props.train.line}</strong></h4>
			<p dangerouslySetInnerHTML={{__html: this.props.train.alert}} />
			</div>
			);
	}
}

export default Alert;