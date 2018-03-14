import React from "react";
import fetchJsonp from "fetch-jsonp";
import ScrollUpButton from "react-scroll-up-button";

import SocialMedia from '../social_media.jsx';
import Header from '../header.jsx';
import BusRoutes from './busRoutes.jsx'
import RegionalRail from './regionalRail.jsx'
import Others from './others.jsx'

import advisoryTopIcon from '../../../images/advisory-top-icon.png';
import alertTopIcon from '../../../images/alert-top-icon.png';
import detourTopIcon from '../../../images/detour-top-icon.png';

class SystemStatus extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			genericAlert: ''
		};
	}

	componentDidMount(){
		//get the Generic Alert data
		fetchJsonp(`https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=generic`,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			//console.log(json[0]);
			if(json[0].current_message){
				this.setState({genericAlert: json[0].current_message});
			}else{
				return null;
			}
		});
	}

	render(){

		return(
			<div>

			<Header />
		    <hr/>

			<div style={{float: 'left', width: '300px'}}>
			<div style={{float: 'left', width: '55px'}}>
			<img alt="Service Alert" title="Service Alert" src={alertTopIcon} />
			<p style={{font: 'bold 10px helvetica'}}>Service Alert</p>
			</div>
			<div style={{float: 'left', width: '55px'}}>
			<img alt="Detour" title="Detour" src={detourTopIcon} />
			<p style={{font: 'bold 10px helvetica'}}>Detour</p>
			</div>
			<div style={{float: 'left', width: '55px'}}>
			<img alt="Service Advisory" title="Service Advisory" src={advisoryTopIcon} />
			<p style={{font: 'bold 10px helvetica'}}>Service Advisory</p>
			</div>
			</div>

			<div style={{clear: 'both'}}>
			{this.state.genericAlert && <p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: this.state.genericAlert}} />}
			<BusRoutes />
			<RegionalRail />
			<Others />
			</div>

			<SocialMedia />
		    <ScrollUpButton ContainerClassName="ScrollUpButton__Container"/>

			</div>
			)
	}
}

export default SystemStatus;