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
			compareTrains: []
		}
	}

	componentWillReceiveProps(nextProps){
		var foundTrains = nextProps.trains.filter(train =>{
			return train.trainno.toLowerCase().match(nextProps.query.toLowerCase()) ||
			train.SOURCE.toLowerCase().match(nextProps.query.toLowerCase()) ||
			train.dest.toLowerCase().match(nextProps.query.toLowerCase());
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

		var lateMessage;
		for(var i = 0; i < foundTrains.length; i++){
			for(var j =0; j<alertTrains.length; j++){
				if (foundTrains[i].line == alertTrains[j].route_name){
					if((foundTrains[i].late) =='0'){
							lateMessage = 'On Time';
						    }else if((foundTrains[i].late) =='999'){
						    	lateMessage = 'Suspended';
						    }else{
						    	lateMessage = foundTrains[i].late;
						    }
					compareTrains[i] = {
						trainNo:foundTrains[i].trainno,
						source: foundTrains[i].SOURCE,
						dest: foundTrains[i].dest,
						nextStop: foundTrains[i].nextstop,
						late: lateMessage,
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

	render(){
		const lateNo ={
			width: '27%',
			borderLeft:'#dddddd'
		}

		const lateStatus ={
			width: '15%',
			borderRight:'#dddddd'
		}

		return(
			<div>
			<MapComponent trains={this.state.foundTrains} />

			<div className = "result_title">
			<table>
			<tbody>
			<tr>
			<th style={lateNo}>Train #</th>
			<th id="hideTh1">Origin</th>
			<th id="hideTh2">Dest.</th>
			<th id="nextStopTh">Next Stop</th>
			{/*<th>Service</th>*/}
			<th style={lateStatus}>Status</th>
			{/*<th>Latitude</th>
			<th>Longtitude</th>
			<th>Train Line</th>*/}
			</tr>
			</tbody>
			</table>
			</div>

			<div className ="result">
			{this.state.compareTrains.map(function(train,i){
				return(
					<Result train={train} key={i}/>
					)
			})}
			</div>
			</div>
			)
	}
}

export default Results;