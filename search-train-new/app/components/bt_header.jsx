import React from "react";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";

class BTHeader extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value.toUpperCase()});
	}

	handleSubmit(event) {
		this.props.history.push(`/bus_trolley/${this.state.value}`);
		event.preventDefault();
		this.setState({value: ''});
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
			marginBottom: '10px'
		}

		const styleForm={
			marginTop: '8px'
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
		    <input type="text" ref="form" className="form-control" value={this.state.value} placeholder="Search for Route/Line #"
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
		    <li ><Link to={`/bus_trolley/1`}>1</Link></li>
		    <li ><Link to={`/bus_trolley/2`}>2</Link></li>
		    <li ><Link to={`/bus_trolley/3`}>3</Link></li>
		    <li ><Link to={`/bus_trolley/4`}>4</Link></li>
		    <li ><Link to={`/bus_trolley/5`}>5</Link></li>
		    <li ><Link to={`/bus_trolley/6`}>6</Link></li>
		    <li ><Link to={`/bus_trolley/7`}>7</Link></li>
		    <li ><Link to={`/bus_trolley/8`}>8</Link></li>
		    <li ><Link to={`/bus_trolley/9`}>9</Link></li>
		    <li ><Link to={`/bus_trolley/12`}>12</Link></li>
		    <li ><Link to={`/bus_trolley/14`}>14</Link></li>
		    <li ><Link to={`/bus_trolley/16`}>16</Link></li>
		    <li ><Link to={`/bus_trolley/17`}>17</Link></li>
		    <li ><Link to={`/bus_trolley/18`}>18</Link></li>
		    <li ><Link to={`/bus_trolley/19`}>19</Link></li>
		    <li ><Link to={`/bus_trolley/20`}>20</Link></li>
		    <li ><Link to={`/bus_trolley/21`}>21</Link></li>
		    <li ><Link to={`/bus_trolley/22`}>22</Link></li>
		    <li ><Link to={`/bus_trolley/23`}>23</Link></li>
		    <li ><Link to={`/bus_trolley/24`}>24</Link></li>
		    <li ><Link to={`/bus_trolley/25`}>25</Link></li>
		    <li ><Link to={`/bus_trolley/26`}>26</Link></li>
		    <li ><Link to={`/bus_trolley/27`}>27</Link></li>
		    <li ><Link to={`/bus_trolley/28`}>28</Link></li>
		    <li ><Link to={`/bus_trolley/29`}>29</Link></li>
		    <li ><Link to={`/bus_trolley/30`}>30</Link></li>
		    <li ><Link to={`/bus_trolley/31`}>31</Link></li>
		    <li ><Link to={`/bus_trolley/32`}>32</Link></li>
		    <li ><Link to={`/bus_trolley/33`}>33</Link></li>
		    <li ><Link to={`/bus_trolley/35`}>35</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 37-75 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/37`}>37</Link></li>
		    <li ><Link to={`/bus_trolley/38`}>38</Link></li>
		    <li ><Link to={`/bus_trolley/39`}>39</Link></li>
		    <li ><Link to={`/bus_trolley/40`}>40</Link></li>
		    <li ><Link to={`/bus_trolley/42`}>42</Link></li>
		    <li ><Link to={`/bus_trolley/43`}>43</Link></li>
		    <li ><Link to={`/bus_trolley/44`}>44</Link></li>
		    <li ><Link to={`/bus_trolley/45`}>45</Link></li>
		    <li ><Link to={`/bus_trolley/46`}>46</Link></li>
		    <li ><Link to={`/bus_trolley/47`}>47</Link></li>
		    <li ><Link to={`/bus_trolley/47M`}>47M</Link></li>
		    <li ><Link to={`/bus_trolley/48`}>48</Link></li>
		    <li ><Link to={`/bus_trolley/50`}>50</Link></li>
		    <li ><Link to={`/bus_trolley/52`}>52</Link></li>
		    <li ><Link to={`/bus_trolley/53`}>53</Link></li>
		    <li ><Link to={`/bus_trolley/54`}>54</Link></li>
		    <li ><Link to={`/bus_trolley/55`}>55</Link></li>
		    <li ><Link to={`/bus_trolley/56`}>56</Link></li>
		    <li ><Link to={`/bus_trolley/57`}>57</Link></li>
		    <li ><Link to={`/bus_trolley/58`}>58</Link></li>
		    <li ><Link to={`/bus_trolley/59`}>59</Link></li>
		    <li ><Link to={`/bus_trolley/60`}>60</Link></li>
		    <li ><Link to={`/bus_trolley/61`}>61</Link></li>
		    <li ><Link to={`/bus_trolley/62`}>62</Link></li>
		    <li ><Link to={`/bus_trolley/64`}>64</Link></li>
		    <li ><Link to={`/bus_trolley/65`}>65</Link></li>
		    <li ><Link to={`/bus_trolley/66`}>66</Link></li>
		    <li ><Link to={`/bus_trolley/67`}>67</Link></li>
		    <li ><Link to={`/bus_trolley/68`}>68</Link></li>
		    <li ><Link to={`/bus_trolley/70`}>70</Link></li>
		    <li ><Link to={`/bus_trolley/73`}>73</Link></li>
		    <li ><Link to={`/bus_trolley/75`}>75</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 77-115 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/77`}>77</Link></li>
		    <li ><Link to={`/bus_trolley/78`}>78</Link></li>
		    <li ><Link to={`/bus_trolley/79`}>79</Link></li>
		    <li ><Link to={`/bus_trolley/80`}>80</Link></li>
		    <li ><Link to={`/bus_trolley/84`}>84</Link></li>
		    <li ><Link to={`/bus_trolley/88`}>88</Link></li>
		    <li ><Link to={`/bus_trolley/89`}>89</Link></li>
		    <li ><Link to={`/bus_trolley/90`}>90</Link></li>
		    <li ><Link to={`/bus_trolley/91`}>91</Link></li>
		    <li ><Link to={`/bus_trolley/92`}>92</Link></li>
		    <li ><Link to={`/bus_trolley/93`}>93</Link></li>
		    <li ><Link to={`/bus_trolley/94`}>94</Link></li>
		    <li ><Link to={`/bus_trolley/95`}>95</Link></li>
		    <li ><Link to={`/bus_trolley/96`}>96</Link></li>
		    <li ><Link to={`/bus_trolley/97`}>97</Link></li>
		    <li ><Link to={`/bus_trolley/98`}>98</Link></li>
		    <li ><Link to={`/bus_trolley/99`}>99</Link></li>
		    <li ><Link to={`/bus_trolley/103`}>103</Link></li>
		    <li ><Link to={`/bus_trolley/104`}>104</Link></li>
		    <li ><Link to={`/bus_trolley/105`}>105</Link></li>
		    <li ><Link to={`/bus_trolley/106`}>106</Link></li>
		    <li ><Link to={`/bus_trolley/107`}>107</Link></li>
		    <li ><Link to={`/bus_trolley/108`}>108</Link></li>
		    <li ><Link to={`/bus_trolley/109`}>109</Link></li>
		    <li ><Link to={`/bus_trolley/110`}>110</Link></li>
		    <li ><Link to={`/bus_trolley/111`}>111</Link></li>
		    <li ><Link to={`/bus_trolley/112`}>112</Link></li>
		    <li ><Link to={`/bus_trolley/113`}>113</Link></li>
		    <li ><Link to={`/bus_trolley/114`}>114</Link></li>
		    <li ><Link to={`/bus_trolley/115`}>115</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 117-XH <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus_trolley/117`}>117</Link></li>
		    <li ><Link to={`/bus_trolley/118`}>118</Link></li>
		    <li ><Link to={`/bus_trolley/119`}>119</Link></li>
		    <li ><Link to={`/bus_trolley/120`}>120</Link></li>
		    <li ><Link to={`/bus_trolley/123`}>123</Link></li>
		    <li ><Link to={`/bus_trolley/124`}>124</Link></li>
		    <li ><Link to={`/bus_trolley/125`}>125</Link></li>
		    <li ><Link to={`/bus_trolley/126`}>126</Link></li>
		    <li ><Link to={`/bus_trolley/127`}>127</Link></li>
		    <li ><Link to={`/bus_trolley/128`}>128</Link></li>
		    <li ><Link to={`/bus_trolley/129`}>129</Link></li>
		    <li ><Link to={`/bus_trolley/130`}>130</Link></li>
		    <li ><Link to={`/bus_trolley/131`}>131</Link></li>
		    <li ><Link to={`/bus_trolley/132`}>132</Link></li>
		    <li ><Link to={`/bus_trolley/133`}>133</Link></li>
		    <li ><Link to={`/bus_trolley/139`}>139</Link></li>
		    <li ><Link to={`/bus_trolley/150`}>150</Link></li>
		    <li ><Link to={`/bus_trolley/201`}>201</Link></li>
		    <li ><Link to={`/bus_trolley/204`}>204</Link></li>
		    <li ><Link to={`/bus_trolley/205`}>205</Link></li>
		    <li ><Link to={`/bus_trolley/206`}>206</Link></li>
		    <li ><Link to={`/bus_trolley/310`}>310</Link></li>
		    <li ><Link to={`/bus_trolley/311`}>311</Link></li>
		    <li ><Link to={`/bus_trolley/G`}>G</Link></li>
		    <li ><Link to={`/bus_trolley/J`}>J</Link></li>
		    <li ><Link to={`/bus_trolley/K`}>K</Link></li>
		    <li ><Link to={`/bus_trolley/L`}>L</Link></li>
		    <li ><Link to={`/bus_trolley/LUCY`}>LUCY</Link></li>
		    <li ><Link to={`/bus_trolley/R`}>R</Link></li>
		    <li ><Link to={`/bus_trolley/H`}>H</Link></li>
		    <li ><Link to={`/bus_trolley/XH`}>XH</Link></li>
		    <li ><Link to={`/bus_trolley/BLVDDIR`}>BLVDDIR</Link></li>
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
		    <li ><Link to={`/bus_trolley/10`}>10</Link></li>
		    <li ><Link to={`/bus_trolley/11`}>11</Link></li>
		    <li ><Link to={`/bus_trolley/13`}>13</Link></li>
		    <li ><Link to={`/bus_trolley/15`}>15</Link></li>
		    <li ><Link to={`/bus_trolley/34`}>34</Link></li>
		    <li ><Link to={`/bus_trolley/36`}>36</Link></li>
		    <li ><Link to={`/bus_trolley/101`}>101</Link></li>
		    <li ><Link to={`/bus_trolley/102`}>102</Link></li>
		    </ul>
		    </li>
		    </ul>
		    </div>

		    </div>

		    </div>
		    </nav>

		    </div>
			)
	}
}

export default withRouter(BTHeader);