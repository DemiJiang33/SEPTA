import React from "react";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";

class AppBus extends React.Component{
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
		this.props.history.push(`/bus/${this.state.value}`);
		event.preventDefault();
	}

	onClickCollapse(e){
		e.preventDefault();
		this.setState({collapseUp: !this.state.collapseUp});
		this.setState({collapseDown: !this.state.collapseDown});
	}

	render(){

		const array = [1,2,3,4,5,6,7,8,9,12,14,16,17,18,19,20,21,22,23,24,25,
		               26,27,28,29,30,31,32,33,35,37,38,39,40,42,43,44,45,46,47,'47M',48,
		               50,52,53,54,55,56,57,58,59,60,61,62,64,65,66,67,68,70,73,75,77,
		               78,79,80,84,88,89,90,91,92,93,94,95,96,97,98,99,103,104,105,106,107,
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

		return(
			<div>

		    <nav className="navbar navbar-inverse">
		    <div className="container-fluid">
		    <div className="navbar-header">
		    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
		    <span className="icon-bar"></span>
		    <span className="icon-bar"></span>
		    <span className="icon-bar"></span>                        
		    </button>
		    <a className="navbar-brand" href="#">Bus Routes</a>
		    </div>
		    <div className="collapse navbar-collapse" id="myNavbar">
		    <ul className="nav navbar-nav">
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 1-37 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus/1`}>1</Link></li>
		    <li ><Link to={`/bus/2`}>2</Link></li>
		    <li ><Link to={`/bus/3`}>3</Link></li>
		    <li ><Link to={`/bus/4`}>4</Link></li>
		    <li ><Link to={`/bus/5`}>5</Link></li>
		    <li ><Link to={`/bus/6`}>6</Link></li>
		    <li ><Link to={`/bus/7`}>7</Link></li>
		    <li ><Link to={`/bus/8`}>8</Link></li>
		    <li ><Link to={`/bus/9`}>9</Link></li>
		    <li ><Link to={`/bus/12`}>12</Link></li>
		    <li ><Link to={`/bus/14`}>14</Link></li>
		    <li ><Link to={`/bus/16`}>16</Link></li>
		    <li ><Link to={`/bus/17`}>17</Link></li>
		    <li ><Link to={`/bus/18`}>18</Link></li>
		    <li ><Link to={`/bus/19`}>19</Link></li>
		    <li ><Link to={`/bus/20`}>20</Link></li>
		    <li ><Link to={`/bus/21`}>21</Link></li>
		    <li ><Link to={`/bus/22`}>22</Link></li>
		    <li ><Link to={`/bus/23`}>23</Link></li>
		    <li ><Link to={`/bus/24`}>24</Link></li>
		    <li ><Link to={`/bus/25`}>25</Link></li>
		    <li ><Link to={`/bus/26`}>26</Link></li>
		    <li ><Link to={`/bus/27`}>27</Link></li>
		    <li ><Link to={`/bus/28`}>28</Link></li>
		    <li ><Link to={`/bus/29`}>29</Link></li>
		    <li ><Link to={`/bus/30`}>30</Link></li>
		    <li ><Link to={`/bus/31`}>31</Link></li>
		    <li ><Link to={`/bus/32`}>32</Link></li>
		    <li ><Link to={`/bus/33`}>33</Link></li>
		    <li ><Link to={`/bus/35`}>35</Link></li>
		    <li ><Link to={`/bus/37`}>37</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 38-75 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus/38`}>38</Link></li>
		    <li ><Link to={`/bus/39`}>39</Link></li>
		    <li ><Link to={`/bus/40`}>40</Link></li>
		    <li ><Link to={`/bus/42`}>42</Link></li>
		    <li ><Link to={`/bus/43`}>43</Link></li>
		    <li ><Link to={`/bus/44`}>44</Link></li>
		    <li ><Link to={`/bus/45`}>45</Link></li>
		    <li ><Link to={`/bus/46`}>46</Link></li>
		    <li ><Link to={`/bus/47`}>47</Link></li>
		    <li ><Link to={`/bus/47M`}>47M</Link></li>
		    <li ><Link to={`/bus/48`}>48</Link></li>
		    <li ><Link to={`/bus/50`}>50</Link></li>
		    <li ><Link to={`/bus/52`}>52</Link></li>
		    <li ><Link to={`/bus/53`}>53</Link></li>
		    <li ><Link to={`/bus/54`}>54</Link></li>
		    <li ><Link to={`/bus/55`}>55</Link></li>
		    <li ><Link to={`/bus/56`}>56</Link></li>
		    <li ><Link to={`/bus/57`}>57</Link></li>
		    <li ><Link to={`/bus/58`}>58</Link></li>
		    <li ><Link to={`/bus/59`}>59</Link></li>
		    <li ><Link to={`/bus/60`}>60</Link></li>
		    <li ><Link to={`/bus/61`}>61</Link></li>
		    <li ><Link to={`/bus/62`}>62</Link></li>
		    <li ><Link to={`/bus/64`}>64</Link></li>
		    <li ><Link to={`/bus/65`}>65</Link></li>
		    <li ><Link to={`/bus/66`}>66</Link></li>
		    <li ><Link to={`/bus/67`}>67</Link></li>
		    <li ><Link to={`/bus/68`}>68</Link></li>
		    <li ><Link to={`/bus/70`}>70</Link></li>
		    <li ><Link to={`/bus/73`}>73</Link></li>
		    <li ><Link to={`/bus/75`}>75</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 77-117 <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li > <Link to={`/bus/77`}>77</Link></li>
		    <li > <Link to={`/bus/78`}>78</Link></li>
		    <li > <Link to={`/bus/79`}>79</Link></li>
		    <li > <Link to={`/bus/80`}>80</Link></li>
		    <li > <Link to={`/bus/84`}>84</Link></li>
		    <li > <Link to={`/bus/88`}>88</Link></li>
		    <li > <Link to={`/bus/89`}>89</Link></li>
		    <li > <Link to={`/bus/90`}>90</Link></li>
		    <li > <Link to={`/bus/91`}>91</Link></li>
		    <li > <Link to={`/bus/92`}>92</Link></li>
		    <li > <Link to={`/bus/93`}>93</Link></li>
		    <li > <Link to={`/bus/94`}>94</Link></li>
		    <li > <Link to={`/bus/95`}>95</Link></li>
		    <li > <Link to={`/bus/96`}>96</Link></li>
		    <li > <Link to={`/bus/97`}>97</Link></li>
		    <li > <Link to={`/bus/98`}>98</Link></li>
		    <li > <Link to={`/bus/99`}>99</Link></li>
		    <li > <Link to={`/bus/103`}>103</Link></li>
		    <li > <Link to={`/bus/104`}>104</Link></li>
		    <li > <Link to={`/bus/105`}>105</Link></li>
		    <li > <Link to={`/bus/106`}>106</Link></li>
		    <li > <Link to={`/bus/107`}>107</Link></li>
		    <li > <Link to={`/bus/108`}>108</Link></li>
		    <li > <Link to={`/bus/109`}>109</Link></li>
		    <li > <Link to={`/bus/110`}>110</Link></li>
		    <li > <Link to={`/bus/111`}>111</Link></li>
		    <li > <Link to={`/bus/112`}>112</Link></li>
		    <li > <Link to={`/bus/113`}>113</Link></li>
		    <li > <Link to={`/bus/114`}>114</Link></li>
		    <li > <Link to={`/bus/115`}>115</Link></li>
		    <li > <Link to={`/bus/117`}>117</Link></li>
		    </ul>
		    </li>
		    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"> 118-XH <span className="caret"></span></a>
		    <ul className="dropdown-menu">
		    <li ><Link to={`/bus/118`}>118</Link></li>
		    <li ><Link to={`/bus/119`}>119</Link></li>
		    <li ><Link to={`/bus/120`}>120</Link></li>
		    <li ><Link to={`/bus/123`}>123</Link></li>
		    <li ><Link to={`/bus/124`}>124</Link></li>
		    <li ><Link to={`/bus/125`}>125</Link></li>
		    <li ><Link to={`/bus/126`}>126</Link></li>
		    <li ><Link to={`/bus/127`}>127</Link></li>
		    <li ><Link to={`/bus/128`}>128</Link></li>
		    <li ><Link to={`/bus/129`}>129</Link></li>
		    <li ><Link to={`/bus/130`}>130</Link></li>
		    <li ><Link to={`/bus/131`}>131</Link></li>
		    <li ><Link to={`/bus/132`}>132</Link></li>
		    <li ><Link to={`/bus/133`}>133</Link></li>
		    <li ><Link to={`/bus/139`}>139</Link></li>
		    <li ><Link to={`/bus/150`}>150</Link></li>
		    <li ><Link to={`/bus/201`}>201</Link></li>
		    <li ><Link to={`/bus/204`}>204</Link></li>
		    <li ><Link to={`/bus/205`}>205</Link></li>
		    <li ><Link to={`/bus/206`}>206</Link></li>
		    <li ><Link to={`/bus/310`}>310</Link></li>
		    <li ><Link to={`/bus/331`}>311</Link></li>
		    <li ><Link to={`/bus/G`}>G</Link></li>
		    <li ><Link to={`/bus/J`}>J</Link></li>
		    <li ><Link to={`/bus/K`}>K</Link></li>
		    <li ><Link to={`/bus/L`}>L</Link></li>
		    <li ><Link to={`/bus/LUCY`}>LUCY</Link></li>
		    <li ><Link to={`/bus/R`}>R</Link></li>
		    <li ><Link to={`/bus/H`}>H</Link></li>
		    <li ><Link to={`/bus/XH`}>XH</Link></li>
		    <li ><Link to={`/bus/BLVDDIR`}>BLVDDIR</Link></li>
		    </ul>
		    </li>
		    </ul>
		    <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
		    <div className="input-group">
		    <input type="text" className="form-control" value={this.state.value} placeholder="Search for Route #"
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

		    <h4 style={{textAlign: 'center'}}>Route List&nbsp;
		    <a href="#" onClick={this.onClickCollapse}>
		    {this.state.collapseUp &&<span className="glyphicon glyphicon-collapse-up"></span>}
		    {this.state.collapseDown &&<span className="glyphicon glyphicon-collapse-down"></span>}
		    </a>
		    </h4>
		    {this.state.collapseUp && <div>
		    <div className="menu1">
		    <div >1</div>
		    <div >2</div>
		    <div >3</div>
		    <div >4</div>
		    <div >5</div>
		    <div >6</div>
		    <div >7</div>
		    <div >8</div>
		    <div >9</div>
		    <div >12</div>
		    <div >14</div>
		    <div >16</div>
		    <div >17</div>
		    <div >18</div>
		    <div >19</div>
		    <div >20</div>
		    <div >21</div>
		    <div >22</div>
		    <div >23</div>
		    <div >24</div>
		    <div >25</div>
		    <div >26</div>
		    <div >27</div>
		    <div >28</div>
		    <div >29</div>
		    <div >30</div>
		    <div >31</div>
		    <div >32</div>
		    <div >33</div>
		    <div >35</div>
		    <div >37</div>
		    <hr/>
		    </div>

		    <div className="menu2">
		    <div >38</div>
		    <div >39</div>
		    <div >40</div>
		    <div >42</div>
		    <div >43</div>
		    <div >44</div>
		    <div >45</div>
		    <div >46</div>
		    <div >47</div>
		    <div >47M</div>
		    <div >48</div>
		    <div >50</div>
		    <div >52</div>
		    <div >53</div>
		    <div >54</div>
		    <div >55</div>
		    <div >56</div>
		    <div >57</div>
		    <div >58</div>
		    <div >59</div>
		    <div >60</div>
		    <div >61</div>
		    <div >62</div>
		    <div >64</div>
		    <div >65</div>
		    <div >66</div>
		    <div >67</div>
		    <div >68</div>
		    <div >70</div>
		    <div >73</div>
		    <div >75</div>
		    <hr/>
		    </div>

		    <div className="menu3">
		    <div >77</div>
		    <div >78</div>
		    <div >79</div>
		    <div >80</div>
		    <div >84</div>
		    <div >88</div>
		    <div >89</div>
		    <div >90</div>
		    <div >91</div>
		    <div >92</div>
		    <div >93</div>
		    <div >94</div>
		    <div >95</div>
		    <div >96</div>
		    <div >97</div>
		    <div >98</div>
		    <div >99</div>
		    <div >103</div>
		    <div >104</div>
		    <div >105</div>
		    <div >106</div>
		    <div >107</div>
		    <div >108</div>
		    <div >109</div>
		    <div >110</div>
		    <div >111</div>
		    <div >112</div>
		    <div >113</div>
		    <div >114</div>
		    <div >115</div>
		    <div >117</div>
		    <hr/>
		    </div>

		    <div className="menu4">
		    <div >118</div>
		    <div >119</div>
		    <div >120</div>
		    <div >123</div>
		    <div >124</div>
		    <div >125</div>
		    <div >126</div>
		    <div >127</div>
		    <div >128</div>
		    <div >129</div>
		    <div >130</div>
		    <div >131</div>
		    <div >132</div>
		    <div >133</div>
		    <div >139</div>
		    <div >150</div>
		    <div >201</div>
		    <div >204</div>
		    <div >205</div>
		    <div >206</div>
		    <div >310</div>
		    <div >311</div>
		    <div >G</div>
		    <div >J</div>
		    <div >K</div>
		    <div >L</div>
		    <div >LUCY</div>
		    <div >R</div>
		    <div >H</div>
		    <div >XH</div>
		    <div >BLVDDIR</div>
		    <hr/>
		    </div>
		    </div>}

		    </div>
			)
	}
}

export default withRouter(AppBus);