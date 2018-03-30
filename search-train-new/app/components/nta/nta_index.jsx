import React from "react";
import ScrollUpButton from "react-scroll-up-button";
import fetchJsonp from "fetch-jsonp";

import SocialMedia from '../social_media.jsx';
import Header from '../header.jsx';

import NTAResults from './nta_results.jsx';

import fromArrow from '../../../images/fromArrow.gif';
import toArrow from '../../../images/toArrow.gif';
import nearMe from '../../../images/nearMe.png';

class NTAIndex extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			bStation: '9th St',
			dStation: '9th St',
			submit: false,
			genericAlert: ''
		};
		this.handleChange1 = this.handleChange1.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onClickNearMe = this.onClickNearMe.bind(this);
	}

	componentDidMount(){
		//get the Generic Alert data
		fetchJsonp(`https://www3.septa.org/hackathon/Alerts/get_alert_data.php?req1=generic`,{
			timeout: 6000,
		}).then(
		response =>{
			return response.json()
		}).then(
		json =>{
			//console.log(json[0]);
			if(json[0].current_message){
				this.setState({genericAlert: json[0].current_message});
			}else{
				return null;
			}
		});
	}

	handleChange1(event) {
		this.setState({bStation: event.target.value});
	}

	handleChange2(e) {
		this.setState({dStation: e.target.value});
	}

	handleSubmit() {
		this.setState({submit: !this.state.submit});
	}

	onClickNearMe(){
		
	}

	render(){
		const style={
			backgroundColor: '#144B88',
			marginBottom: '2px',
			marginRight: '-2px'
		}

		const styleLabel={
			marginTop: '5px',
			fontSize: 'large',
			color: 'white'
		}

		const styleSelect={
			marginTop: '1px',
			marginBottom: '1px',
			fontSize: 'large'
		}

		//console.log("b: " +this.state.bStation);
		//console.log("d: " +this.state.dStation);
		//console.log("submit: " +this.state.submit);

		return(
			<div>
			<Header />
		    <hr/>

		    {this.state.genericAlert && <p style={{color: 'red'}} dangerouslySetInnerHTML={{__html: this.state.genericAlert}} />}

		    <div style={style} className ="row">
		      <label className="col-sm-5 col-sm-4 col-form-label" style={styleLabel}><img src={fromArrow} /> Your Beginning Station</label>
		      <div className="col-sm-7 col-sm-8">
		      <select style={styleSelect} className="form-control" onChange={this.handleChange1}>

		        <option value="9th St">9th Street</option>
		        <option value="30th Street Station">30th Street</option>
		        <option value="49th St">49th Street</option>
		        <option value="Airport Terminal A">Airport Terminal A</option>
		        <option value="Airport Terminal B">Airport Terminal B</option>
		        <option value="Airport Terminal C-D">Airport Terminal C-D</option>

		        <option value="Airport Terminal E-F">Airport Terminal E-F</option>
		        <option value="Allegheny">Allegheny</option>
		        <option value="Allen Lane">Allen Lane</option>
		        <option value="Ambler">Ambler</option>
		        <option value="Angora">Angora</option>
		        <option value="Ardmore">Ardmore</option>

		        <option value="Ardsley">Ardsley</option>
		        <option value="Bala">Bala</option>
		        <option value="Berwyn">Berwyn</option>
		        <option value="Bethayres">Bethayres</option>
		        <option value="Bridesburg">Bridesburg</option>
		        <option value="Bristol">Bristol</option>

		        <option value="Bryn Mawr">Bryn Mawr</option>
		        <option value="Carpenter">Carpenter</option>
		        <option value="Chalfont">Chalfont</option>
		        <option value="Chelten Avenue">Chelten Avenue</option>
		        <option value="Cheltenham">Cheltenham</option>
		        <option value="Chester TC">Chester Transportation Center</option>

		        <option value="Chestnut Hill East">Chestnut Hill East</option>
		        <option value="Chestnut Hill West">Chestnut Hill West</option>
		        <option value="Churchmans Crossing">Churchmans Crossing, DE</option>
		        <option value="Claymont">Claymont</option>
		        <option value="Clifton-Aldan">Clifton-Aldan</option>
		        <option value="Colmar">Colmar</option>

		        <option value="Conshohocken">Conshohocken</option>
		        <option value="Cornwells Heights">Cornwells Heights</option>
		        <option value="Crestmont">Crestmont</option>
		        <option value="Croydon">Croydon</option>
		        <option value="Crum Lynne">Crum Lynne</option>
		        <option value="Curtis Park">Curtis Park</option>

		        <option value="Cynwyd">Cynwyd</option>
		        <option value="Daylesford">Daylesford</option>
		        <option value="Darby">Darby</option>
		        <option value="Delaware Valley College">Delaware Valley College</option>
		        <option value="Devon">Devon</option>
		        <option value="Downingtown">Downingtown</option>

		        <option value="Doylestown">Doylestown</option>
		        <option value="East Falls">East Falls</option>
		        <option value="Eastwick Station">Eastwick</option>
		        <option value="Eddington">Eddington</option>
		        <option value="Eddystone">Eddystone</option>
		        <option value="Elkins Park">Elkins Park</option>

		        <option value="Elm St">Elm Street-Norristown</option>
		        <option value="Elwyn Station">Elwyn</option>
		        <option value="Exton">Exton</option>
		        <option value="Fern Rock TC">Fern Rock Transportation Center</option>
		        <option value="Fernwood">Fernwood-Yeadon</option>
		        <option value="Folcroft">Folcroft</option>

		        <option value="Forest Hills">Forest Hills</option>
		        <option value="Ft Washington">Fort Washington</option>
		        <option value="Fortuna">Fortuna</option>
		        <option value="Fox Chase">Fox Chase</option>
		        <option value="Germantown">Germantown</option>
		        <option value="Gladstone">Gladstone</option>

		        <option value="Glenolden">Glenolden</option>
		        <option value="Glenside">Glenside</option>
		        <option value="Gravers">Gravers</option>
		        <option value="Gwynedd Valley">Gwynedd Valley</option>
		        <option value="Hatboro">Hatboro</option>
		        <option value="Haverford">Haverford</option>

		        <option value="Highland Ave">Highland Avenue</option>
		        <option value="Highland">Highland</option>
		        <option value="Holmesburg Jct">Holmesburg Junction</option>
		        <option value="Ivy Ridge">Ivy Ridge</option>
		        <option value="Jefferson Station">Jefferson Station (formerly Market East)</option>
		        <option value="Jenkintown-Wyncote">Jenkintown-Wyncote</option>
		        <option value="Langhorne">Langhorne</option>

		        <option value="Lansdale">Lansdale</option>
		        <option value="Lansdowne">Lansdowne</option>
		        <option value="Lawndale">Lawndale</option>
		        <option value="Levittown">Levittown</option>
		        <option value="Link Belt">Link Belt</option>
		        <option value="Main St">Main Street-Norristown</option>

		        <option value="Malvern">Malvern</option>
		        <option value="Manayunk">Manayunk</option>
		        <option value="Marcus Hook">Marcus Hook</option>
		        <option value="Market East">Market East</option>
		        <option value="Meadowbrook">Meadowbrook</option>
		        <option value="Media">Media</option>

		        <option value="Melrose Park">Melrose Park</option>
		        <option value="Merion">Merion</option>
		        <option value="Miquon">Miquon</option>
		        <option value="Morton">Morton</option>
		        <option value="Moylan-Rose Valley">Moylan-Rose Valley</option>
		        <option value="Mt Airy">Mt. Airy</option>

		        <option value="Narberth">Narberth</option>
		        <option value="Neshaminy Falls">Neshaminy Falls</option>
		        <option value="New Britain">New Britain</option>
		        <option value="Newark">Newark</option>
		        <option value="Noble">Noble</option>
		        <option value="Norristown TC">Norristown Transportation Center</option>

		        <option value="North Broad St">North Broad</option>
		        <option value="North Hills">North Hills</option>
		        <option value="North Philadelphia">North Philadelphia</option>
		        <option value="North Wales">North Wales</option>
		        <option value="Norwood">Norwood</option>
		        <option value="Olney">Olney</option>

		        <option value="Oreland">Oreland</option>
		        <option value="Overbrook">Overbrook</option>
		        <option value="Paoli">Paoli</option>
		        <option value="Penllyn">Penllyn</option>
		        <option value="Pennbrook">Pennbrook</option>
		        <option value="Philmont">Philmont</option>

		        <option value="Primos">Primos</option>
		        <option value="Prospect Park">Prospect Park</option>
		        <option value="Queen Lane">Queen Lane</option>
		        <option value="Radnor">Radnor</option>
		        <option value="Ridley Park">Ridley Park</option>
		        <option value="Rosemont">Rosemont Station</option>

		        <option value="Roslyn">Roslyn</option>
		        <option value="Rydal">Rydal</option>
		        <option value="Ryers">Ryers</option>
		        <option value="Secane">Secane</option>
		        <option value="Sedgwick">Sedgwick</option>
		        <option value="Sharon Hill">Sharon Hill</option>

		        <option value="Somerton">Somerton</option>
		        <option value="Spring Mill">Spring Mill</option>
		        <option value="St. Davids">St. Davids</option>
		        <option value="St. Martins">St. Martins</option>
		        <option value="Stenton">Stenton</option>
		        <option value="Strafford">Strafford</option>

		        <option value="Suburban Station">Suburban Station</option>
		        <option value="Swarthmore">Swarthmore</option>
		        <option value="Tacony">Tacony</option>
		        <option value="Temple U">Temple University</option>
		        <option value="Thorndale">Thorndale</option>
		        <option value="Torresdale">Torresdale</option>

		        <option value="Trenton">Trenton Transit Center</option>
		        <option value="Trevose">Trevose</option>
		        <option value="Tulpehocken">Tulpehocken</option>
		        <option value="University City">University City</option>
		        <option value="Upsal">Upsal</option>
		        <option value="Villanova">Villanova</option>

		        <option value="Wallingford">Wallingford</option>
		        <option value="Warminster">Warminster</option>
		        <option value="Washington Lane">Washington Lane</option>
		        <option value="Wayne Jct">Wayne Junction</option>
		        <option value="Wayne Station">Wayne</option>
		        <option value="West Trenton">West Trenton, NJ</option>

		        <option value="Whitford">Whitford</option>
		        <option value="Willow Grove">Willow Grove</option>
		        <option value="Wilmington">Wilmington</option>
		        <option value="Wissahickon">Wissahickon</option>
		        <option value="Wister">Wister</option>
		        <option value="Woodbourne">Woodbourne</option>

		        <option value="Wyndmoor">Wyndmoor</option>
		        <option value="Wynnefield Avenue">Wynnefield Avenue</option>
		        <option value="Wynnewood">Wynnewood</option>
		        <option value="Yardley">Yardley</option>
		      </select>
		      </div>
		    </div>

		    <div style={style} className ="row">
		      <label className="col-sm-5 col-sm-4 col-form-label" style={styleLabel}><img src={toArrow} />Your Destination Station</label>
		      <div className="col-sm-7 col-sm-8">
		      <select style={styleSelect} className="form-control" onChange={this.handleChange2}>

		        <option value="9th St">9th Street</option>
		        <option value="30th Street Station">30th Street</option>
		        <option value="49th St">49th Street</option>
		        <option value="Airport Terminal A">Airport Terminal A</option>
		        <option value="Airport Terminal B">Airport Terminal B</option>
		        <option value="Airport Terminal C-D">Airport Terminal C-D</option>

		        <option value="Airport Terminal E-F">Airport Terminal E-F</option>
		        <option value="Allegheny">Allegheny</option>
		        <option value="Allen Lane">Allen Lane</option>
		        <option value="Ambler">Ambler</option>
		        <option value="Angora">Angora</option>
		        <option value="Ardmore">Ardmore</option>

		        <option value="Ardsley">Ardsley</option>
		        <option value="Bala">Bala</option>
		        <option value="Berwyn">Berwyn</option>
		        <option value="Bethayres">Bethayres</option>
		        <option value="Bridesburg">Bridesburg</option>
		        <option value="Bristol">Bristol</option>

		        <option value="Bryn Mawr">Bryn Mawr</option>
		        <option value="Carpenter">Carpenter</option>
		        <option value="Chalfont">Chalfont</option>
		        <option value="Chelten Avenue">Chelten Avenue</option>
		        <option value="Cheltenham">Cheltenham</option>
		        <option value="Chester TC">Chester Transportation Center</option>

		        <option value="Chestnut Hill East">Chestnut Hill East</option>
		        <option value="Chestnut Hill West">Chestnut Hill West</option>
		        <option value="Churchmans Crossing">Churchmans Crossing, DE</option>
		        <option value="Claymont">Claymont</option>
		        <option value="Clifton-Aldan">Clifton-Aldan</option>
		        <option value="Colmar">Colmar</option>

		        <option value="Conshohocken">Conshohocken</option>
		        <option value="Cornwells Heights">Cornwells Heights</option>
		        <option value="Crestmont">Crestmont</option>
		        <option value="Croydon">Croydon</option>
		        <option value="Crum Lynne">Crum Lynne</option>
		        <option value="Curtis Park">Curtis Park</option>

		        <option value="Cynwyd">Cynwyd</option>
		        <option value="Daylesford">Daylesford</option>
		        <option value="Darby">Darby</option>
		        <option value="Delaware Valley College">Delaware Valley College</option>
		        <option value="Devon">Devon</option>
		        <option value="Downingtown">Downingtown</option>

		        <option value="Doylestown">Doylestown</option>
		        <option value="East Falls">East Falls</option>
		        <option value="Eastwick Station">Eastwick</option>
		        <option value="Eddington">Eddington</option>
		        <option value="Eddystone">Eddystone</option>
		        <option value="Elkins Park">Elkins Park</option>

		        <option value="Elm St">Elm Street-Norristown</option>
		        <option value="Elwyn Station">Elwyn</option>
		        <option value="Exton">Exton</option>
		        <option value="Fern Rock TC">Fern Rock Transportation Center</option>
		        <option value="Fernwood">Fernwood-Yeadon</option>
		        <option value="Folcroft">Folcroft</option>

		        <option value="Forest Hills">Forest Hills</option>
		        <option value="Ft Washington">Fort Washington</option>
		        <option value="Fortuna">Fortuna</option>
		        <option value="Fox Chase">Fox Chase</option>
		        <option value="Germantown">Germantown</option>
		        <option value="Gladstone">Gladstone</option>

		        <option value="Glenolden">Glenolden</option>
		        <option value="Glenside">Glenside</option>
		        <option value="Gravers">Gravers</option>
		        <option value="Gwynedd Valley">Gwynedd Valley</option>
		        <option value="Hatboro">Hatboro</option>
		        <option value="Haverford">Haverford</option>

		        <option value="Highland Ave">Highland Avenue</option>
		        <option value="Highland">Highland</option>
		        <option value="Holmesburg Jct">Holmesburg Junction</option>
		        <option value="Ivy Ridge">Ivy Ridge</option>
		        <option value="Jefferson Station">Jefferson Station (formerly Market East)</option>
		        <option value="Jenkintown-Wyncote">Jenkintown-Wyncote</option>
		        <option value="Langhorne">Langhorne</option>

		        <option value="Lansdale">Lansdale</option>
		        <option value="Lansdowne">Lansdowne</option>
		        <option value="Lawndale">Lawndale</option>
		        <option value="Levittown">Levittown</option>
		        <option value="Link Belt">Link Belt</option>
		        <option value="Main St">Main Street-Norristown</option>

		        <option value="Malvern">Malvern</option>
		        <option value="Manayunk">Manayunk</option>
		        <option value="Marcus Hook">Marcus Hook</option>
		        <option value="Market East">Market East</option>
		        <option value="Meadowbrook">Meadowbrook</option>
		        <option value="Media">Media</option>

		        <option value="Melrose Park">Melrose Park</option>
		        <option value="Merion">Merion</option>
		        <option value="Miquon">Miquon</option>
		        <option value="Morton">Morton</option>
		        <option value="Moylan-Rose Valley">Moylan-Rose Valley</option>
		        <option value="Mt Airy">Mt. Airy</option>

		        <option value="Narberth">Narberth</option>
		        <option value="Neshaminy Falls">Neshaminy Falls</option>
		        <option value="New Britain">New Britain</option>
		        <option value="Newark">Newark</option>
		        <option value="Noble">Noble</option>
		        <option value="Norristown TC">Norristown Transportation Center</option>

		        <option value="North Broad St">North Broad</option>
		        <option value="North Hills">North Hills</option>
		        <option value="North Philadelphia">North Philadelphia</option>
		        <option value="North Wales">North Wales</option>
		        <option value="Norwood">Norwood</option>
		        <option value="Olney">Olney</option>

		        <option value="Oreland">Oreland</option>
		        <option value="Overbrook">Overbrook</option>
		        <option value="Paoli">Paoli</option>
		        <option value="Penllyn">Penllyn</option>
		        <option value="Pennbrook">Pennbrook</option>
		        <option value="Philmont">Philmont</option>

		        <option value="Primos">Primos</option>
		        <option value="Prospect Park">Prospect Park</option>
		        <option value="Queen Lane">Queen Lane</option>
		        <option value="Radnor">Radnor</option>
		        <option value="Ridley Park">Ridley Park</option>
		        <option value="Rosemont">Rosemont Station</option>

		        <option value="Roslyn">Roslyn</option>
		        <option value="Rydal">Rydal</option>
		        <option value="Ryers">Ryers</option>
		        <option value="Secane">Secane</option>
		        <option value="Sedgwick">Sedgwick</option>
		        <option value="Sharon Hill">Sharon Hill</option>

		        <option value="Somerton">Somerton</option>
		        <option value="Spring Mill">Spring Mill</option>
		        <option value="St. Davids">St. Davids</option>
		        <option value="St. Martins">St. Martins</option>
		        <option value="Stenton">Stenton</option>
		        <option value="Strafford">Strafford</option>

		        <option value="Suburban Station">Suburban Station</option>
		        <option value="Swarthmore">Swarthmore</option>
		        <option value="Tacony">Tacony</option>
		        <option value="Temple U">Temple University</option>
		        <option value="Thorndale">Thorndale</option>
		        <option value="Torresdale">Torresdale</option>

		        <option value="Trenton">Trenton Transit Center</option>
		        <option value="Trevose">Trevose</option>
		        <option value="Tulpehocken">Tulpehocken</option>
		        <option value="University City">University City</option>
		        <option value="Upsal">Upsal</option>
		        <option value="Villanova">Villanova</option>

		        <option value="Wallingford">Wallingford</option>
		        <option value="Warminster">Warminster</option>
		        <option value="Washington Lane">Washington Lane</option>
		        <option value="Wayne Jct">Wayne Junction</option>
		        <option value="Wayne Station">Wayne</option>
		        <option value="West Trenton">West Trenton, NJ</option>

		        <option value="Whitford">Whitford</option>
		        <option value="Willow Grove">Willow Grove</option>
		        <option value="Wilmington">Wilmington</option>
		        <option value="Wissahickon">Wissahickon</option>
		        <option value="Wister">Wister</option>
		        <option value="Woodbourne">Woodbourne</option>

		        <option value="Wyndmoor">Wyndmoor</option>
		        <option value="Wynnefield Avenue">Wynnefield Avenue</option>
		        <option value="Wynnewood">Wynnewood</option>
		        <option value="Yardley">Yardley</option>
		      </select>
		      </div>
		    </div>

		    <div>
		    <button type="submit" onClick={this.handleSubmit} className="btn btn-block btn-primary">Submit</button>
		    </div>
		    <button onClick={this.onClickNearMe} style={{position:'absolute', top:5 ,right: 5}} >Near Me<img src={nearMe} /></button>
             
            <NTAResults bStation={this.state.bStation} dStation={this.state.dStation} submit={this.state.submit} />

		    <SocialMedia />
		    <ScrollUpButton ContainerclassName="ScrollUpButton__Container"/>

			</div>
			)
	}
}

export default NTAIndex;