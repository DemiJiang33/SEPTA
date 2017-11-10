import React from "react";

import SearchBar from './search_bar.jsx';
import Results from './results.jsx';

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
			<Results trains={this.props.trains} alertTrains={this.props.alertTrains} query={this.state.query} />
			</div>
			)
	}
}

export default Search;