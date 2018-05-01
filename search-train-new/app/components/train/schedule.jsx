import React from "react";
import fetchJsonp from "fetch-jsonp";

import ScheduleDetail from './schedule_detail.jsx';

import TrainDefaultSchedule from '../../../images/TrainDefaultSchedule.png'

class Schedule extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			scheduleTrains: [],
			trainNo: props.train.trainNo
		}
	}

	componentWillReceiveProps(nextProps){
		var trainNo = nextProps.train.trainNo;
		this.setState({trainNo: trainNo});
	}

	componentDidMount(){
		this.tick();
		this.timerID = setInterval(
			() => this.tick(),
			10000 // update every 10 second
			);
	}

	tick(){
		var trainNo = this.state.trainNo;
		var url = "https://www3.septa.org/api/TrainView/schedule.php?train=" + trainNo;

		//get the detail of TrainView API data
		fetchJsonp(url,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			this.setState({scheduleTrains: json});
			});
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

    render(){

    	const styles = {
			backgroundColor: '#cccccc',
			wordWrap: 'normal'
		}

		const styles1 = {
			backgroundColor: '#cccccc',
			wordWrap: 'normal',
			borderLeft:'#cccccc',
		}

		var styles2;
		if(window.innerWidth<375){
			styles2 = {
				backgroundColor: '#cccccc',
				wordWrap: 'normal',
				borderRight:'#cccccc',
				width: '18%'
			}
		}else{
			styles2 = {
				backgroundColor: '#cccccc',
				wordWrap: 'normal',
				borderRight:'#cccccc',
				width: '25%'
			}
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
            <img src={TrainDefaultSchedule} alt="TrainDefaultSchedule" />
            <strong> Schedule for Train # {train.trainNo}</strong>
            </h4>
			<table>
			<tbody>
			<tr>
			<th style={styles1}>Station</th>
			<th style={styles}>Scheduled Time</th>
			<th style={styles}>Estimated Time</th>
			<th style={styles2}>Arrival Time</th>
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