import React from "react";
import fetchJsonp from "fetch-jsonp";
import ScrollUpButton from "react-scroll-up-button";

import SocialMedia from '../social_media.jsx';
import Header from '../header.jsx';
import BusRoutes from './busRoutes.jsx'
import RegionalRail from './regionalRail.jsx'
import Others from './others.jsx'

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

		return(
			<div>

			<Header />
		    <hr/>

			<div style={{float: 'left', width: '300px'}}>
			<div style={{float: 'left', width: '55px'}}>
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
			</div>

			<div style={{clear: 'both'}}>
			{this.state.genericAlert && <p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: this.state.genericAlert}} />}

            <center>
			<ul style={ulShow} className="nav navbar-inverse">
			<li style={ulLiShow}><a onClick={this.onClickBus} href="#" className="btn btn-lg btn-primary"><img src={busStatus}/>Bus</a></li>
			<li style={ulLiShow}><a onClick={this.onClickTrolley} href="#" className="btn btn-lg btn-primary"><img src={trolleyStatus}/>Trolley</a></li>
			<li style={ulLiShow}><a onClick={this.onClickRR} href="#" className="btn btn-lg btn-primary"><img src={RRStatus}/>Rail</a></li>
			<li style={ulLiShow}><a onClick={this.onClickMFL} href="#" className="btn btn-lg btn-primary"><img src={MFLStatus}/>MFL</a></li>
			<li style={ulLiShow}><a onClick={this.onClickBSL} href="#" className="btn btn-lg btn-primary"><img src={BSLStatus}/>BSL</a></li>
			<li style={ulLiShow}><a onClick={this.onClickNHSL} href="#" className="btn btn-lg btn-primary"><img src={NHSLStatus}/>NHSL</a></li>
			<li style={ulLiShow}><a onClick={this.onClickCCT} href="#" className="btn btn-lg btn-primary"><img src={CCTStatus}/>CCT</a></li>
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