import React from "react";
import Result from './result.jsx';

import MapComponent from './map_component.jsx';

class Results extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			foundTrains: props.trains,
			//initiate state.foundTrains
			alertTrains: props.alertTrains,
			compareTrains: [],
			showMap: true
		}
		this.onClickMove = this.onClickMove.bind(this);
	}

	componentWillReceiveProps(nextProps){
		//console.log(nextProps.query);
		var foundTrains = nextProps.trains.filter(train =>{
			if(nextProps.query == 'glenside combined'){
				return train.line.toLowerCase().match('warminster')
				|| train.line.toLowerCase().match('lansdale\/doylestown')
				|| train.line.toLowerCase().match('west trenton');
			}else{
				return train.line.toLowerCase().match('^' + nextProps.query.toLowerCase());
			}
		});

		foundTrains.sort(natSort);
		//sort() natural sorting pattern is to do numbers first, numbers with letters second
		//case insensitive, digits to number interpolation
		function natSort(as, bs){
			var as = as.trainno;
			var bs = bs.trainno;
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
			foundTrains: foundTrains,
		});
		//console.log("Results:" + foundTrains);

		var compareTrains = [foundTrains.length];
		var alertTrains = nextProps.alertTrains;
		//console.log(alertTrains);

		for(var i = 0; i < foundTrains.length; i++){
			for(var j =0; j<alertTrains.length; j++){
				if (foundTrains[i].line == alertTrains[j].route_name){
					compareTrains[i] = {
						trainNo:foundTrains[i].trainno,
						source: foundTrains[i].SOURCE,
						dest: foundTrains[i].dest,
						nextStop: foundTrains[i].nextstop,
						late: foundTrains[i].late,
						line: foundTrains[i].line,
						id: alertTrains[j].route_id,
						alert: alertTrains[j].current_message,
						message: alertTrains[j].advisory_message}
				}
			}
		}

		this.setState({
			compareTrains: compareTrains,
		});

	}

	onClickMove(){
		this.setState({showMap: !this.state.showMap});
	}

	render(){
		var lateNo;
		var lateLine;
		var lateStop;
		if(window.innerWidth>768){
			lateNo ={
				width: '18%',
				borderLeft:'#dddddd'
			}
			lateLine={
				width: '18%'
			}
			lateStop ={
				width: '16%'
			}
		}else{
			lateNo ={
				width: '23%',
				borderLeft:'#dddddd'
			}
			lateLine={
				width: '31%'
			}
			lateStop ={
				width: '31%'
			}
		}

		const lateStatus ={
			//width: '18.5%',
			borderRight:'#dddddd'
		}

		const mapStyle={
			display: this.state.showMap ? 'block' : 'none'
		}

		var upOrDown;
		if(this.state.showMap){
			upOrDown = String.fromCharCode('9652') + "Hide Map"
		}else{
			upOrDown = String.fromCharCode('9662') + "Show Map"
		}

		var error = this.props.error;

		return(
			<div>

			<div style={mapStyle}>
			<MapComponent trains={this.state.foundTrains} />
			</div>

            <button onClick={this.onClickMove}
			className ='btn btn-primary btn-md btn-block'>{upOrDown}</button>
			<div className = "result_title">
			<table>
			<thead>
			<tr>
			<th style={lateNo}>Train #</th>
			<th style={lateLine}>Line</th>
			<th id="hideTh1">Origin</th>
			<th id="hideTh2">Dest.</th>
			<th id="nextStopTh" style={lateStop}>Next Stop</th>
			{/*<th>Service</th>*/}
			<th style={lateStatus}>Late</th>
			{/*<th>Latitude</th>
			<th>Longtitude</th>
			<th>Train Line</th>*/}
			</tr>
			</thead>
			</table>
			</div>

			<div className ="result">
			{this.state.compareTrains.map(function(train,i){
				return(
					<Result train={train} key={i} error={error} />
					)
			})}
			</div>

			</div>
			)
	}
}

export default Results;