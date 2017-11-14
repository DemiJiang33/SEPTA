import React from "react";
import ScrollUpButton from "react-scroll-up-button";

import Clock from './clock.jsx';
import Header from './header.jsx';
import SocialMedia from './social_media.jsx';
import AppBus from './app_bus.jsx';
import AppTrolley from './app_trolley.jsx';

class AppBusTrolley extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showBus: true,
			showTrolley: false
		};

		// Bind the context to the onClick function
        this.onClickBus = this.onClickBus.bind(this);
        this.onClickTrolley = this.onClickTrolley.bind(this);
	}

	onClickBus(e){
		e.preventDefault();
		this.setState({
			showBus: true,
			showTrolley: false
		})
	}

	onClickTrolley(e){
		e.preventDefault();
		this.setState({
			showTrolley: true,
			showBus: false
		})
	}

	render(){

		return(
			<div>
			<Header />
		    <Clock title = "Bus/Trolley " />
		    <hr/>

		    <nav className="navbar navbar-inverse">
		    <div className="container-fluid">
		    <div className="navbar-header">
		    <a className="navbar-brand" href="#">Bus/Trolley</a>
		    </div>
		    <ul className="nav navbar-nav">
		    <li><a href="#" onClick={this.onClickBus}>Bus</a></li>
		    <li><a href="#" onClick={this.onClickTrolley}>Trolley</a></li>
		    </ul>
		    </div>
		    </nav>

		    {this.state.showBus && <AppBus />}
		    {this.state.showTrolley && <AppTrolley />}
		    
			<SocialMedia />
		    <ScrollUpButton />
		    </div>
			);
	}
}

export default AppBusTrolley;