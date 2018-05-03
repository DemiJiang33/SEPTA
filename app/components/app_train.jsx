import React from "react";
import fetchJsonp from "fetch-jsonp";
import ScrollUpButton from "react-scroll-up-button";

import Header from './header.jsx';
import Search from './train/search.jsx';
import SocialMedia from './social_media.jsx';

class AppTrain extends React.Component{

	constructor(props){
		super(props);
		this.state ={
			trains: [], //initiate state.trains
			alertTrains: [],
			error: '',
			genericAlert: '',
			line:''
		};
	};

	componentDidMount(){
		this.tick();
		this.timerID = setInterval(
			() => this.tick(),
			10000 // update every 10 second
			);
	}

	componentWillMount(){
		var pathname = this.props.location.pathname;
		var pathExist = pathname.includes('regionalrail/');
		if(pathExist){
			var pathArray = this.props.location.pathname.split( 'regionalrail/' );
			var line = pathArray[1];
			this.setState({line: line});
		}
		//console.log(pathExist);
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

    //http://apitest.septa.org/beta/TrainView/    The old API

    //https://apitest.septa.org/api/TrainView/badindex.php  TrainView - Kill Switch On
	tick(){

		//get the Generic Alert data
		fetchJsonp(`https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=generic`,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			//console.log(json[0]);
			if(json[0].current_message){
				this.setState({genericAlert: json[0].current_message});
			}else{
				return null;
			}
		});

		//get the TrainView API data
		// Old version https://www3.septa.org/api/TrainView/index.php
		fetchJsonp(`https://apitest.septa.org/api/TrainView/`,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			//console.log(json[0].error);
			if(!json[0].error){
				this.setState({trains: json});
			}else{
				this.setState({error: json[0].error});
			}
		});

		//get the Alert API data
		fetchJsonp(`https://www3.septa.org/api/Alerts/get_alert_data.php?
			req1=rr_route_warm,rr_route_gc,rr_route_med,rr_route_apt,
			rr_route_che,rr_route_chw,rr_route_cyn,rr_route_fxc,rr_route_landdoy,
			rr_route_nor,rr_route_pao,rr_route_trent,rr_route_wilm,rr_route_wtren`,{
				timeout: 6000,
			}).then(
			response =>{
				return response.json()
			}).then(
			json =>{
				this.setState({alertTrains: json});
			});
	}

	render(){
		//console.log(this.state.line);
		return(
			<div className = "component">
			<Header />
		    <hr/>
		    {this.state.genericAlert && <p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: this.state.genericAlert}} />}
		    {this.state.error && <p style={{color: 'red'}}>{this.state.error}</p>}
		    <Search trains={this.state.trains} alertTrains={this.state.alertTrains} 
		    error={this.state.error} line={this.state.line} />
		    <SocialMedia />
		    <ScrollUpButton ContainerClassName="ScrollUpButton__Container"/>
		    </div>
			)
	}
}

export default AppTrain;