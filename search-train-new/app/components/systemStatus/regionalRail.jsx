import React from "react";
import fetchJsonp from "fetch-jsonp";

import LineStatus from './line_status.jsx'
import RRStatus from '../../../images/rr-status.png';

class RegionalRail extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			statusLines: []
		};
	}

	componentDidMount(){
		var url = "https://www3.septa.org/api/Alerts/index.php";
		// old url "https://www3.septa.org/api/Alerts/get_alert_data.php?req1=rr_route_warm,rr_route_gc,rr_route_med,rr_route_apt,rr_route_che,rr_route_chw,rr_route_cyn,rr_route_fxc,rr_route_landdoy,rr_route_nor,rr_route_pao,rr_route_trent,rr_route_wilm,rr_route_wtren";
		//get the detail of Alert data
		fetchJsonp(url,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			this.setState({statusLines: json});
			});
	}

	render(){
		if(!this.state.statusLines){
			<div>Loading...</div>
		}

		return(
			<div>

			<center>
			<h3><img src={RRStatus} alt="RRStatus" />&nbsp;&nbsp;Regional Rail Lines</h3>
			<hr/>
			</center>

			<ul className="line-status">
			{this.state.statusLines.map(function(statusLine,i){
				if(statusLine.mode == 'Regional Rail'){
					return(
					<LineStatus statusLine={statusLine} key={i} />
					)
				}
				
			})}
			<br className="brHiddenRR"/>
			<br className="brHiddenRR"/>
			</ul>
			<br/>

			</div>
			)

	}
}

export default RegionalRail;