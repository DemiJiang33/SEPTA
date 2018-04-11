import React from "react";
import ScrollUpButton from "react-scroll-up-button";
import fetchJsonp from "fetch-jsonp";

import SocialMedia from '../social_media.jsx';
import Header from '../header.jsx';

import NTARR from './nta_rr.jsx';
import NTABus from './nta_bus.jsx';

import busStatus from '../../../images/bus-status.png';
import trolleyStatus from '../../../images/trolley-status.png';
import RRStatus from '../../../images/rr-status.png';
import BSLStatus from '../../../images/bsl-status.png';
import NHSLStatus from '../../../images/nhsl-status.png';

class NTAIndex extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			showBus: false,
			showTrolley: false,
			showRR: true,
			showSubway: false,
			showNHSL: false,
			genericAlert: ''
		};
		this.onClickBus = this.onClickBus.bind(this);
		this.onClickTrolley = this.onClickTrolley.bind(this);
		this.onClickRR = this.onClickRR.bind(this);
		this.onClickSubway = this.onClickSubway.bind(this);
		this.onClickNHSL = this.onClickNHSL.bind(this);
	}

	onClickBus(){
		this.setState({
			showBus: true,
			showTrolley: false,
			showRR: false,
			showSubway: false,
			showNHSL: false
		});
	}
	onClickTrolley(){
		this.setState({
			showBus: false,
			showTrolley: true,
			showRR: false,
			showSubway: false,
			showNHSL: false
		});
	}
	onClickRR(){
		this.setState({
			showBus: false,
			showTrolley: false,
			showRR: true,
			showSubway: false,
			showNHSL: false
		});
	}
	onClickSubway(){
		this.setState({
			showBus: false,
			showTrolley: false,
			showRR: false,
			showSubway: true,
			showNHSL: false
		});
	}
	onClickNHSL(){
		this.setState({
			showBus: false,
			showTrolley: false,
			showRR: false,
			showSubway: false,
			showNHSL: true
		});
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

		var ulShow ={
			whiteSpace: 'nowrap',
			overflowX: 'auto'
		}

		var ulLiShow ={
			display: 'inline-block',
			float: 'none'
		}

		return(
			<div>
			<Header />
		    <hr/>

		    {this.state.genericAlert && <p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: this.state.genericAlert}} />}

		    <center>
			<ul style={ulShow} className="nav navbar-inverse">
			<li style={ulLiShow}><a onClick={this.onClickBus} href="#" className="btn btn-lg btn-primary"><img src={busStatus}/>Bus</a></li>
			<li style={ulLiShow}><a onClick={this.onClickTrolley} href="#" className="btn btn-lg btn-primary"><img src={trolleyStatus}/>Trolley</a></li>
			<li style={ulLiShow}><a onClick={this.onClickRR} href="#" className="btn btn-lg btn-primary"><img src={RRStatus}/>Rail</a></li>
			<li style={ulLiShow}><a onClick={this.onClickSubway} href="#" className="btn btn-lg btn-primary"><img src={BSLStatus}/>Subway</a></li>
			<li style={ulLiShow}><a onClick={this.onClickNHSL} href="#" className="btn btn-lg btn-primary"><img src={NHSLStatus}/>NHSL</a></li>
			</ul>
			</center>

			{this.state.showBus && <NTABus />}

		    {this.state.showRR && <NTARR />}

		    <SocialMedia />
		    <ScrollUpButton ContainerclassName="ScrollUpButton__Container"/>

			</div>
			)
	}
}

export default NTAIndex;