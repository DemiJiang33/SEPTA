import React from "react";

class ScheduleDetail extends React.Component{
	render(){
		
		const styles ={
			backgroundColor: ((this.props.scheduleTrain.station) == (this.props.train.nextStop))? '#ffdb99' : '#eeeeee',//light orange
			border: '1px solid #cccccc'
		}

		var styles2;
		if(window.innerWidth<375){
			styles2 = {
				backgroundColor: ((this.props.scheduleTrain.station) == (this.props.train.nextStop))? '#ffdb99' : '#eeeeee',//light orange
				border: '1px solid #cccccc',
				width: '18%'
			}
		}else{
			styles2 = {
				backgroundColor: ((this.props.scheduleTrain.station) == (this.props.train.nextStop))? '#ffdb99' : '#eeeeee',//light orange
				border: '1px solid #cccccc',
				width: '25%'
			}
		}

		var t;
		if( ((this.props.scheduleTrain.track) !='') || ((this.props.scheduleTrain.track_change) !='') ){
			t = " -- Terminal: "
		}else{
			t = ""
		}

		return(
			<table className = "detail_result">
			<tbody>
			<tr>
			<td style={styles}>{this.props.scheduleTrain.station}
			{t}{this.props.scheduleTrain.track}{this.props.scheduleTrain.track_change}</td>
			<td style={styles}>{this.props.scheduleTrain.sched_tm}</td>
			<td style={styles}>{this.props.scheduleTrain.est_tm}</td>
			<td style={styles2}>{this.props.scheduleTrain.act_tm}</td>
			</tr>
			</tbody>
			</table>
			)
	}

}

export default ScheduleDetail;