/**
 * nta_rr_result.jsx file
 * This is used to get the details of the specific regional rail
 *
 */
import React from "react";
import '../../../style/nta.css';
//NTARRResult is the child class of NTARRResults
class NTARRResult extends React.Component{
	render(){

		var onTimeA;
		var onTimeB;
		if(this.props.ntaResult.orig_delay == 'On time'){
			onTimeA = 'green'
		}else{
			onTimeA = 'red'
		}
		if(this.props.ntaResult.term_delay == 'On time'){
			onTimeB = 'green'
		}else{
			onTimeB = 'red'
		}

		var toWhere;
		if(this.props.ntaResult.isdirect == 'true'){
			toWhere = this.props.dStation;
		}else{
			toWhere = this.props.ntaResult.Connection;
		}

		return(
			<div style={{backgroundColor : '#f2f2f2'}}>
			<span style={{color: 'blue', margin: 0, float: 'right'}}>{this.props.id}/{this.props.length}</span>
			<p className="pStyle">{this.props.ntaResult.orig_line}</p>
			<table>
			<tbody>
			<tr>
			  <th style={{textAlign: 'left'}}>
			  &#9675; {this.props.ntaResult.orig_departure_time} -- {this.props.ntaResult.orig_arrival_time}
			  </th>
			  <th rowSpan="2">
			  Departing {this.props.ntaResult.orig_departure_time}
			  </th>
			</tr>
			<tr>
			  <th style={{color: onTimeA, textAlign: 'left'}}>
			  &nbsp;Status : {this.props.ntaResult.orig_delay}
			  </th>
			</tr>
			<tr>
			  <th colSpan="2" style={{textAlign: 'left'}}>
			  &nbsp;Train #: {this.props.ntaResult.orig_train} to {toWhere}
			  </th>
			</tr>
			</tbody>
			</table>

			{this.props.ntaResult.Connection &&
			<div>
			<p style={{color: 'blue'}} ><strong> &diams; Connect @</strong> {this.props.ntaResult.Connection}</p>
			<p className="pStyle">{this.props.ntaResult.term_line}</p>
			<table>
			<tbody>
			<tr>
			  <th style={{textAlign: 'left'}}>
			  &#9675; {this.props.ntaResult.term_departure_time} -- {this.props.ntaResult.term_arrival_time}
			  </th>
			  <th rowSpan="2">
			  Departing {this.props.ntaResult.term_departure_time}
			  </th>
			</tr>
			<tr>
			  <th style={{color: onTimeB, textAlign: 'left'}}>
			  &nbsp;Status : {this.props.ntaResult.term_delay}
			  </th>
			</tr>
			<tr>
			  <th colSpan="2" style={{textAlign: 'left'}}>
			  &nbsp;Train #: {this.props.ntaResult.term_train} to {this.props.dStation}
			  </th>
			</tr>
			</tbody>
			</table>
			</div>
			}
			
			</div>
			)
	}

}

export default NTARRResult;