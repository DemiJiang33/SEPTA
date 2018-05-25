import React from "react";
import favicon from "../../images/favicon.ico";

//Clock is used to get the updated local time.
class Clock extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			date: new Date()
		};
	}

	componentDidMount(){
		this.timerID = setInterval(
			() => this.tick(),
			1000 // update every second
			);
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	tick(){
		this.setState({
			date: new Date()
		});
	}

	render(){

		var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
		var day = days[this.state.date.getDay()];

		return(
			<div id ="clock">
			<p id ="date">{this.props.title}<img src={favicon} alt="favicon" /> {day} <br/>
			{this.state.date.toLocaleString()}</p>
			</div>
			)
	}

}

export default Clock;