import React from "react";
import fetchJsonp from "fetch-jsonp";
import OthersStatus from './others_status.jsx'

import MFLStatus from '../../../images/mfl-status.png';
import BSLStatus from '../../../images/bsl-status.png';
import NHSLStatus from '../../../images/nhsl-status.png';
import CCTStatus from '../../../images/cct-status.png';

class Others extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			showMFL: true,
			showBSL: true,
			showNHSL: true,
			showCCT: true
		};
		this.onClickMFL = this.onClickMFL.bind(this);
		this.onClickBSL = this.onClickBSL.bind(this);
		this.onClickNHSL = this.onClickNHSL.bind(this);
		this.onClickCCT = this.onClickCCT.bind(this);
	}

	onClickMFL(){
		this.setState({showMFL: !this.state.showMFL});
	}
	onClickBSL(){
		this.setState({showBSL: !this.state.showBSL});
	}
	onClickNHSL(){
		this.setState({showNHSL: !this.state.showNHSL});
	}
	onClickCCT(){
		this.setState({showCCT: !this.state.showCCT});
	}

	render(){
		var MFLUpOrDown;
		if(this.state.showMFL){
			MFLUpOrDown = String.fromCharCode('9652') + "Hide Market/Frankford Line"
		}else{
			MFLUpOrDown = String.fromCharCode('9662') + "Show Market/Frankford Line"
		}

		var BSLUpOrDown;
		if(this.state.showBSL){
			BSLUpOrDown = String.fromCharCode('9652') + "Hide Broad Street Line"
		}else{
			BSLUpOrDown = String.fromCharCode('9662') + "Show Broad Street Line"
		}

		var NHSLUpOrDown;
		if(this.state.showNHSL){
			NHSLUpOrDown = String.fromCharCode('9652') + "Hide Norristown High Speed Line"
		}else{
			NHSLUpOrDown = String.fromCharCode('9662') + "Show Norristown High Speed Line"
		}

		var CCTUpOrDown;
		if(this.state.showCCT){
			CCTUpOrDown = String.fromCharCode('9652') + "Hide CCT"
		}else{
			CCTUpOrDown = String.fromCharCode('9662') + "Show CCT"
		}

		const MFLStyle={
			display: this.state.showMFL ? 'block' : 'none'
		}
		const BSLStyle={
			display: this.state.showBSL ? 'block' : 'none'
		}
		const NHSLStyle={
			display: this.state.showNHSL ? 'block' : 'none'
		}
		const CCTStyle={
			display: this.state.showCCT ? 'block' : 'none'
		}

		return(
			<div>

			<div>
			<center>
			<h3><img src={MFLStatus} />&nbsp;&nbsp;Market/Frankford Line</h3>
			</center>
			<button onClick={this.onClickMFL}
			className ='btn btn-primary btn-md btn-block'>{MFLUpOrDown}</button>
			</div>
			<div style={MFLStyle}>
			<ul className="others-status">
			<OthersStatus line="rr_route_mfl" />
			<OthersStatus line="rr_route_mfo" />
			</ul>
			<br/>
			</div>


			<div>
			<center>
			<h3><img src={BSLStatus} />&nbsp;&nbsp;Broad Street Line</h3>
			</center>
			<button onClick={this.onClickBSL}
			className ='btn btn-primary btn-md btn-block'>{BSLUpOrDown}</button>
			</div>
			<div style={BSLStyle}>
			<ul className="others-status">
			<OthersStatus line="rr_route_bsl" />
			<OthersStatus line="rr_route_bso" />
			</ul>
			<br/>
			</div>


			<div>
			<center>
			<h3><img src={NHSLStatus} />&nbsp;&nbsp;Norristown High Speed Line</h3>
			</center>
			<button onClick={this.onClickNHSL}
			className ='btn btn-primary btn-md btn-block'>{NHSLUpOrDown}</button>
			</div>
			<div style={NHSLStyle}>
			<ul className="others2-status">
			<OthersStatus line="rr_route_nhsl" />
			</ul>
			<br/>
			</div>


			<div>
			<center>
			<h3><img src={CCTStatus} />&nbsp;&nbsp;CCT</h3>
			</center>
			<button onClick={this.onClickCCT}
			className ='btn btn-primary btn-md btn-block'>{CCTUpOrDown}</button>
			</div>
			<div style={CCTStyle}>
			<ul className="others2-status">
			<OthersStatus line="cct" />
			</ul>
			<br/>
			</div>

			</div>
			)

	}

}

export default Others;