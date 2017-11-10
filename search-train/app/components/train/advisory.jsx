import React from "react";

class Advisory extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			msg: []
		}
	}

	componentWillReceiveProps(nextProps){
		var msg = '<div>' + nextProps.train.message + '</div>';
		var $advisoryHTML = $(msg,{html:msg});
		var anchors = $("a", $advisoryHTML);
		for (var i= 0; i < anchors.length ; i++){
			var oldHref = $(anchors[i]).attr("href");
			var newHref = "https://www.septa.org/"+ oldHref;
			//console.log(oldHref);
			$(anchors[i]).attr("href", newHref);
			//var value = $(anchors[i]).attr("href");
			//console.log(value);
		}
		var anchorsImg = $("img", $advisoryHTML);
		for (var i= 0; i < anchorsImg.length ; i++){
			var oldSrc = $(anchorsImg[i]).attr("src");
			var newSrc = "https://www.septa.org/"+ oldSrc;
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

		/*const local = window.location.href;

		$('#Adcontent a').each(function() {
			this.href = this.href.replace(local, 'https://www.septa.org/');
		});

		$('#Adcontent img').each(function() {
			this.src = this.src.replace(local, 'https://www.septa.org/');
		});
		*/
		
		return(
			<div>
			<h4 className="well well-sm" style ={title}>
			<img src='../images/advisory-top-icon.png' /><strong> Advisory for Line # {this.props.train.line}</strong>
			</h4>
			<div id ="Adcontent" style={divStyle} dangerouslySetInnerHTML={{__html: this.state.msg}} />
			</div>
			);
	}
}

export default Advisory;