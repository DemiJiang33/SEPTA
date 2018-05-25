/**
 * bt_header3.jsx file
 * This is the header (Search Bar) when there are two or three bus/trolley routes selected.
 *
 */
import React from "react";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";

class BTHeader3 extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			clearHide: 'false'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearLocationOne = this.clearLocationOne.bind(this);
		this.clearLocationTwo = this.clearLocationTwo.bind(this);
		this.clearLocationThree = this.clearLocationThree.bind(this);
		this.clearHide = this.clearHide.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value.toUpperCase()});
	}

	handleSubmit(event) {
		var pathname = this.props.location.pathname;
		var pathArray = this.props.location.pathname.split( '/' );
		var firstLocation = pathArray[2];
		var secondLocation = pathArray[3];
		this.props.history.push(`/bus_trolley/${firstLocation}/${secondLocation}/${this.state.value}`);
		event.preventDefault();
		this.setState({value: ''});
	}

	clearLocationOne(){
		var pathname = this.props.location.pathname;
		var pathArray = this.props.location.pathname.split( '/' );
		var secondLocation = pathArray[3];
		var lastLocation = pathArray[4];
		if(lastLocation){
			this.props.history.push(`/bus_trolley/${secondLocation}/${lastLocation}`);
		}else{
			this.props.history.push(`/bus_trolley/${secondLocation}`);
		}
	}

	clearLocationTwo(){
		var pathname = this.props.location.pathname;
		var pathArray = this.props.location.pathname.split( '/' );
		var firstLocation = pathArray[2];
		var lastLocation = pathArray[4];
		if(lastLocation){
			this.props.history.push(`/bus_trolley/${firstLocation}/${lastLocation}`);
		}else{
			this.props.history.push(`/bus_trolley/${firstLocation}`);
		}
	}

	clearLocationThree(){
		var pathname = this.props.location.pathname;
		var pathArray = this.props.location.pathname.split( '/' );
		var firstLocation = pathArray[2];
		var secondLocation = pathArray[3];
		this.props.history.push(`/bus_trolley/${firstLocation}/${secondLocation}`);
	}

	clearHide(){
		this.setState({clearHide: !this.state.clearHide});
	}

	render(){

		const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'15B',16,17,18,19,20,21,22,23,24,25,
		               26,27,28,29,30,31,32,33,34,35,36,'36B',37,38,39,40,42,43,44,45,46,47,'47M',48,
		               50,52,53,54,55,56,57,58,59,60,61,62,64,65,66,67,68,70,73,75,77,
		               78,79,80,84,88,89,90,91,92,93,94,95,96,97,98,99,101,102,103,104,105,106,107,
		               108,109,110,111,112,113,114,115,117,118,119,120,123,124,125,126,127,128,129,130,131,
		               132,133,139,150,201,204,205,206,310,311,'G','J','K','L','LUCY','R','H','XH','BLVDDIR'];
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

		const style={
			marginBottom: '1px'
		}

		const styleForm={
			marginTop: '8px'
		}

		var pathArray = this.props.location.pathname.split( '/' );
		var firstLocation = pathArray[2];
		var secondLocation = pathArray[3];
		var lastLocation = pathArray[4];
		var exist = false;
		if (lastLocation){
			 exist = true;
		}

		const routeStyle = {
			fontSize: 'large',
			display: this.state.clearHide ? 'block':'none'
		}

		return(
			<div>

		    <nav style={style} className="navbar navbar-inverse" >
		    <div className="container-fluid ">

		    <button type="button" className="navbar-toggle" id="collapse" data-toggle="collapse" data-target="#myNavbar">
		    <span className="icon-bar"></span>
		    <span className="icon-bar"></span>  
		    <span className="icon-bar"></span>         
		    </button>
		    <form style={styleForm} onSubmit={this.handleSubmit}>
		    <div className="input-group">
		    <input type="text" ref="form" className="form-control" value={this.state.value} placeholder="Search for the 3rd Route/Line"
		    onChange={this.handleChange} />
		    <div className="input-group-btn">
		    <button id="submitB" type="submit" className="btn btn-default" disabled={!isEnabled}>
		    <i className="glyphicon glyphicon-search"></i>
		    </button>
		    </div>
		    </div>
		    </form>

		    <div className="collapse navbar-collapse" id="myNavbar">
		    <div className="navbar-header">
		    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar1">
		    <span className="icon-bar"></span>
		    <span className="icon-bar"></span>
		    <span className="icon-bar"></span>                        
		    </button>
		    <a className="navbar-brand">Bus Routes</a>
		    </div>
		    <div className="collapse navbar-collapse" id="myNavbar1">
		    <ul className="nav navbar-nav">
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 1-36B <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/1`}>1</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/2`}>2</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/3`}>3</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/4`}>4</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/5`}>5</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/6`}>6</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/7`}>7</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/8`}>8</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/9`}>9</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/12`}>12</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/14`}>14</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/15B`}>15B</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/16`}>16</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/17`}>17</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/18`}>18</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/19`}>19</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/20`}>20</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/21`}>21</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/22`}>22</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/23`}>23</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/24`}>24</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/25`}>25</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/26`}>26</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/27`}>27</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/28`}>28</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/29`}>29</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/30`}>30</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/31`}>31</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/32`}>32</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/33`}>33</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/35`}>35</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/36B`}>36B</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 37-75 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/37`}>37</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/38`}>38</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/39`}>39</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/40`}>40</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/42`}>42</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/43`}>43</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/44`}>44</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/45`}>45</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/46`}>46</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/47`}>47</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/47M`}>47M</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/48`}>48</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/50`}>50</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/52`}>52</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/53`}>53</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/54`}>54</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/55`}>55</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/56`}>56</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/57`}>57</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/58`}>58</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/59`}>59</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/60`}>60</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/61`}>61</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/62`}>62</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/64`}>64</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/65`}>65</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/66`}>66</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/67`}>67</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/68`}>68</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/70`}>70</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/73`}>73</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/75`}>75</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 77-115 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/77`}>77</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/78`}>78</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/79`}>79</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/80`}>80</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/84`}>84</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/88`}>88</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/89`}>89</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/90`}>90</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/91`}>91</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/92`}>92</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/93`}>93</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/94`}>94</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/95`}>95</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/96`}>96</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/97`}>97</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/98`}>98</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/99`}>99</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/103`}>103</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/104`}>104</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/105`}>105</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/106`}>106</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/107`}>107</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/108`}>108</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/109`}>109</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/110`}>110</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/111`}>111</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/112`}>112</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/113`}>113</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/114`}>114</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/115`}>115</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 117-XH <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/117`}>117</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/118`}>118</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/119`}>119</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/120`}>120</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/123`}>123</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/124`}>124</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/125`}>125</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/126`}>126</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/127`}>127</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/128`}>128</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/129`}>129</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/130`}>130</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/131`}>131</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/132`}>132</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/133`}>133</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/139`}>139</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/150`}>150</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/201`}>201</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/204`}>204</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/205`}>205</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/206`}>206</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/310`}>310</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/311`}>311</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/G`}>G</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/J`}>J</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/K`}>K</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/L`}>L</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/LUCY`}>LUCY</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/R`}>R</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/H`}>H</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/XH`}>XH</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/BLVDDIR`}>BLVDDIR</Link></li>
		    </ul>
		    </li>
		    </ul>
		    </div>

		    <div className="navbar-header">
		    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar2">
		    <span className="icon-bar"></span>
		    <span className="icon-bar"></span>
		    <span className="icon-bar"></span>                        
		    </button>
		    <a className="navbar-brand">Trolley Lines</a>
		    </div>
		    <div className="collapse navbar-collapse" id="myNavbar2">
		    <ul className="nav navbar-nav">
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 10-102 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/10`}>10</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/11`}>11</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/13`}>13</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/15`}>15</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/34`}>34</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/36`}>36</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/101`}>101</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/${secondLocation}/102`}>102</Link></li>
		    </ul>
		    </li>
		    </ul>
		    </div>

		    </div>

		    </div>
		    </nav>

		    <div style={routeStyle}>
		    <button onClick={this.clearLocationOne} className="label label-primary">{firstLocation} 
		    <i className="glyphicon glyphicon-remove"></i>
		    </button>
		    <button style={{marginLeft:'5px'}} onClick={this.clearLocationTwo} className="label label-primary">{secondLocation} 
		    <i className="glyphicon glyphicon-remove"></i>
		    </button>
		    {(exist) && <button style={{marginLeft:'5px'}} onClick={this.clearLocationThree} className="label label-primary">{lastLocation} 
		    <i className="glyphicon glyphicon-remove"></i>
		    </button>}
		    <button className ='btn btn-primary' id="clearHide" style ={{display: 'none'}} 
		    onClick={this.clearHide}>Hide the clearLocationOne,Two & Three (it's hidden)</button>
		    </div>

		    </div>
			)
	}
}

export default withRouter(BTHeader3);