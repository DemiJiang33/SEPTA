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
	}

	render(){

		return(
			<div>

			{this.props.showMFL && <div>
			<center>
			<h3><img src={MFLStatus} />Market/Frankford Line</h3>
			<hr/>
			</center>
			<ul className="others-status">
			<OthersStatus line="rr_route_mfl" />
			<OthersStatus line="rr_route_mfo" />
			</ul>
			<br/>
			</div>}

			{this.props.showBSL && <div>
			<center>
			<h3><img src={BSLStatus} />Broad Street Line</h3>
			<hr/>
			</center>
			<ul className="others-status">
			<OthersStatus line="rr_route_bsl" />
			<OthersStatus line="rr_route_bso" />
			</ul>
			<br/>
			</div>}

			{this.props.showNHSL && <div>
			<center>
			<h3><img src={NHSLStatus} />Norristown High Speed Line</h3>
			<hr/>
			</center>
			<ul className="others-cct-status">
			<OthersStatus line="rr_route_nhsl" />
			</ul>
			<br/>
			</div>}

			{this.props.showCCT && <div>
			<center>
			<h3><img src={CCTStatus} />CCT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
			<hr/>
			</center>
			<ul className="others-cct-status">
			<OthersStatus line="cct" />
			</ul>
			<br/>
			</div>}

			</div>
			)

	}

}

export default Others;