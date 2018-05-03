import React from "react";
import ScrollUpButton from "react-scroll-up-button";
import fetchJsonp from "fetch-jsonp";

import SocialMedia from '../social_media.jsx';
import Header from '../header.jsx';

import OthersDetail from './others_detail.jsx';

class OthersIndex extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			status: '',
			line:'',
			hasLine: true
		};
	}

	componentDidMount(){
		var line = this.state.line;
		var url = "https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=" + line;
		//get the detail of Alert data
		fetchJsonp(url,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			this.setState({status: json[0]});
			});
	}

	componentWillMount(){
		var pathname = this.props.location.pathname;
		var pathExist = pathname.includes('others/');
		if(pathExist){
			var pathArray = this.props.location.pathname.split( 'others/' );
			var line = pathArray[1];
			const array = ['rr_route_mfl','rr_route_mfo','rr_route_bsl','rr_route_bso','rr_route_nhsl','cct'];
			const isEnabled = array.contains(line);
			Array.prototype.contains = function(obj) {
				var i = this.length;
				while (i--) {
					if (this[i] == obj) {
						return true;
					}
				}
				return false;
			}
			this.setState({line: line});
			if(!isEnabled){
			this.setState({hasLine: false});}
		}else{
			this.setState({hasLine: false});
		}
	}

	render(){
		//console.log(this.state.status);
		return(
			<div>
			<Header />
		    <hr/>

		    {!this.state.hasLine && <p style={{color: 'red'}}>There are no current Alerts, Detours or Service Advisories.</p>}
		    {this.state.hasLine && <OthersDetail line={this.state.line} status={this.state.status} />}

		    <SocialMedia />
		    <ScrollUpButton ContainerClassName="ScrollUpButton__Container"/>

			</div>
			)
	}
}

export default OthersIndex;