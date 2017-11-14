import React from "react";
import { Link } from 'react-router-dom';

import Clock from './clock.jsx';
import SocialMedia from './social_media.jsx';

class App extends React.Component{

	render(){

		return(
			<center>
			<Clock title = "SEPTA " />
			<br/>
			<br/>
			<div>
			  <Link to='/regionalrail'>
			    <img src='../images/RegionalRail.png' />
			    <br/>
			    <h4>Regional Rail</h4>
			  </Link>
			  <br/>
			  <br/>
			  <Link to='/bus_trolley'>
			    <img src='../images/BusTrolly.png' />
			    <br/>
			    <h4>Bus/Trolley</h4>
			  </Link>
		    </div>
		    <br/>
		    <br/>
		    <SocialMedia />
		    </center>
			)
	}
}

export default App;