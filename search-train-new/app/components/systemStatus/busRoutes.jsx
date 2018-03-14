import React from "react";
import RouteStatus from './route_status.jsx'

import busStatus from '../../../images/bus-status.png';
import trolleyStatus from '../../../images/trolley-status.png';

class BusRoutes extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			showBus: true,
			showTrolley: true
		};
		this.onClickBus = this.onClickBus.bind(this);
		this.onClickTrolley = this.onClickTrolley.bind(this);
	}

	onClickBus(){
		this.setState({showBus: !this.state.showBus});
	}
	onClickTrolley(){
		this.setState({showTrolley: !this.state.showTrolley});
	}

	render(){
		var busUpOrDown;
		if(this.state.showBus){
			busUpOrDown = String.fromCharCode('9652') + "Hide Bus"
		}else{
			busUpOrDown = String.fromCharCode('9662') + "Show Bus"
		}

		var trolleyUpOrDown;
		if(this.state.showTrolley){
			trolleyUpOrDown = String.fromCharCode('9652') + "Hide Trolley"
		}else{
			trolleyUpOrDown = String.fromCharCode('9662') + "Show Trolley"
		}

		const busStyle={
			display: this.state.showBus ? 'block' : 'none'
		}
		const trolleyStyle={
			display: this.state.showTrolley ? 'block' : 'none'
		}

		return(
			<div>

			<div>
			<center>
			<h3><img src={busStatus} />&nbsp;&nbsp;Bus Routes</h3>
			</center>
			<button onClick={this.onClickBus}
			className ='btn btn-primary btn-md btn-block'>{busUpOrDown}</button>
			</div>

			<div style={busStyle}>
			<div >
			<center>
			<h3>1-35</h3>
			</center>
			</div>
			<ul className="route-status">
			<RouteStatus route = "1" />
			<RouteStatus route = "2" />
			<RouteStatus route = "3" />
			<RouteStatus route = "4" />
			<RouteStatus route = "5" />
			<RouteStatus route = "6" />
			<RouteStatus route = "7" />
			<RouteStatus route = "8" />
			<RouteStatus route = "9" />
			<RouteStatus route = "12" />
			<RouteStatus route = "14" />
			<RouteStatus route = "16" />
			<RouteStatus route = "17" />
			<RouteStatus route = "18" />
			<RouteStatus route = "19" />
			<RouteStatus route = "20" />
			<RouteStatus route = "21" />
			<RouteStatus route = "22" />
			<RouteStatus route = "23" />
			<RouteStatus route = "24" />
			<RouteStatus route = "25" />
			<RouteStatus route = "26" />
			<RouteStatus route = "27" />
			<RouteStatus route = "28" />
			<RouteStatus route = "29" />
			<RouteStatus route = "30" />
			<RouteStatus route = "31" />
			<RouteStatus route = "32" />
			<RouteStatus route = "33" />
			<RouteStatus route = "35" />
			<br className="brHidden"/>
			<br className="brHidden"/>
			</ul>
			<br/>
			<div >
			<center>
			<h3>37-75</h3>
			</center>
			</div>
			<ul className="route-status">
			<RouteStatus route = "37" />
			<RouteStatus route = "38" />
			<RouteStatus route = "39" />
			<RouteStatus route = "40" />
			<RouteStatus route = "42" />
			<RouteStatus route = "43" />
			<RouteStatus route = "44" />
			<RouteStatus route = "45" />
			<RouteStatus route = "46" />
			<RouteStatus route = "47" />
			<RouteStatus route = "47M" />
			<RouteStatus route = "48" />
			<RouteStatus route = "50" />
			<RouteStatus route = "52" />
			<RouteStatus route = "53" />
			<RouteStatus route = "54" />
			<RouteStatus route = "55" />
			<RouteStatus route = "56" />
			<RouteStatus route = "57" />
			<RouteStatus route = "58" />
			<RouteStatus route = "59" />
			<RouteStatus route = "60" />
			<RouteStatus route = "61" />
			<RouteStatus route = "62" />
			<RouteStatus route = "64" />
			<RouteStatus route = "65" />
			<RouteStatus route = "66" />
			<RouteStatus route = "67" />
			<RouteStatus route = "68" />
			<RouteStatus route = "70" />
			<RouteStatus route = "73" />
			<RouteStatus route = "75" />
			</ul>
			<br/>
			<div >
			<center>
			<h3>77-115</h3>
			</center>
			</div>
			<ul className="route-status">
			<RouteStatus route = "77" />
			<RouteStatus route = "78" />
			<RouteStatus route = "79" />
			<RouteStatus route = "80" />
			<RouteStatus route = "84" />
			<RouteStatus route = "88" />
			<RouteStatus route = "89" />
			<RouteStatus route = "90" />
			<RouteStatus route = "91" />
			<RouteStatus route = "92" />
			<RouteStatus route = "93" />
			<RouteStatus route = "94" />
			<RouteStatus route = "95" />
			<RouteStatus route = "96" />
			<RouteStatus route = "97" />
			<RouteStatus route = "98" />
			<RouteStatus route = "99" />
			<RouteStatus route = "103" />
			<RouteStatus route = "104" />
			<RouteStatus route = "105" />
			<RouteStatus route = "106" />
			<RouteStatus route = "107" />
			<RouteStatus route = "108" />
			<RouteStatus route = "109" />
			<RouteStatus route = "110" />
			<RouteStatus route = "111" />
			<RouteStatus route = "112" />
			<RouteStatus route = "113" />
			<RouteStatus route = "114" />
			<RouteStatus route = "115" />
			<br className="brHidden"/>
			<br className="brHidden"/>
			</ul>
			<br/>
			<div >
			<center>
			<h3>117-XH</h3>
			</center>
			</div>
			<ul className="route-status">
			<RouteStatus route = "117" />
			<RouteStatus route = "118" />
			<RouteStatus route = "119" />
			<RouteStatus route = "120" />
			<RouteStatus route = "123" />
			<RouteStatus route = "124" />
			<RouteStatus route = "125" />
			<RouteStatus route = "126" />
			<RouteStatus route = "127" />
			<RouteStatus route = "128" />
			<RouteStatus route = "129" />
			<RouteStatus route = "130" />
			<RouteStatus route = "131" />
			<RouteStatus route = "132" />
			<RouteStatus route = "133" />
			<RouteStatus route = "139" />
			<RouteStatus route = "150" />
			<RouteStatus route = "201" />
			<RouteStatus route = "204" />
			<RouteStatus route = "205" />
			<RouteStatus route = "206" />
			<RouteStatus route = "310" />
			<RouteStatus route = "311" />
			<RouteStatus route = "G" />
			<RouteStatus route = "J" />
			<RouteStatus route = "K" />
			<RouteStatus route = "L" />
			<RouteStatus route = "LUCY" />
			<RouteStatus route = "R" />
			<RouteStatus route = "H" />
			<RouteStatus route = "XH" />
			<RouteStatus route = "BLVDDIR" />
			</ul>
			<br/>
			</div>

			<div>
			<center>
			<h3><img src={trolleyStatus} />&nbsp;&nbsp;Trolley Lines</h3>
			</center>
			<button onClick={this.onClickTrolley}
			className ='btn btn-primary btn-md btn-block'>{trolleyUpOrDown}</button>
			</div>

			<div style={trolleyStyle}>
			<div >
			<center>
			<h3>10-102</h3>
			</center>
			</div>
			<ul className="route-status">
			<RouteStatus route = "10" />
			<RouteStatus route = "11" />
			<RouteStatus route = "13" />
			<RouteStatus route = "15" />
			<RouteStatus route = "34" />
			<RouteStatus route = "36" />
			<RouteStatus route = "101" />
			<RouteStatus route = "102" />
			</ul>
			<br/>
			</div>

			</div>
			)
	}
}

export default BusRoutes;