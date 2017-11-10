import React from "react";

class BusResult extends React.Component{

	render(){
		if(!this.props.bus){
			return <div>Loading...</div>;
		}

		var m;
		if((this.props.bus.late)==1){
			m = ' min';
		}else{
			m = ' mins';
		}

		var status;
		if((this.props.bus.late)==0){
			status = "On Time";
		}else if((this.props.bus.late)==999){
			status = "Suspended";
		}else if((this.props.bus.late)>0){
			status = this.props.bus.late + m +" late";
		}else{
			status = -(this.props.bus.late) + m +" earlier";
		}

		var color;
		if((this.props.bus.late > 5) && (this.props.bus.late) != 999){
			color = '#fff799';//loght yellow
		}else if((this.props.bus.late) == 999){
			color ='#ff9999';//light red
		}else{
			color = '';
		}

		const late ={
			backgroundColor: color
		}

		const late2Style = {
			backgroundColor: color,
			borderRight:'#dddddd'
		}

		var styleDest;
		if(window.innerWidth<=320){
			styleDest ={
				width: '40%',
				backgroundColor: color
			}
		}else{
			styleDest ={
				backgroundColor: color
			}
		}

		return(
			<tr>
			<td style={late}>{this.props.bus.VehicleID}</td>
			<td id="hideTd1"style={late}>{this.props.bus.Direction}</td>
			<td style={styleDest}>{this.props.bus.destination}</td>
			<td style={late2Style}>{status}</td>
			</tr>
			)
	}
}

export default BusResult;