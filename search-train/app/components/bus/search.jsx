import React from "react";

import SearchBar from './search_bar.jsx';
import BusResults from './bus_results.jsx';

//Search is used to search the details of the Train
class Search extends React.Component{

	constructor(props){
		super(props);
		this.state ={
			query: '',
			//initiate state.query
		};
	}

	handleQuery(query){
		/*console.log("Search:" + query)*/
		this.setState({'query':query.toLowerCase().trim()})
	}

	render(){
		return(
			<div className = "search">
			<SearchBar onQuery={this.handleQuery.bind(this)} />
			<BusResults buses={this.props.buses} route={this.props.route}
			query={this.state.query} alerts={this.props.alerts} 
			bt={this.props.bt} />
			</div>
			)
	}
}

export default Search;