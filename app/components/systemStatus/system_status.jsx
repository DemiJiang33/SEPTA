/**
 * system_status.jsx file
 * This is the index of the system status part
 *
 */
import React from "react";
import fetchJsonp from "fetch-jsonp";
import ScrollUpButton from "react-scroll-up-button";

import SocialMedia from '../social_media.jsx';
import Header from '../header.jsx';
import BusRoutes from './busRoutes.jsx'
import RegionalRail from './regionalRail.jsx'
import Others from './others.jsx'

import suspended from '../../../images/suspended.png';
import advisory from '../../../images/advisory.png';
import alert from '../../../images/alert.png';
import detour from '../../../images/detour.png';
import pin from '../../../images/pin.png';

import busStatus from '../../../images/bus-status.png';
import trolleyStatus from '../../../images/trolley-status.png';
import RRStatus from '../../../images/rr-status.png';
import MFLStatus from '../../../images/mfl-status.png';
import BSLStatus from '../../../images/bsl-status.png';
import NHSLStatus from '../../../images/nhsl-status.png';
import CCTStatus from '../../../images/cct-status.png';

import '../../../style/ss.css';

class SystemStatus extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			showBus: true,
			showTrolley: false,
			showRR: false,
			showMFL: false,
			showBSL: false,
			showNHSL: false,
			showCCT: false,
			genericAlert: ''
		};
		this.onClickBus = this.onClickBus.bind(this);
		this.onClickTrolley = this.onClickTrolley.bind(this);
		this.onClickRR = this.onClickRR.bind(this);
		this.onClickMFL = this.onClickMFL.bind(this);
		this.onClickBSL = this.onClickBSL.bind(this);
		this.onClickNHSL = this.onClickNHSL.bind(this);
		this.onClickCCT = this.onClickCCT.bind(this);
	}

	onClickBus(){
		this.setState({
			showBus: true,
			showTrolley: false,
			showRR: false,
			showMFL: false,
			showBSL: false,
			showNHSL: false,
			showCCT: false
		});
	}
	onClickTrolley(){
		this.setState({
			showBus: false,
			showTrolley: true,
			showRR: false,
			showMFL: false,
			showBSL: false,
			showNHSL: false,
			showCCT: false
		});
	}
	onClickRR(){
		this.setState({
			showBus: false,
			showTrolley: false,
			showRR: true,
			showMFL: false,
			showBSL: false,
			showNHSL: false,
			showCCT: false
		});
	}
	onClickMFL(){
		this.setState({
			showBus: false,
			showTrolley: false,
			showRR: false,
			showMFL: true,
			showBSL: false,
			showNHSL: false,
			showCCT: false
		});
	}
	onClickBSL(){
		this.setState({
			showBus: false,
			showTrolley: false,
			showRR: false,
			showMFL: false,
			showBSL: true,
			showNHSL: false,
			showCCT: false
		});
	}
	onClickNHSL(){
		this.setState({
			showBus: false,
			showTrolley: false,
			showRR: false,
			showMFL: false,
			showBSL: false,
			showNHSL: true,
			showCCT: false
		});
	}
	onClickCCT(){
		this.setState({
			showBus: false,
			showTrolley: false,
			showRR: false,
			showMFL: false,
			showBSL: false,
			showNHSL: false,
			showCCT: true
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

		var clickedBus = {
			backgroundColor: this.state.showBus ? '#333F48' : ''
		}
		var clickedTrolley ={
			backgroundColor: this.state.showTrolley ? '#658D1B' : ''
		}
		var clickedRR ={
			backgroundColor: this.state.showRR ? '#4F758B' : ''
		}
		var clickedMFL ={
			backgroundColor: this.state.showMFL ? '#0072CE' : ''
		}
		var clickedBSL ={
			backgroundColor: this.state.showBSL ? '#FF671F' : ''
		}
		var clickedNHSL ={
			backgroundColor: this.state.showNHSL ? '#6D2077' : ''
		}
		var clickedCCT ={
			backgroundColor: this.state.showCCT ? '#001489' : ''
		}

		return(
			<div>

			<Header />
		    <hr/>
            
			<div style={{float: 'left', width: '300px'}}>
			<center>
			<div style={{float: 'left', marginLeft: '5px', width: '55px'}}>
			<img alt="Line Suspended" title="Line Suspended" src={suspended} />
			<p style={{font: 'bold 10px helvetica'}}>Line Suspended</p>
			</div>
			<div style={{float: 'left', marginLeft: '5px', width: '55px'}}>
			<img alt="Service Alert" title="Service Alert" src={alert} />
			<p style={{font: 'bold 10px helvetica'}}>Service Alert</p>
			</div>
			<div style={{float: 'left', width: '55px'}}>
			<img alt="Detour" title="Detour" src={detour} />
			<p style={{font: 'bold 10px helvetica'}}>Detour</p>
			</div>
			<div style={{float: 'left', width: '55px'}}>
			<img alt="Service Advisory" title="Service Advisory" src={advisory} />
			<p style={{font: 'bold 10px helvetica'}}>Service Advisory</p>
			</div>
			<div style={{float: 'left', width: '55px'}}>
			<img alt="TransitView" title="TransitView" src={pin} />
			<p style={{font: 'bold 10px helvetica'}}>TransitView</p>
			</div>
			</center>
			</div>

			<div style={{clear: 'both'}}>
			{this.state.genericAlert && <p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: this.state.genericAlert}} />}

            <center>
			<ul style={ulShow} className="nav navbar-inverse">
			<li style={ulLiShow}><a id="hoverBus" style={clickedBus} onClick={this.onClickBus} href="#" className="btn btn-lg btn-primary"><img src={busStatus} alt="busStatus" />Bus</a></li>
			<li style={ulLiShow}><a id="hoverTrolley" style={clickedTrolley} onClick={this.onClickTrolley} href="#" className="btn btn-lg btn-primary"><img src={trolleyStatus} alt="trolleyStatus" />Trolley</a></li>
			<li style={ulLiShow}><a id="hoverRR" style={clickedRR} onClick={this.onClickRR} href="#" className="btn btn-lg btn-primary"><img src={RRStatus} alt="RRStatus" />Rail</a></li>
			<li style={ulLiShow}><a id="hoverMFL" style={clickedMFL} onClick={this.onClickMFL} href="#" className="btn btn-lg btn-primary"><img src={MFLStatus} alt="MFLStatus" />MFL</a></li>
			<li style={ulLiShow}><a id="hoverBSL" style={clickedBSL} onClick={this.onClickBSL} href="#" className="btn btn-lg btn-primary"><img src={BSLStatus} alt="BSLStatus" />BSL</a></li>
			<li style={ulLiShow}><a id="hoverNHSL" style={clickedNHSL} onClick={this.onClickNHSL} href="#" className="btn btn-lg btn-primary"><img src={NHSLStatus} alt="NHSLStatus" />NHSL</a></li>
			<li style={ulLiShow}><a id="hoverCCT" style={clickedCCT} onClick={this.onClickCCT} href="#" className="btn btn-lg btn-primary"><img src={CCTStatus} alt="CCTStatus" />CCT</a></li>
			</ul>
			</center>


			<BusRoutes showBus={this.state.showBus} showTrolley={this.state.showTrolley}/>
			{this.state.showRR && <RegionalRail/>}
			<Others showMFL={this.state.showMFL} showBSL={this.state.showBSL} 
			showNHSL={this.state.showNHSL} showCCT={this.state.showCCT}/>
			</div>

			<SocialMedia />
		    <ScrollUpButton ContainerClassName="ScrollUpButton__Container"/>

			</div>
			)
	}
}

export default SystemStatus;