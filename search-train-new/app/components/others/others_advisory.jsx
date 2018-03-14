import React from "react";
class OthersAdvisory extends React.Component{
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

		var advisory;
		if(typeof nextProps.advisory != 'undefined' && nextProps.advisory){
			advisory = nextProps.advisory;
		}else{
			advisory = '';
		}

		var msg = '<div>' + advisory + '</div>';

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
		const divStyle = {
			overflow: 'scroll'
		}				
		return(
			<div id ="Adcontent" style={divStyle} dangerouslySetInnerHTML={{__html: this.state.msg}} />
			);
	}
}


export default OthersAdvisory;