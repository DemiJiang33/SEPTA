import React from "react";

import advisoryTopIcon from '../../../images/advisory-top-icon.png';

class Advisory extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			msg: []
		}
	}

	componentWillReceiveProps(nextProps){
		if (!String.prototype.contains) {
			String.prototype.contains= function() {
				return String.prototype.indexOf.apply(this, arguments) !== -1;
			};
		}

		var alerts;
		if(typeof nextProps.alerts != 'undefined' && nextProps.alerts){
			alerts = nextProps.alerts;
		}else{
			alerts = '';
		}

		var msg = '<div>' + alerts.advisory_message + '</div>';

		var $advisoryHTML = $(msg,{html:msg});
		var anchors = $("a", $advisoryHTML);
		for (var i= 0; i < anchors.length ; i++){
			var oldHref = $(anchors[i]).attr("href");
			//console.log(oldHref.contains("https:"));
			//console.log(oldHref);
			if(oldHref.contains("http")){
				var newHref = oldHref.replace(/^http:\/\//i, 'https://');
			}else{
				var newHref = "https://www.septa.org"+ oldHref;
			}
			//console.log(oldHref);
			$(anchors[i]).attr("href", newHref);
			//var value = $(anchors[i]).attr("href");
			//console.log(value);
		}
		var anchorsImg = $("img", $advisoryHTML);
		for (var i= 0; i < anchorsImg.length ; i++){
			var oldSrc = $(anchorsImg[i]).attr("src");
			var newSrc = "https://www.septa.org"+ oldSrc;
			//console.log(oldSrc);
			$(anchorsImg[i]).attr("src", newSrc);
			//var value2 = $(anchorsImg[i]).attr("src");
			//console.log(value2);
		}
		msg = $advisoryHTML.html();
		this.setState({msg: msg});
	}

	render(){
		const title ={
			textAlign:"center",
			marginBottom: "1px",
			marginTop: "1px"
		}

		const divStyle = {
			overflow: 'scroll'
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
			<img src={advisoryTopIcon} /><strong> Advisory for {bt} # {this.props.route}</strong>
			</h4>
			<div id ="Adcontent" style={divStyle} dangerouslySetInnerHTML={{__html: this.state.msg}} />
			</div>
			);
	}
}

export default Advisory;