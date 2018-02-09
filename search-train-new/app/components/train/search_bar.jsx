import React from "react";

//This is the Search Bar
class SearchBar extends React.Component{
	/*constructor(props){
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
	}*/

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
			marginBottom: '10px'
		}

		const styleForm={
			marginTop: '8px'
		}

		return(
			<div className ="search-bar">

			<nav style={style} className="navbar navbar-inverse" >

		    <form style={styleForm}>
		    <div className="input-group">
		    <input type="text" ref="form" className="form-control" onChange ={this.handleQuery.bind(this)} 
			placeholder="Search for Train #, Line, Origin or Dest."/>
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

export default SearchBar;