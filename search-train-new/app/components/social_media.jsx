import React from "react";
import fetchJsonp from "fetch-jsonp";

import favicon from "../../images/favicon.ico";

//SocialMedia is used to show the social media.
class SocialMedia extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			weather: []
		};
	};

	componentDidMount(){
		const API_KEY = "7ee17c4f8e6f1b0d2fe3cc0f71fce04c";
		const ROOT_URL = `https://api.openweathermap.org/data/2.5/weather?id=4560349&units=imperial&appid=${API_KEY}`;

		fetchJsonp(ROOT_URL,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			this.setState({weather: json});
		});
	}

	render(){
		const {weather} = this.state.weather;

		if(!weather){
			return <div>Loading...</div>;
		}

		const styles ={
			backgroundColor: '#eeeeee',
		}

		var status;
		status = "https://openweathermap.org/img/w/" + this.state.weather.weather[0].icon + ".png";

		return(
			<div>
			<p>
			<img src ={status} alt="status" />{this.state.weather.weather[0].main}&nbsp;
			<span style={styles}>{this.state.weather.main.temp}&#8457;&nbsp;
			({this.state.weather.main.temp_min}&#8457;~{this.state.weather.main.temp_max}&#8457;)</span>
			</p>
			<h5>Copyright SEPTA &nbsp;<img src ={favicon} alt="favicon" />&nbsp; All rights Reserved</h5>	
			</div>
			)
	}
}

export default SocialMedia;