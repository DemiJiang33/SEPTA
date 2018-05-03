import React from "react";
import ScrollUpButton from "react-scroll-up-button";
import fetchJsonp from "fetch-jsonp";
import {geolocated} from 'react-geolocated';

import SocialMedia from '../social_media.jsx';
import Header from '../header.jsx';

import NTARR from './nta_rr.jsx';

class NTAIndex extends React.Component{
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
		//console.log(this.props.coords);
		
		/*if(!this.props.coords){
			return <div>Loading...</div>;
		}*/

		return(
			<div>
			<Header />
		    <hr/>

		    {this.state.genericAlert && <p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: this.state.genericAlert}} />}

		    <NTARR coords={this.props.coords}/>

		    <SocialMedia />
		    <ScrollUpButton ContainerclassName="ScrollUpButton__Container"/>

			</div>
			)
	}
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  watchPosition: true,
  geolocationProvider: navigator.geolocation
})(NTAIndex);