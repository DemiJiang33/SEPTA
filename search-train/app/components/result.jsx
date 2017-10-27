import React from "react";
import {Link} from 'react-router-dom';

import Schedule from './schedule.jsx';
import Alert from './alert.jsx';
import Advisory from './advisory.jsx';


class Result extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			hover: false,
			showSchedule: false,
			showAlert: false,
			showAdvisory: false
		}
		this.handleMouseIn = this.handleMouseIn.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
	}

	handleMouseIn() {
		this.setState({ hover: true })
	}

	handleMouseOut() {
		this.setState({ hover: false })
	}

	onClickSchedule(e){
		e.preventDefault();
		this.setState({showSchedule: !this.state.showSchedule})
	}

	onClickAlert(e){
		e.preventDefault();
		this.setState({showAlert: !this.state.showAlert})
	}

	onClickAdvisory(e){
		e.preventDefault();
		this.setState({showAdvisory: !this.state.showAdvisory})
	}

	render(){
		if(!this.props.train){
			return <div>Loading...</div>;
		}

		const styleCursor = {
			cursor: 'pointer'
			//textAlign: 'justify'
		}

		const buttonStyle = {
			position: 'absolute'
		}

		var color;
		if((this.props.train.late != 'On Time') && ((this.props.train.late) != 'Suspended') && 
			(this.props.train.late > '5')){
			color = '#fff799';//loght yellow
		}else if((this.props.train.late) == 'Suspended'){
			color ='#ff9999';//light red
		}else{
			color = '';
		}

		const late ={
			backgroundColor: color,
		}

		const lateNo ={
			backgroundColor: color,
			width: '27%'
		}

		const lateStatus ={
			backgroundColor: color,
			width: '15%'
		}

		var lateM;
		if((this.props.train.late != 'On Time') && ((this.props.train.late) != 'Suspended')){
			lateM = ' min';
		}else{
			lateM = '';
		}

		const tooltipStyle = {
			display: this.state.hover ? 'block' : 'none',
			border: '1px solid #aaaaaa',
			backgroundColor: '#ffedcc',
			left: '11%',
			position: 'absolute',
			borderBottomLeftRadius: '1em'
		}

		const scheduleStyle ={
			display: this.state.showSchedule ? 'block' : 'none',
			border: '1px solid #4d0000',
			marginTop: '10px',
			marginBottom: '10px'
		}

		const alertStyle ={
			display: this.state.showAlert ? 'block' : 'none',
			border: '1px solid #4d0000',
			marginTop: '10px',
			marginBottom: '10px'
		}

		const advisoryStyle ={
			display: this.state.showAdvisory ? 'block' : 'none',
			border: '1px solid #4d0000',
			marginTop: '10px',
			marginBottom: '10px'
		}


		const advisoryImageStyle = {
			visibility: this.props.train.message ? 'visible' : 'hidden',
			cursor: 'help'
		}

		const alertImageStyle = {
			visibility: this.props.train.alert ? 'visible' : 'hidden',
			cursor: 'help'
		}

		var info;
		if(!this.state.showSchedule){
			info = "maximize"
		}else{
			info = "minimize"
		}

		return(
			<div>
			<table className = "result_content">
			<tbody>
			<tr>
			<td style={lateNo}>

			<a href="#" onClick={this.onClickSchedule.bind(this)} style ={styleCursor} 
			onMouseOver={this.handleMouseIn} onMouseOut={this.handleMouseOut}>
			&nbsp;{this.props.train.trainNo}&nbsp;
			</a>&nbsp;&nbsp;
			<span style={tooltipStyle}> Click to {info} schedule for # {this.props.train.trainNo}</span>

			<a href="#" onClick={this.onClickAlert.bind(this)} style={alertImageStyle}>
			&nbsp;<img src='./images/alert-icon.png' />&nbsp;
			</a>&nbsp;&nbsp;

			<a href="#" onClick={this.onClickAdvisory.bind(this)} style={advisoryImageStyle}>
			&nbsp;<img src='./images/advisory-icon.png' />&nbsp;
			</a>

			</td>
			<td id="hideTd1" style={late}>{this.props.train.source}</td>
			<td id="hideTd2" style={late}>{this.props.train.dest}</td>
			<td id="nextStopTd" style={late}>{this.props.train.nextStop}</td>
			{/*<td>{this.props.train.service}</td>*/}
			<td style={lateStatus}>{this.props.train.late}{lateM}</td>
			{/*<td>{this.props.train.lat}</td>
			<td>{this.props.train.lon}</td>
			<td>{this.props.train.line}</td>*/}
			</tr>
			</tbody>
			</table>
			{/*<div>{this.props.train.message}</div>*/}

			<div style={alertStyle}>
			<Alert train={this.props.train} />
			<button onClick={this.onClickAlert.bind(this)}
			className ='btn btn-xs btn-danger btn-block'>Close</button>
			</div>

			<div style={advisoryStyle}>
			<Advisory train={this.props.train} />
			<button onClick={this.onClickAdvisory.bind(this)}
			className ='btn btn-xs btn-danger btn-block'>Close</button>
			</div>

			<div style={scheduleStyle}>
			{/*<button style={buttonStyle} onClick={this.onClickSchedule.bind(this)}
			className ='btn btn-xs btn-default'>&#10060;</button>*/}
			<Schedule train={this.props.train} />
			<button onClick={this.onClickSchedule.bind(this)}
			className ='btn btn-xs btn-danger btn-block'>Close</button>
			</div>

			</div>
			)
	}
}

export default Result;