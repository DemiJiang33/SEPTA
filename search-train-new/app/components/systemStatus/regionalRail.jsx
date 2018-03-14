import React from "react";
import fetchJsonp from "fetch-jsonp";

import LineStatus from './line_status.jsx'
import RRStatus from '../../../images/rr-status.png';

class RegionalRail extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			showRR: true,
			statusLines: []
		};
		this.onClickRR = this.onClickRR.bind(this);
	}

	componentDidMount(){
		var url = "https://www3.septa.org/api/Alerts/get_alert_data.php?req1=rr_route_warm,rr_route_gc,rr_route_med,rr_route_apt,rr_route_che,rr_route_chw,rr_route_cyn,rr_route_fxc,rr_route_landdoy,rr_route_nor,rr_route_pao,rr_route_trent,rr_route_wilm,rr_route_wtren";
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

	onClickRR(){
		this.setState({showRR: !this.state.showRR});
	}

	render(){
		if(!this.state.statusLines){
			<div>Loading...</div>
		}

		var RRUpOrDown;
		if(this.state.showRR){
			RRUpOrDown = String.fromCharCode('9652') + "Hide Regional Rail"
		}else{
			RRUpOrDown = String.fromCharCode('9662') + "Show Regional Rail"
		}

		const RRStyle={
			display: this.state.showRR ? 'block' : 'none'
		}

		return(
			<div>

			<div>
			<center>
			<h3><img src={RRStatus} />&nbsp;&nbsp;Regional Rail Lines</h3>
			</center>
			<button onClick={this.onClickRR}
			className ='btn btn-primary btn-md btn-block'>{RRUpOrDown}</button>
			</div>

			<div style={RRStyle}>
			<div >
			<center>
			<h3>A-W</h3>
			</center>
			</div>
			<ul className="line-status">
			{this.state.statusLines.map(function(statusLine,i){
				return(
					<LineStatus statusLine={statusLine} key={i} />
					)
			})}
			<br className="brHidden"/>
			<br className="brHidden"/>
			</ul>
			<br/>
			</div>

			</div>
			)

	}
}

export default RegionalRail;