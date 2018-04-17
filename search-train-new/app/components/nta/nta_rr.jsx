import React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
			submit: false
		};
		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onClickNearMe = this.onClickNearMe.bind(this);
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
		function distance(lat1, lon1, lat2, lon2) {
			var deltaX = diff(lat1, lat2);
			var deltaY = diff(lon1, lon2);
			var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
			return (dist);
		}

		function diff (num1, num2) {
			if (num1 > num2) {
				return (num1 - num2);
			} else {
				return (num2 - num1);
			}
		};

		var minDist = 1;
		var nearest_text = '*None*';

		navigator.geolocation.getCurrentPosition(function(location) {
			var latitude = location.coords.latitude;
			var longitude = location.coords.longitude;
			for (var i = 0 ; i < DATA.length ; i++){
				var lat = DATA[i].position.split(',')[0];
				var lon = DATA[i].position.split(',')[1];
				var markerDist = distance(latitude, longitude, lat, lon);
				//console.log(markerDist);
				//console.log(DATA[i].station);
				if(markerDist < minDist){
					minDist = markerDist;
					nearest_text = DATA[i].station;
				}
			}
			alert('The nearest station is : ' + nearest_text);
		});
		
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

		//console.log("b: " +this.state.bStation);
		//console.log("d: " +this.state.dStation);
		//console.log("submit: " +this.state.submit);

		const { bStation } = this.state;
		const { dStation } = this.state;


		return(
			<div>
			<h3 style={styleTitle}><img src={RRStatus} />&nbsp;&nbsp;Regional Rail</h3>

			<div style={style} className ="row">
		      <label className="col-sm-5 col-sm-4 col-form-label" style={styleLabel}><img src={fromArrow} /> Beginning Station</label>
		      <div className="col-sm-7 col-sm-8">
		      <Select
		      style={styleSelect}
		      name="form-field-name"
		      value={bStation}
		      onChange={this.handleChange1}
		      options={OPTION}
		      />
		      </div>
		    </div>

		    <div style={style} className ="row">
		      <label className="col-sm-5 col-sm-4 col-form-label" style={styleLabel}><img src={toArrow} /> Destination Station</label>
		      <div className="col-sm-7 col-sm-8">
		      <Select
		      style={styleSelect}
		      name="form-field-name"
		      value={dStation}
		      onChange={this.handleChange2}
		      options={OPTION}
		      />
		      </div>
		    </div>

		    <div>
		    <button type="submit" onClick={this.handleSubmit} className="btn btn-block btn-primary">Submit</button>
		    </div>
		    <button onClick={this.onClickNearMe} style={{position:'absolute', top:5 ,right: 5}} >Near Me<img src={nearMe} /></button>
            {this.state.bStation && this.state.dStation &&
            	<NTARRResults bStation={this.state.bStation} dStation={this.state.dStation} submit={this.state.submit} />}
            </div>
            )
	}

}

export default NTARR;