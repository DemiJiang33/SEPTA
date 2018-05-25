/**
 * nta_rr.jsx file
 * This is the regional rail part of the Next to Arrive
 *
 */
import React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

import NTARRResults from './nta_rr_results.jsx';

import fromArrow from '../../../images/fromArrow.gif';
import toArrow from '../../../images/toArrow.gif';
import nearMe from '../../../images/nearMe.png';
import RRStatus from '../../../images/rr-status.png';

import DATA from '../../../data/stationPosition.json';
import OPTION from '../../../data/stationOption.json';

class NTARR extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			bStation: '',
			dStation: '',
			submit: false,
			coords: props.coords,
			position1: '',
			firstDist: '',
			//position2: '',
			//secondDist: '',
			//position3: '',
			//thirdDist: '',
		};
		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onClickNearMe = this.onClickNearMe.bind(this);
		this.onClickNearMe2 = this.onClickNearMe2.bind(this);
	}

	handleChange1(bStation) {
		if(bStation){
			this.setState({bStation: bStation.value});
		}else{
			this.setState({bStation: ''});
		}
	}

	handleChange2(dStation) {
		if(dStation){
			this.setState({dStation: dStation.value});
		}else{
			this.setState({dStation: ''});
		}
		
	}

	handleSubmit() {
		this.setState({submit: !this.state.submit});
	}

	onClickNearMe(){
		if(this.props.coords){
			function distance(lat1, lon1, lat2, lon2) {
			var radlat1 = Math.PI * lat1/180
			var radlat2 = Math.PI * lat2/180
			var theta = lon1-lon2
			var radtheta = Math.PI * theta/180
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			dist = Math.acos(dist)
			dist = dist * 180/Math.PI
			dist = dist * 60 * 1.1515;
			dist = (Math.round(dist * 100)/100).toFixed(2);
			return (dist);
		}

		var latitude = this.props.coords.latitude;
		var longitude = this.props.coords.longitude;
		var markerDist = [];

		var firstDist; //secondDist ,thirdDist;
		var position1; //position2, position3;
		firstDist = Number.MAX_VALUE;
		//firstDist = secondDist = thirdDist = Number.MAX_VALUE;
		position1 = '*None*';
		//position1 = position2 = position3 = '*None*';
		for (var i = 0 ; i < DATA.length ; i++){
			var lat = DATA[i].position.split(',')[0];
			var lon = DATA[i].position.split(',')[1];
			markerDist[i] = distance(latitude, longitude, lat, lon);

			if (markerDist[i] < firstDist){
                /*thirdDist = secondDist;
                position3 = position2;
                secondDist = firstDist;
                position2 = position1;*/
                firstDist = markerDist[i];
                position1 = DATA[i].station;
            }
       
            /* If markerDist[i] is in between firstDist and
            secondDist then update secondDist  */
            /*else if (markerDist[i] < secondDist){
                thirdDist = secondDist;
                position3 = position2;
                secondDist = markerDist[i];
                position2 = DATA[i].station;
            }
       
            else if (markerDist[i] < thirdDist){
            	thirdDist = markerDist[i];
            	 position3 = DATA[i].station;
            }*/
                
		}

		this.setState({
			position1: position1,
			firstDist: firstDist,
			bStation: position1,
			//position2: position2,
			//secondDist: secondDist,
			//position3: position3,
			//thirdDist: thirdDist
		});
		}
	}

	onClickNearMe2(){
		if(this.props.coords){
			function distance(lat1, lon1, lat2, lon2) {
			var radlat1 = Math.PI * lat1/180
			var radlat2 = Math.PI * lat2/180
			var theta = lon1-lon2
			var radtheta = Math.PI * theta/180
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			dist = Math.acos(dist)
			dist = dist * 180/Math.PI
			dist = dist * 60 * 1.1515;
			dist = (Math.round(dist * 100)/100).toFixed(2);
			return (dist);
		}

		var latitude = this.props.coords.latitude;
		var longitude = this.props.coords.longitude;
		var markerDist = [];

		var firstDist; 
		var position1; 
		firstDist = Number.MAX_VALUE;
		position1 = '*None*';
		for (var i = 0 ; i < DATA.length ; i++){
			var lat = DATA[i].position.split(',')[0];
			var lon = DATA[i].position.split(',')[1];
			markerDist[i] = distance(latitude, longitude, lat, lon);

			if (markerDist[i] < firstDist){
                firstDist = markerDist[i];
                position1 = DATA[i].station;
            }
    
		}

		this.setState({
			position1: position1,
			firstDist: firstDist,
			dStation: position1
		});
		}
	}

	render(){

		const style={
			backgroundColor: '#144B88',
			marginBottom: '2px',
			marginRight: '0',
			marginLeft: '0'
		}

		const styleLabel={
			marginTop: '5px',
			paddingLeft: '1px',
			fontSize: 'large',
			color: 'white'
		}

		const styleSelect={
			marginTop: '1px',
			marginBottom: '1px',
			fontSize: 'large'
		}

		const styleTitle={
			backgroundColor: '#144B88',
			marginBottom: '1px',
			marginTop: 0,
			textAlign: 'center',
			color: 'white',
			fontSize: '24px'
		}

		/*const styleRadio={
			display: this.state.showRadio ? 'block' : 'none'
		}*/

		//console.log("b: " +this.state.bStation);
		//console.log("d: " +this.state.dStation);
		//console.log("submit: " +this.state.submit);

		const { bStation } = this.state;
		const { dStation } = this.state;


		return(
			<div>
			<h3 style={styleTitle}><img src={RRStatus} alt="RRStatus" />&nbsp;&nbsp;Regional Rail</h3>

			{/*<div style={styleRadio}>
			<label className="radio-inline">
			The nearest station is {this.state.position1} ({this.state.firstDist} miles)
			</label>
			<label className="radio-inline">
			The nearest station 2 is {this.state.position2} ({this.state.secondDist} miles)
			</label>
			<label className="radio-inline">
			The nearest station 3 is {this.state.position3} ({this.state.thirdDist} miles)
			</label>
			<label className="radio-inline" onClick={this.onClickBeginning}>
			<input type="radio" name="optradio" value="" />
			Set as Beginning
			</label>

			<label className="radio-inline" onClick={this.onClickDestination}>
			<input type="radio" name="optradio" value="" />
			Set as Destination
			</label>
			</div>*/}

			<div style={style} className ="row">
		      <label className="col-sm-5 col-sm-4" style={styleLabel}><img src={fromArrow} alt="fromArrow" /> Your Beginning Station</label>
		      <div className="input-group col-sm-7 col-sm-8">
		      <Select
		      id = "beginning"
		      aria-label="search-bar-beginning"
		      style={styleSelect}
		      name="beginning"
		      value={bStation}
		      onChange={this.handleChange1}
		      options={OPTION}
		      />
		      <div className="input-group-btn">
		      <button className="btn btn-link" onClick={this.onClickNearMe}><img src={nearMe} alt="nearMe" /></button>
		      </div>
		      </div>
		    </div>

		    <div style={style} className ="row">
		      <label className="col-sm-5 col-sm-4" style={styleLabel}><img src={toArrow} alt="toArrow" /> Your Destination Station</label>
		      <div className="input-group col-sm-7 col-sm-8">
		      <Select
		      aria-label="search-bar-destination"
		      style={styleSelect}
		      name="destination"
		      value={dStation}
		      onChange={this.handleChange2}
		      options={OPTION}
		      />
		      <div className="input-group-btn">
		      <button className="btn btn-link" onClick={this.onClickNearMe2}><img src={nearMe} alt="nearMe" /></button>
		      </div>
		      </div>
		    </div>

		    <div>
		    <button type="submit" onClick={this.handleSubmit} className="btn btn-block btn-primary">Submit</button>
		    </div>
            {this.state.bStation && this.state.dStation &&
            	<NTARRResults bStation={this.state.bStation} dStation={this.state.dStation} submit={this.state.submit} />}
            </div>
            )
	}

}

export default NTARR;