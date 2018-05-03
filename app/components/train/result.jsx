import React from "react";
import {Link} from 'react-router-dom';

import Schedule from './schedule.jsx';
import Alert from './alert.jsx';
import Advisory from './advisory.jsx';

import suspendedIcon from '../../../images/suspended-icon.png';
import advisoryIcon from '../../../images/advisory-icon.png';
import alertIcon from '../../../images/alert-icon.png';


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
		//console.log(typeof this.props.train);
		if((typeof this.props.train == 'undefined') && (!this.props.error)){
			return <div>Loading...</div>;
		}

		const styleCursor = {
			cursor: 'pointer'
			//textAlign: 'justify'
		}

		const buttonStyle = {
			position: 'absolute'
		}

		//console.log(this.props.train);
		var lateMessage;
		var color;
		if((this.props.train.late > '5') && (this.props.train.late < '999')){
			color = '#fff799';//loght yellow "late"
			lateMessage = this.props.train.late;
		}else if((this.props.train.late == '999') || (String(this.props.train.alert).includes('suspended'))){
			color ='#ff9999';//light red "Suspended"
			lateMessage = "Suspended";
		}else if(this.props.train.late == '0'){
			color = '';
			lateMessage = "On Time";
		}else{
			color = '';
			lateMessage = this.props.train.late;
		}

		var m;
		if((this.props.train.late)==1){
			m = ' min';
		}else{
			m = ' mins';
		}

		var lateM;
		if( (lateMessage != 'On Time') && (lateMessage != 'Suspended')){
			lateM = m; //Late
		}else{
			lateM = ''; //On time or Suspended
		}

		const late ={
			backgroundColor: color,
		}

		var lateNo;
		var lateLine;
		var lateStop;
		if(window.innerWidth>768){
			lateNo ={
				backgroundColor: color,
				width: '18%'
			}
			lateLine={
				backgroundColor: color,
				width: '18%'
			}
			lateStop ={
				backgroundColor: color,
				width: '16%'
			}
		}else{
			lateNo ={
				backgroundColor: color,
				width: '23%',
				wordWrap: 'normal'
			}
			lateLine={
				backgroundColor: color,
				width: '31%'
			}
			lateStop ={
				backgroundColor: color,
				width: '31%'
			}
		}

		const lateStatus ={
			backgroundColor: color,
			//width: '18.5%'
		}

		const tooltipStyle = {
			display: (this.state.hover)&&(window.innerWidth>768) ? 'block' : 'none',
			border: '1px solid #aaaaaa',
			backgroundColor: '#ffedcc',
			left: '7%',
			position: 'absolute',
			borderBottomLeftRadius: '1em'
		}

		const scheduleStyle ={
			//display: this.state.showSchedule ? 'block' : 'none',
			border: '1px solid #4d0000',
			marginTop: '10px',
			marginBottom: '10px'
		}

        const alertSuspended = String(this.props.train.alert).includes('suspended') ? suspendedIcon : alertIcon
        
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

		var line;
		switch ( this.props.train.line ) {
			case "Lansdale\/Doylestown":
			line = "Lansdale/" + "\n" + "Doylestown";
			break;
			case "Manayunk\/Norristown":
			line = "Manayunk/" + "\n" + "Norristown";
			break;
			case "Media\/Elwyn":
			line = "Media/" + "\n" + "Elwyn";
			break;
			case "Paoli\/Thorndale":
			line = "Paoli/" + "\n" + "Thorndale";
			break;
			case "Wilmington\/Newark":
			line = "Wilmington/" + "\n" + "Newark";
			break;
			default:
			line = this.props.train.line;
		}

		return(
			<div>
			<table id = "result_content">
			<tbody>
			<tr>
			<td style={lateNo}>

			&nbsp;<a href="#" onClick={this.onClickSchedule.bind(this)} style ={styleCursor} 
			onMouseOver={this.handleMouseIn} onMouseOut={this.handleMouseOut}>
			<strong>{this.props.train.trainNo}</strong>
			</a>&nbsp;&nbsp;<br/>
			<span style={tooltipStyle}> Click to {info} schedule for # {this.props.train.trainNo}</span>

			<a href="#" onClick={this.onClickAlert.bind(this)} style={alertImageStyle}>
			<img src={alertSuspended} alt="alert"/>
			</a>&nbsp;&nbsp;&nbsp;

			<a href="#" onClick={this.onClickAdvisory.bind(this)} style={advisoryImageStyle}>
			<img src={advisoryIcon} alt="advisory"/>
			</a>

			</td>
			<td style={lateLine}>{line}</td>
			<td id="hideTd1" style={late}>{this.props.train.source}</td>
			<td id="hideTd2" style={late}>{this.props.train.dest}</td>
			<td id="nextStopTd" style={lateStop}>{this.props.train.nextStop}</td>
			{/*<td>{this.props.train.service}</td>*/}
			<td style={lateStatus}>{lateMessage}{lateM}</td>
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
			className ='btn btn-sm btn-danger btn-block'>Close</button>
			</div>

			<div style={advisoryStyle}>
			<Advisory train={this.props.train} />
			<button onClick={this.onClickAdvisory.bind(this)}
			className ='btn btn-sm btn-danger btn-block'>Close</button>
			</div>

			{this.state.showSchedule && <div style={scheduleStyle}>
			<Schedule train={this.props.train} />
			<button onClick={this.onClickSchedule.bind(this)}
			className ='btn btn-sm btn-danger btn-block'>Close</button>
			</div>}

			</div>
			)
	}
}

export default Result;