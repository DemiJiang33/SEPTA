import React from "react";
import fetchJsonp from "fetch-jsonp";

import ScheduleDetail from './schedule_detail.jsx';

class Schedule extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			scheduleTrains: []
		}
	}

	componentWillReceiveProps(nextProps){
		var trainNo = nextProps.train.trainNo;

		var url = "http://www3.septa.org/api/TrainView/schedule.php?train=" + trainNo;

		//get the detail of TrainView API data
		fetchJsonp(url,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
				//console.log(json);
				if (this.refs.myRef)
					this.setState({scheduleTrains: json});
			});
	}

    render(){  	
    	const styles = {
			backgroundColor: '#cccccc'
		}

		const title ={
			textAlign:"center",
			marginBottom: "1px",
			marginTop: "1px"
		}

		var train = this.props.train;

    	return(
    		<div ref="myRef">
            <h4 className="well well-sm" style ={title}>
            Schedule for Train # {train.trainNo}
            </h4>
			<table>
			<tbody>
			<tr>
			<th style={styles}>Station</th>
			<th style={styles}>Scheduled Time</th>
			<th style={styles}>Estimated Time</th>
			<th style={styles}>Arrival Time</th>
			</tr>
			</tbody>
			</table>
			{this.state.scheduleTrains.map(function(scheduleTrain,i){
				return(
					<ScheduleDetail train={train}
					scheduleTrain={scheduleTrain} key={i} />
					)
			})}
			</div>

    		)
    }

}

export default Schedule;