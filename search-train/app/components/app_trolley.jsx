import React from "react";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";

class AppTrolley extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			collapseUp: true,
			collapseDown: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onClickCollapse = this.onClickCollapse.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value.toUpperCase()});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.history.push(`/trolley/${this.state.value}`);
	}

	onClickCollapse(e){
		e.preventDefault();
		this.setState({collapseUp: !this.state.collapseUp});
		this.setState({collapseDown: !this.state.collapseDown});
	}

	render(){
		const array = [10,11,13,15,34,36,101,102];
		const {value} = this.state;
		const isEnabled = value.length > 0 &&
		array.contains(value);
		Array.prototype.contains = function(obj) {
			var i = this.length;
			while (i--) {
				if (this[i] == obj) {
					return true;
				}
			}
			return false;
		}

		return(
			<div>

		    <nav className="navbar navbar-inverse">
		    <div className="container-fluid">
		    <div className="navbar-header">
		    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar2">
		    <span className="icon-bar"></span>
		    <span className="icon-bar"></span>
		    <span className="icon-bar"></span>                        
		    </button>
		    <a className="navbar-brand" href="#">Trolley Lines</a>
		    </div>
		    <div className="collapse navbar-collapse" id="myNavbar2">
		    <ul className="nav navbar-nav">
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> Trolley <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/trolley/10`}>10</Link></li>
		    <li ><Link to={`/trolley/11`}>11</Link></li>
		    <li ><Link to={`/trolley/13`}>13</Link></li>
		    <li ><Link to={`/trolley/15`}>15</Link></li>
		    <li ><Link to={`/trolley/34`}>34</Link></li>
		    <li ><Link to={`/trolley/36`}>36</Link></li>
		    <li ><Link to={`/trolley/101`}>101</Link></li>
		    <li ><Link to={`/trolley/102`}>102</Link></li>
		    </ul>
		    </li>
		    </ul>
		    <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
		    <div className="input-group">
		    <input type="text" className="form-control" value={this.state.value} placeholder="Search for Line #"
		    onChange={this.handleChange} />
		    <div className="input-group-btn">
		    <button type="submit" className="btn btn-default" disabled={!isEnabled}>
		    <i className="glyphicon glyphicon-search"></i>
		    </button>
		    </div>
		    </div>
		    </form>
		    </div>
		    </div>
		    </nav>

		    <h4 style={{textAlign: 'center'}}>Line List&nbsp;
		    <a href="#" onClick={this.onClickCollapse}>
		    {this.state.collapseUp &&<span className="glyphicon glyphicon-collapse-up"></span>}
		    {this.state.collapseDown &&<span className="glyphicon glyphicon-collapse-down"></span>}
		    </a>
		    </h4>
		    {this.state.collapseUp && <div>
		    <div className="menu1">
		    <div >10</div>
		    <div >11</div>
		    <hr/>
		    </div>

		    <div className="menu2">
		    <div >13</div>
		    <div >15</div>
		    <hr/>
		    </div>

		    <div className="menu3">
		    <div >34</div>
		    <div >36</div>
		    <hr/>
		    </div>

		    <div className="menu4">
		    <div >101</div>
		    <div >102</div>
		    <hr/>
		    </div>
		    </div>}

		    </div>
			)
	}
}

export default withRouter(AppTrolley);