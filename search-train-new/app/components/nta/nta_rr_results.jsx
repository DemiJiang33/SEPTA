import React from "react";
import fetchJsonp from "fetch-jsonp";

import NTARRResult from './nta_rr_result.jsx';

import fromArrow from '../../../images/fromArrow.gif';
import toArrow from '../../../images/toArrow.gif';

class NTARRResults extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			bStation: props.bStation,
			dStation: props.dStation,
			submit: props.submit,
			ntaResults: [],
			show: false,
			showAdvice: false
		};
	}

	componentWillReceiveProps(nextProps){
		//console.log("next: "+nextProps.submit);
		//console.log("this: "+this.props.submit);

		var bStation = nextProps.bStation;
		var dStation = nextProps.dStation;

		//console.log("b: " +bStation);
		//console.log("d: " +dStation);

		if(nextProps.submit != this.props.submit){
			var url = "https://www3.septa.org/hackathon/NextToArrive/?req1=" +bStation+ "&req2=" +dStation+ "&req3=10&callback=?";
			//get the detail of Alert data
			fetchJsonp(url,{
				timeout: 6000,
			}).then(
			response =>{
				return response.json()
			}).then(
			json =>{
				this.setState({ntaResults: json});
				if(json.length == 0){
					this.setState({show: true});
				}else{
					this.setState({show: false});
				}
			});
		}

		if((nextProps.bStation != this.props.bStation) || (nextProps.dStation != this.props.dStation)){
			this.setState({showAdvice: true});
		}else{
			this.setState({showAdvice: false});
		}
	};

	render(){
		var length = this.state.ntaResults.length;
		const title ={
			textAlign:"center",
			margin: 0,
			backgroundColor: '#000066',
			color: 'white'
		}

		var dStation = this.props.dStation;

		return(
			<div>
			{this.state.showAdvice && 
			<center>
			<h4>Please click Sumbit Button again! &#x1f446;
			</h4>
			</center>}

			<h4 className="well well-sm" style ={title}>
			<img src={fromArrow} alt="fromArrow" /> <strong> {this.props.bStation} </strong>&nbsp;&nbsp;
			<img src={toArrow} alt="toArrow" /> <strong> {this.props.dStation} </strong>
			</h4>

			{this.state.show && 
			<p style={{color: 'red'}}>There are no trains available to complete this trip.	
			</p>}
			<div>
			{this.state.ntaResults.map(function(ntaResult,i){
				return(
					<NTARRResult ntaResult={ntaResult} key={i} length={length} id={i+1} dStation={dStation}/>
					)
			})}
			</div>
			</div>
			)
	}
}

export default NTARRResults;