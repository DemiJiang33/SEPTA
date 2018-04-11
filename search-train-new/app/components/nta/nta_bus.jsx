import React from "react";
import axios from "axios";

import fromArrow from '../../../images/fromArrow.gif';
import toArrow from '../../../images/toArrow.gif';
import busStatus from '../../../images/bus-status.png';

class NTABus extends React.Component{
	constructor(props){
		super(props);
		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleChange3 = this.handleChange3.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange1(event) {
		
	}

	handleChange2(event) {
		
	}

	handleChange3(event) {
		
	}

	handleSubmit() {
		
	}


	componentDidMount(){
		axios.get('https://vnjb5kvq2b.execute-api.us-east-1.amazonaws.com/prod/realtimearrivals',{
			params:{
				route: 23,
				origin :32331,
				destination: 21222,
				type: 'bus',
				version: 2
			},
			timeout: 6000,
			headers: {
				'x-api-key': 'qL96DavLyn8WU1hZK76SE6iMGph1v2195zbxuvjr',
				'accept': 'application/json'
			},
		}).then(response =>{
			console.log(response.data);
		});    
	}

	render(){
		const styleTitle={
			backgroundColor: '#144B88',
			marginBottom: '1px',
			marginTop: 0,
			textAlign: 'center',
			color: 'white',
			fontSize: '24px'
		}

		const style={
			backgroundColor: '#144B88',
			marginBottom: '2px',
			marginRight: '-2px'
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

		return(
			<div>
			<h3 style={styleTitle}><img src={busStatus} />&nbsp;&nbsp;Bus</h3>

			<div style={style} className ="row">
		      <label className="col-sm-5 col-sm-4 col-form-label" style={styleLabel}><img src={busStatus} /> Your Route #</label>
		      <div className="col-sm-4 col-sm-4">
		      <select style={styleSelect} className="form-control" onChange={this.handleChange1}>

		        <option value="route">Please choose route #</option>

		      </select>
		      </div>
		      <div className="col-sm-3 col-sm-4">
		      <select style={styleSelect} className="form-control" onChange={this.handleChange1}>

		        <option value="route">Please choose route #</option>

		      </select>
		      </div>
		    </div>

		    <div style={style} className ="row">
		      <label className="col-sm-5 col-sm-4 col-form-label" style={styleLabel}><img src={fromArrow} /> Your Beginning Station</label>
		      <div className="col-sm-7 col-sm-8">
		      <select style={styleSelect} className="form-control" onChange={this.handleChange2}>

		        <option value="station">Please choose station name</option>

		      </select>
		      </div>
		    </div>

		    <div style={style} className ="row">
		      <label className="col-sm-5 col-sm-4 col-form-label" style={styleLabel}><img src={toArrow} />Your Destination Station</label>
		      <div className="col-sm-7 col-sm-8">
		      <select style={styleSelect} className="form-control" onChange={this.handleChange3}>

		        <option value="station">Please choose station name</option>

		      </select>
		      </div>
		    </div>

		    <div>
		    <button type="submit" onClick={this.handleSubmit} className="btn btn-block btn-primary">Submit</button>
		    </div>

			</div>
			)
	}
}

export default NTABus;
