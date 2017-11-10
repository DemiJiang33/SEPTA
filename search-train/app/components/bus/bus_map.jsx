import React from "react";

var mapMarkersArray = []; //makes an array of the markers you place on the map,
                          //it is ussd in clearMarkers().
var map;

var selectedInfoWindow = null;
var selectedMarkerID = null;

const DEFAULT_POSITION = {
  lat: 39.9526,
  lng: -75.1652 
};

var route;

class BusMap extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			buses: props.buses,
			//initiate state.buses
			show: false
		}
		this.septaTransitView = this.septaTransitView.bind(this);
		this.initMap = this.initMap.bind(this);
		this.clearMarkers = this.clearMarkers.bind(this);
		this.refreshMap = this.refreshMap.bind(this);
	};

	componentWillReceiveProps(nextProps){
		var buses = nextProps.buses;
		route = nextProps.route;
		this.setState({
			buses: buses
		});
	};

	componentDidMount() {

		if(window.innerWidth<768){
			this.setState({show: true});
		}else{
			this.setState({show: false});
		}

		map = new google.maps.Map(this.refs.map, {
			center: DEFAULT_POSITION,
			minZoom: 0,
			zoom: 10,
			mapTypeControl: false,
			gestureHandling: 'greedy'
		});

		//Close all points of interest
		var noPoi = [
		{
			featureType: "poi",
			stylers: [
			{ visibility: "off" }
			]   
		}
		];
		map.setOptions({styles: noPoi});

		this.timeoutID1 = setTimeout(
			() => this.septaTransitView(),
			500
			);

		this.timeoutID2 = setTimeout(
			() => google.maps.event.addDomListener(window, 'load', this.initMap()),
			1000
			);

		this.handleID = setInterval(
			() => this.initMap(),
			15000 // update every 15 second as default
			);
	}

	componentWillUnmount(){
		clearInterval(this.handleID);
		clearTimeout(this.timeoutID1);
		clearTimeout(this.timeoutID2);
		clearTimeout(this.refreshMapID);
	}

	septaTransitView() {
		google.maps.event.addListenerOnce(map, 'zoom_changed', function() {
			var width = window.innerWidth;
			if (width <= 375){
				// set the zoom level to 11.
				map.setZoom(11);
			}else if (width <= 768){
				// set the zoom level to 12.
				map.setZoom(12);
			}else{
				map.setZoom(13);
			}
			});

		var ctaLayer = new google.maps.KmlLayer({
			url: 'http://www3.septa.org/transitview/kml/' + route + '.kml',
			map: map,
			preserveViewport:false
		}); 

	}

	//initMap() begins
	initMap() {
		this.clearMarkers();
		var markers = [];//makes an array of the lat and lng of the position
		var markersIcon = [];//makes an array of the ViehleID, direction and destination of the position
		//Map the buses to get the makersIcon[] & markers[]
		{this.state.buses.map(function(bus,i){
			return(
				markersIcon[i] = {viehleID: bus.VehicleID, direction: bus.Direction,
					destination: bus.destination, late:  bus.late},
				markers[i] = {lat:bus.lat, lng:bus.lng}
				)
		})}

		//Marks the positions
		//for loop begins    
		for(var i = 0; i < markers.length; i++){
		var markerPosition = markers[i];// Only need lat & lng here.
		var markerIcon = markersIcon[i];// Only need ViehleID, direction, destination and late here.
		//console.log(markerIcon);

		//Icon begin here
		var icon =''; 
		if( markerIcon.destination){
			if((markerIcon.direction == 'EastBound')||(markerIcon.direction == 'NorthBound')){
				icon ='../images/bus_blue.png'; 
			}else if((markerIcon.direction == 'WestBound')||(markerIcon.direction == 'SouthBound')){
				icon ='../images/bus_red.png'; 
			}else{
				icon ='../images/bus_yellow.png'; 
			}
		}else{
			icon ='../images/bus_yellow.png'; 
		}
		//icon end here

		this.marker = new google.maps.Marker({
			position: {lat: parseFloat(markerPosition.lat), lng: parseFloat(markerPosition.lng)},
			map: map,
			icon: icon
		});

		var m;
		if((markerIcon.late)==1){
			m = ' min';
		}else{
			m = ' mins';
		}

		// It is used to show message
		var lateM;
		if((markerIcon.late > '0') && (markerIcon.late != '999')){
			lateM = markerIcon.late + m + ' late &#10071;';
		}else if (markerIcon.late == '0'){
			lateM = ' On Time &#128077;';
		}else if (markerIcon.late == '999'){
			lateM = ' Suspended &#10071;&#9889;';
		}else{
			lateM = -(markerIcon.late) + m + ' earlier &#10071;'
		}

		var message = '<div id = "content">' +
		"ViehleID: " + markerIcon.viehleID + '<br/>' +
		"Direction: " + markerIcon.direction + '<br/>' +
		"Destination: " + markerIcon.destination + '<br/>' +
		"Status: " + lateM +
		'</div>';

		mapMarkersArray[i] = this.marker;   

		this.attachMessage(this.marker, message, markerIcon.viehleID);//Call the method show message
	}
    //for loop ends
	}
	//initMap() ends

	//Attach the message to the marker.
	attachMessage(marker, message, id) {
		var infowindow = new google.maps.InfoWindow({
			content: message
		});

		if (selectedInfoWindow != null && selectedMarkerID == id && selectedInfoWindow.getMap() == null){
			selectedInfoWindow.setContent(message);
			selectedInfoWindow.open(map, marker);
		}

		//infowindow.getMap() returns null if infowindow is closed.
		marker.addListener('click', function() {
			if (selectedInfoWindow != null && selectedInfoWindow.getMap() != null) {
				selectedInfoWindow.close();
				if (selectedInfoWindow == infowindow) {
					selectedInfoWindow = null;
					return;
				}
			}
			infowindow.open(map, marker);
			selectedInfoWindow = infowindow;
			selectedMarkerID = id;
		});

		//Click somewhere else of the map to close infoWindow
		google.maps.event.addListener(map, 'click', function () {
			infowindow.close();
			if (selectedInfoWindow != null && selectedInfoWindow.getMap() != null){
				selectedInfoWindow.close();
			}
			selectedMarkerID = null;
			selectedInfoWindow = null;
		});

		//hide the close button of infoWindow
		google.maps.event.addListener(infowindow, 'domready', function () {
			$("#content").parent().parent().parent().next().remove();
		});
	}  

	// Removes the markers from the map, and not keeps them in the array.
	clearMarkers() {
		if (mapMarkersArray){
			for (var i = 0; i < mapMarkersArray.length; i++){
				mapMarkersArray[i].setMap(null);
			}
			mapMarkersArray.length = 0;
		}
	}

	refreshMap(){
		this.refreshMapID = setTimeout(
			() => this.initMap(),
			100 // update once
			);
	}

	render(){
		const buttonStyle = {
			top: '40px',
			right: '20px',
			position: 'absolute',
			visibility: this.state.show ? 'visible' : 'hidden'
		}

		return(
			<div>
			<button className ='btn btn-primary' id="refreshBus" style ={buttonStyle} 
			onClick={this.refreshMap}>Refresh the Map</button>
			<div ref="map" id="map">I should be a map!</div>
			</div>
			)
	}
}

export default BusMap;