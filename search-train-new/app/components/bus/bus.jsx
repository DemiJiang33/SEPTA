import React from "react";
import fetchJsonp from "fetch-jsonp";

import BusResults from './bus_results.jsx';
import BusMap from './bus_map.jsx';

class Bus extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			buses: [],
			alerts:[],
			alerts2:[],
			alerts3:[],
			route: props.route,
			route2: props.route2,
			route3: props.route3,
			bt: props.bt,
			bt2: props.bt2,
			bt3: props.bt3,
			showMap: true
		}
		this.onClickMove = this.onClickMove.bind(this);
	}

	componentWillReceiveProps(nextProps){
		var route = nextProps.route;
		var route2 = nextProps.route2;
		var route3 = nextProps.route3;
		var bt = nextProps.bt;
		var bt2 = nextProps.bt2;
		var bt3 = nextProps.bt3;
		this.setState({
			route: route,
			route2: route2,
			route3: route3,
			bt: bt,
			bt2: bt2,
			bt3: bt3
		});
		//console.log("new"+ route);

		this.timerID3 = setTimeout(
			() => this.tick(),
			100 // update once
			);
	}

	componentDidMount(){
		this.timerID2 = setTimeout(
			() => this.tick(),
			100 // update once
			);
		this.timerID = setInterval(
			() => this.tick(),
			10000 // update every 10 second
			);
	}

	tick(){
		var bt = this.state.bt;
		var bt2 = this.state.bt2;
		var bt3 = this.state.bt3;
		var route = this.state.route;
		var route2 = this.state.route2;
		var route3 = this.state.route3;
		//console.log(route);
		//console.log(route2);


		//old API
		//var url = "https://www3.septa.org/hackathon/TransitView/?route=" + route;

		//new API
		var url = "http://apitest.septa.org/api/TransitViewAll/?routes=" + route +"," + route2 +"," + route3;

		//get the detail of TransitView API data
		fetchJsonp(url)
		.then(
			response =>{
				return response.json()
			}).then(
			json =>{
				//old API
				//console.log(json);
				//var array = json.bus;
				//var length = array.length;

				//new API
				let key = Object.keys(json);
				var array;
				var array2;
				var array3;
				//console.log(json[key]);
				if(json.length != 0){
					if(json[key]["0"][route]){
					array = json[key]["0"][route];
					var length = json[key]["0"][route].length;

					for (var i=0 ; i< length; i++){
						array[i]["route"] = route;
						array[i]["bt"] = bt;
					}
				    //console.log(array);
				}
				}
				

				if(route2){
					if(json.length != 0){
						if(json[key]["0"][route2]){
							array2 = json[key]["0"][route2];
							var length2 = json[key]["0"][route2].length;

							for (var i=0 ; i< length2; i++){
								array2[i]["route"] = route2;
								array2[i]["bt"] = bt2;
							}
					        //console.log(array2);

					        if(array){
					        	for (var i=0 ; i< length2; i++){
					        		array.push(array2[i]);
					        	}
					        }else{
					        	array = array2;
					        }
					    }
					}
				}

				if(route3){
					if(json.length != 0){
						if(json[key]["0"][route3]){
							array3 = json[key]["0"][route3];
							var length3 = json[key]["0"][route3].length;

							for (var i=0 ; i< length3; i++){
								array3[i]["route"] = route3;
								array3[i]["bt"] = bt3;
							}
					        //console.log(array2);

					        if(array){
					        	for (var i=0 ; i< length3; i++){
					        		array.push(array3[i]);
					        	}
					        }else{
					        	array = array3;
					        }
					    }
					}
				}

				if(array){
					this.setState({
						buses: array
					});
				}else{
					this.setState({
						buses: []
					});
				}
		    //console.log(this.state.buses)
		});


		var url2 = "https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=" +bt+"_route_" + route;

		//get the detail of Alerts API data
		fetchJsonp(url2)
		.then(
			response =>{
				return response.json()
			}).then(
			json =>{
				//console.log(json);
				this.setState({alerts: json[0]});
			});


		var url3 = "https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=" +bt2+"_route_" + route2;

		//get the detail of Alerts API data
		fetchJsonp(url3)
		.then(
			response =>{
				return response.json()
			}).then(
			json =>{
				//console.log(json);
				this.setState({alerts2: json[0]});
			});


		var url4 = "https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=" +bt3+"_route_" + route3;

		//get the detail of Alerts API data
		fetchJsonp(url4)
		.then(
			response =>{
				return response.json()
			}).then(
			json =>{
				//console.log(json);
				this.setState({alerts3: json[0]});
			});

	}

	componentWillUnmount(){
		clearInterval(this.timerID);
		clearTimeout(this.timerID2);
		clearTimeout(this.timerID3);
	}

	onClickMove(){
		this.setState({showMap: !this.state.showMap});
		//Bind this click with #clearHide in bt_header2.jsx
		$("#clearHide").click();
	}

	render(){
		const hr ={
			border: '1px dashed black'
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

		return(
			<div>
			<div style={mapStyle}>
			<BusMap buses={this.state.buses} route={this.state.route} 
			route2={this.state.route2} route3={this.state.route3} />	
			</div>

			<button onClick={this.onClickMove}
			className ='btn btn-primary btn-md btn-block'>{upOrDown}</button>

			<BusResults route={this.state.route} alerts={this.state.alerts} bt={this.state.bt} />

			{(this.state.route2) && (this.state.route2!=this.state.route) && <hr style={hr} />}
			{(this.state.route2) && (this.state.route2!=this.state.route) &&
				<BusResults route={this.state.route2} alerts={this.state.alerts2} bt={this.state.bt2} />}

            {(this.state.route3) && (this.state.route3!=this.state.route2) 
            	&& (this.state.route3!=this.state.route) && <hr style={hr} />}
			{(this.state.route3) && (this.state.route3!=this.state.route2) 
				&& (this.state.route3!=this.state.route) 
				&& <BusResults route={this.state.route3} alerts={this.state.alerts3} bt={this.state.bt3} />}

			</div>
			)

	}
}

export default Bus;