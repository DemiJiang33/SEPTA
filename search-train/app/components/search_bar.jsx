import React from "react";

//This is the Search Bar
class SearchBar extends React.Component{

	handleQuery(event){
		this.props.onQuery(event.target.value);
		/*console.log(event.target.value);*/
	}

	render(){
		return(
			<div className ="search-bar">
			<input id="search" onChange ={this.handleQuery.bind(this)} placeholder="
			Search for Train Number, Source or Destination."/>
			{/*<input style = {{width: '10%'}} type="submit" id="searchButton" value="Search" /> */}
			</div>
			)
	}
}

export default SearchBar;