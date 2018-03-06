import React from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";

// The Header creates links that can be used to navigate
// between routes.
class Header extends React.Component{
	constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
  	this.props.history.goBack();
  }

	render(){
		return(
			<header>
			&nbsp;
			<button className="btn btn-xs btn-primary" onClick={this.goBack}> Back</button>&nbsp;|&nbsp;
			<Link to='/regionalrail'>Regional Rail</Link>&nbsp;|&nbsp;
			<Link to='/bus_trolley'>Bus/Trolley</Link>
			</header>
			)
	}
}

export default withRouter(Header);
