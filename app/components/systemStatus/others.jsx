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
			statusOthers: []
		};
	}

	componentDidMount(){
		var url = "https://www3.septa.org/api/Alerts/index.php";
		//get the detail of Alert data
		fetchJsonp(url,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			this.setState({statusOthers: json});
			});
	}


	render(){
		if(!this.state.statusOthers){
			<div>Loading...</div>
		}

		return(
			<div>

			{this.props.showMFL && <div>
			<center>
			<h3><img src={MFLStatus} alt="MFLStatus" />Market/Frankford Line</h3>
			<hr/>
			</center>
			<ul className="others-status">
			{this.state.statusOthers.map(function(statusOther,i){
				if(statusOther.mode == 'Market/ Frankford'){
					return(
					<OthersStatus statusOther={statusOther} key={i} />
					)
				}
				
			})}
			</ul>
			<br/>
			</div>}

			{this.props.showBSL && <div>
			<center>
			<h3><img src={BSLStatus} alt="BSLStatus" />Broad Street Line</h3>
			<hr/>
			</center>
			<ul className="others-status">
			{this.state.statusOthers.map(function(statusOther,i){
				if(statusOther.mode == 'Broad Street Line'){
					return(
					<OthersStatus statusOther={statusOther} key={i} />
					)
				}
				
			})}
			</ul>
			<br/>
			</div>}

			{this.props.showNHSL && <div>
			<center>
			<h3><img src={NHSLStatus} alt="NHSLStatus" />Norristown High Speed Line</h3>
			<hr/>
			</center>
			<ul className="others-cct-status">
			{this.state.statusOthers.map(function(statusOther,i){
				if(statusOther.mode == 'Norristown High Speed Line'){
					return(
					<OthersStatus statusOther={statusOther} key={i} />
					)
				}
				
			})}
			</ul>
			<br/>
			</div>}

			{this.props.showCCT && <div>
			<center>
			<h3><img src={CCTStatus} alt="CCTStatus"/>CCT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
			<hr/>
			</center>
			<ul className="others-cct-status">
			{this.state.statusOthers.map(function(statusOther,i){
				if(statusOther.mode == 'CCT'){
					return(
					<OthersStatus statusOther={statusOther} key={i} />
					)
				}
				
			})}
			</ul>
			<br/>
			</div>}

			</div>
			)

	}

}

export default Others;