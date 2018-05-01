import React from "react";
import {withRouter} from "react-router-dom";
import Select from 'react-select';

import OPTION from '../../../data/regionalRailOption.json';

//This is the Search Bar
class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			query: '',
			//initiate state.query
		};	
	}

	componentDidMount(){
		//console.log(this.props.line);
		//this.props.line is the value after /regionalrail/ in url address
		this.props.onQuery(this.props.line);
		this.setState({'query':this.props.line});
	}

	handleQuery(event){
		if(event){
			this.setState({'query':event.value});
			this.props.onQuery(event.value);
			this.props.history.push(`/regionalrail/${event.value}`);
		}else{
			this.setState({'query':''});
			this.props.onQuery('');
			this.props.history.push(`/regionalrail/`);
		}
		this.timerID = setTimeout(
				() => this.onClickReload(),
			100 // update after 0.1 second
			);
		//console.log(event.target.value);
	}

	onClickBind(){
		//Bind this click with #refresh (in Train/map_component.jsx)
		$("#refresh").click();
	}

	onClickReload(){
		//Bind this click with #reloadTrain (in Train/map_component.jsx)
		$("#reloadTrain").click();
	}

	render(){
		const style={
			marginBottom: '10px'
		}

		const styleForm={
			marginTop: '8px'
		}

		const styleSelect={
			fontSize: 'large'
		}

		const { query } = this.state;

		return(
			<div className ="search-bar">

			<nav style={style} className="navbar navbar-inverse" >

		    <form style={styleForm}>
		    <div className="input-group">
		    <Select
		      style={styleSelect}
		      name="search-bar"
		      placeholder = "Select Line..."
		      value={query}
		      onChange={this.handleQuery.bind(this)}
		      options={OPTION}
		      />
		    <div className="input-group-btn">
		    <button type="button" className ='btn btn-primary' 
			onClick={this.onClickBind.bind(this)}>
			<span className="glyphicon glyphicon-refresh"></span>
			</button>
		    </div>
		    </div>
		    </form>
		
		    </nav>

			</div>
			)
	}
}

export default withRouter(SearchBar);