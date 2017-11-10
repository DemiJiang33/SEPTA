import React from "react";
import ScrollUpButton from "react-scroll-up-button";

import BusResult from './bus_result.jsx';
import BusMap from './bus_map.jsx';
import Alert from './alert.jsx';
import Advisory from './advisory.jsx';
import Detours from './detours.jsx';
import DetourTrolley from './detour_trolley.jsx';

class BusResults extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			foundBuses: props.buses,
			//initiate state.foundBuses
			showAlert: false,
			showDetour: false,
			showAdvisory: false
		}
	}

	componentWillReceiveProps(nextProps){
		var foundBuses = nextProps.buses.filter(bus =>{
			return bus.VehicleID.toLowerCase().match(nextProps.query.toLowerCase()) ||
			bus.destination.toLowerCase().match(nextProps.query.toLowerCase());
		});

		foundBuses.sort(natSort);
		//sort() natural sorting pattern is to do numbers first, numbers with letters second
		//case insensitive, digits to number interpolation
		function natSort(as, bs){
			var as = as.VehicleID;
			var bs = bs.VehicleID;
			var a, b, a1, b1, i= 0, L, rx= /(\d+)|(\D+)/g, rd= /\d/;
			if(isFinite(as) && isFinite(bs)) return as - bs;
			a= String(as).toLowerCase();
			b= String(bs).toLowerCase();
			if(a=== b) return 0;
			if(!(rd.test(a) && rd.test(b))) return a> b? 1: -1;
			a= a.match(rx);
			b= b.match(rx);
			L= a.length> b.length? b.length: a.length;
			while(i < L){
				a1= a[i];
				b1= b[i++];
				if(a1!== b1){
					if(isFinite(a1) && isFinite(b1)){
						if(a1.charAt(0)=== "0") a1= "." + a1;
						if(b1.charAt(0)=== "0") b1= "." + b1;
						return a1 - b1;
					}
					else return a1> b1? 1: -1;
				}
			}
			return a.length - b.length;
		}

		this.setState({
			foundBuses: foundBuses
		});
	}

	onClickAlert(e){
		e.preventDefault();
		this.setState({showAlert: !this.state.showAlert})
	}

	onClickDetour(e){
		e.preventDefault();
		this.setState({showDetour: !this.state.showDetour})
	}

	onClickAdvisory(e){
		e.preventDefault();
		this.setState({showAdvisory: !this.state.showAdvisory})
	}


	render(){

		const title ={
			textAlign:"center",
			marginBottom: "1px",
			marginTop: "1px"
		}

		var styleDest;
		if(window.innerWidth<=320){
			styleDest ={
				width: '40%'
			}
		}

		const style1 = {
			borderLeft:'#dddddd'
		}

		const style2 = {
			borderRight:'#dddddd'
		}

		const divStyle = {
			border: '1px solid #4d0000',
		}

		const alertStyle ={
			display: this.state.showAlert ? 'block' : 'none',
			border: '1px solid #4d0000',
			marginTop: '10px',
			marginBottom: '10px'
		}

		const detourStyle ={
			display: this.state.showDetour ? 'block' : 'none',
			border: '1px solid #4d0000',
			marginTop: '10px',
			marginBottom: '10px'
		}

		const advisoryStyle ={
			display: this.state.showAdvisory ? 'block' : 'none',
			border: '1px solid #4d0000',
			marginTop: '10px',
			marginBottom: '10px'
		}

		var bt;
		if((this.props.bt)== "bus"){
			bt = "Bus";
		}else{
			bt = "Trolley";
		}

		return(
			<div>
			<BusMap buses={this.state.foundBuses} route={this.props.route} />

			<div style={divStyle}>

            <h4 className="well well-sm" style ={title}>
            <strong>{bt} {this.props.route}&nbsp;</strong>
            {this.props.alerts.current_message && <a href="#" onClick={this.onClickAlert.bind(this)}>
			<img src='../images/alert-icon.png' />
			</a>}
			{this.props.alerts.detour_message && <a href="#" onClick={this.onClickDetour.bind(this)}>
			<img src='../images/detour-icon.png' />
			</a>}
			{this.props.alerts.advisory_message && <a href="#" onClick={this.onClickAdvisory.bind(this)}>
			<img src='../images/advisory-icon.png' />
			</a>}
            </h4>

            <div style={alertStyle}>
			<Alert route={this.props.route} bt={this.props.bt} alerts={this.props.alerts} />
			<button onClick={this.onClickAlert.bind(this)}
			className ='btn btn-sm btn-danger btn-block'>Close</button>
			</div>
			<div style={detourStyle}>
			{this.props.alerts.detour_message && (this.props.bt == "bus") && <Detours route={this.props.route} bt={this.props.bt} />}
			{(this.props.bt == "trolley") && <DetourTrolley route={this.props.route} bt={this.props.bt} alerts={this.props.alerts} />}
			<button onClick={this.onClickDetour.bind(this)}
			className ='btn btn-sm btn-danger btn-block'>Close</button>
			</div>
			<div style={advisoryStyle}>
			<Advisory route={this.props.route} bt={this.props.bt} alerts={this.props.alerts} />
			<button onClick={this.onClickAdvisory.bind(this)}
			className ='btn btn-sm btn-danger btn-block'>Close</button>
			</div>

			<h4 className="well well-sm" style ={title}>
            <strong>Schedule for {bt} # {this.props.route}</strong>
            </h4>
			<table className="sortable">
			<thead>
			<tr>
			<th style={style1}>Viehle ID</th>
			<th id="hideTh1">Direction</th>
			<th style={styleDest}>Destination</th>
			<th style={style2}>Status</th>
			</tr>
			</thead>
			<tbody>
			{this.state.foundBuses.map(function(bus,i){
				return(
					<BusResult bus={bus} key={i} />
					)
			})}
			</tbody>
			</table>
			</div>

			<ScrollUpButton />
			</div>
			)
	}
}

export default BusResults;