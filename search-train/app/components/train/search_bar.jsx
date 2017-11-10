import React from "react";

//This is the Search Bar
class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			show: false
		}
	}

	componentDidMount(){
		if(window.innerWidth<768){
			this.setState({show: false});
		}else{
			this.setState({show: true});
		}
	}

	handleQuery(event){
		this.props.onQuery(event.target.value);
		/*console.log(event.target.value);*/
	}

	onClickBind(){
		//Bind this click with #refresh
		$("#refresh").click();
	}

	render(){
		const style={
			border: '1px solid',
			marginBottom: '10px',
			borderRadius: '5px',
			width: '100%'
		}

		return(
			<div className ="search-bar">
			{this.state.show && <input style={{float:'right'}} type="button" className ='btn btn-primary' 
			onClick={this.onClickBind.bind(this)} value="Refresh the Map" />}
			<div style={{overflow: 'hidden'}}>
			<input style={style} id="search" onChange ={this.handleQuery.bind(this)} 
			className="form-control" placeholder="Search for Train #, Line, Origin or Dest."/>
			</div>
			</div>
			)
	}
}

export default SearchBar;