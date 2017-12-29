import React from "react";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";

class BTHeader2 extends React.Component{
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
		this.clearHide = this.clearHide.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value.toUpperCase()});
	}

	handleSubmit(event) {
		var pathname = this.props.location.pathname;
		var pathArray = this.props.location.pathname.split( '/' );
		var firstLocation = pathArray[2];
		this.props.history.push(`/bus_trolley/${firstLocation}/${this.state.value}`);
		event.preventDefault();
		this.setState({value: ''});
	}

	clearLocationOne(){
		var pathname = this.props.location.pathname;
		var pathArray = this.props.location.pathname.split( '/' );
		var lastLocation = pathArray[3];
		var regex = /^\/bus_trolley(\/\d+){2}(|\/)$/g;
		var found = regex.test(pathname);
		if(found){
			this.props.history.push(`/bus_trolley/${lastLocation}`);
		}else{
			this.props.history.push(`/bus_trolley`);
		}
	}

	clearLocationTwo(){
		var pathname = this.props.location.pathname;
		var pathArray = this.props.location.pathname.split( '/' );
		var firstLocation = pathArray[2];
		var regex = /^\/bus_trolley(\/\d+){2}(|\/)$/g;
		var found = regex.test(pathname);
		if(found){
			this.props.history.push(`/bus_trolley/${firstLocation}`);
		}else{
			this.props.history.push(`/bus_trolley`);
		}
	}

	clearHide(){
		this.setState({clearHide: !this.state.clearHide});
	}

	render(){

		const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
		               26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43,44,45,46,47,'47M',48,
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
		var lastLocation = pathArray[3];
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
		    <input type="text" ref="form" className="form-control" value={this.state.value} placeholder="Search for the 2nd Route/Line"
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
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 1-35 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/${firstLocation}/1`}>1</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/2`}>2</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/3`}>3</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/4`}>4</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/5`}>5</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/6`}>6</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/7`}>7</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/8`}>8</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/9`}>9</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/12`}>12</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/14`}>14</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/16`}>16</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/17`}>17</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/18`}>18</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/19`}>19</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/20`}>20</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/21`}>21</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/22`}>22</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/23`}>23</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/24`}>24</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/25`}>25</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/26`}>26</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/27`}>27</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/28`}>28</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/29`}>29</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/30`}>30</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/31`}>31</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/32`}>32</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/33`}>33</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/35`}>35</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 37-75 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/${firstLocation}/37`}>37</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/38`}>38</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/39`}>39</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/40`}>40</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/42`}>42</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/43`}>43</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/44`}>44</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/45`}>45</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/46`}>46</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/47`}>47</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/47M`}>47M</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/48`}>48</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/50`}>50</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/52`}>52</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/53`}>53</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/54`}>54</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/55`}>55</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/56`}>56</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/57`}>57</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/58`}>58</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/59`}>59</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/60`}>60</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/61`}>61</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/62`}>62</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/64`}>64</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/65`}>65</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/66`}>66</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/67`}>67</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/68`}>68</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/70`}>70</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/73`}>73</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/75`}>75</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 77-115 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/${firstLocation}/77`}>77</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/78`}>78</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/79`}>79</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/80`}>80</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/84`}>84</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/88`}>88</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/89`}>89</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/90`}>90</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/91`}>91</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/92`}>92</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/93`}>93</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/94`}>94</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/95`}>95</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/96`}>96</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/97`}>97</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/98`}>98</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/99`}>99</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/103`}>103</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/104`}>104</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/105`}>105</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/106`}>106</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/107`}>107</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/108`}>108</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/109`}>109</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/110`}>110</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/111`}>111</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/112`}>112</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/113`}>113</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/114`}>114</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/115`}>115</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 117-XH <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/${firstLocation}/117`}>117</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/118`}>118</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/119`}>119</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/120`}>120</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/123`}>123</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/124`}>124</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/125`}>125</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/126`}>126</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/127`}>127</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/128`}>128</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/129`}>129</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/130`}>130</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/131`}>131</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/132`}>132</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/133`}>133</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/139`}>139</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/150`}>150</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/201`}>201</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/204`}>204</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/205`}>205</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/206`}>206</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/310`}>310</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/331`}>311</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/G`}>G</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/J`}>J</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/K`}>K</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/L`}>L</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/LUCY`}>LUCY</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/R`}>R</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/H`}>H</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/XH`}>XH</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/BLVDDIR`}>BLVDDIR</Link></li>
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
		    <li ><Link to={`/bus_trolley/${firstLocation}/10`}>10</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/11`}>11</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/13`}>13</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/15`}>15</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/34`}>34</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/36`}>36</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/101`}>101</Link></li>
		    <li ><Link to={`/bus_trolley/${firstLocation}/102`}>102</Link></li>
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
		    {(exist) && <button style={{marginLeft:'5px'}}onClick={this.clearLocationTwo} className="label label-primary">{lastLocation} 
		    <i className="glyphicon glyphicon-remove"></i>
		    </button>}
		    <button className ='btn btn-primary' id="clearHide" style ={{display: 'none'}} 
		    onClick={this.clearHide}>Hide the clearLocationOne & Two (it's hidden)</button>
		    </div>

		    </div>
			)
	}
}

export default withRouter(BTHeader2);