import React from "react";
import fetchJsonp from "fetch-jsonp";

import Detour from './detour.jsx';

import detourTopIcon from '../../../images/detour-top-icon.png';

let mounted = true;

class Detours extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			detours:[]
		}
	}

	componentDidMount() {
		mounted = true;
	}

	componentWillUnmount() {
		mounted = false;
	}

	componentWillReceiveProps(nextProps){
		var route = nextProps.route;
		var url = "https://www3.septa.org/hackathon/BusDetours/?req1=" + route;

		//console.log(mounted);

		if(!mounted){
			return
		}else{
			//get the detail of BusDetours API data
			fetchJsonp(url,{
				timeout: 6000,
			}).then(
				response =>{
					return response.json()
				}).then(
				json =>{
					if(json.length == 0){
						return
					}else{
						//console.log(json[0].route_info);
						this.setState({detours: json[0].route_info});
					}
				});
			}	
	}

	render(){
		const title ={
			textAlign:"center",
			marginBottom: "1px",
			marginTop: "1px"
		}

		var bt;
		if((this.props.bt)== "bus"){
			bt = "Bus";
		}else{
			bt = "Trolley";
		}

		var length = this.state.detours.length;

		return(
			<div>
			<h4 className="well well-sm" style ={title}>
			<img src={detourTopIcon} /> <strong> Detours for {bt} # {this.props.route} </strong></h4>
			{this.state.detours.map(function(detour,i){
				return(
					<Detour detour={detour} key={i} length={length} id={i} />
					)
			})}
			</div>
			);
	}
}

export default Detours;